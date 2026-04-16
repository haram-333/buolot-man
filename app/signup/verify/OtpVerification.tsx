"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./verify.module.css";

const OTP_LENGTH = 6;
const INITIAL_TIMER = 165;

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function OtpVerification({
  phone,
  role,
}: {
  phone: string;
  role: string;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer]);

  const canVerify = otp.every((digit) => digit.length === 1);

  const backHref = useMemo(() => {
    const params = new URLSearchParams();
    if (role) params.set("role", role);
    if (phone) params.set("phone", phone);
    return `/signup/details?${params.toString()}`;
  }, [phone, role]);

  const handleChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = sanitized;
      return next;
    });

    if (sanitized && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);

    if (!pasted) return;

    const next = Array(OTP_LENGTH)
      .fill("")
      .map((_, index) => pasted[index] ?? "");

    setOtp(next);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (timer > 0) return;

    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(INITIAL_TIMER);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canVerify) return;

    const params = new URLSearchParams();
    if (role) params.set("role", role);
    router.push(`/signup/success${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
      </div>

      <section className={styles.card} aria-labelledby="verify-title">
        <div className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="Boulot Man home">
            <Image
              src="/boulotman-logo.png"
              alt="Boulot Man"
              width={280}
              height={72}
              className={styles.brandImage}
              priority
            />
          </Link>

          <div className={styles.headerText}>
            <h1 id="verify-title" className={styles.title}>
              Verify your phone number
            </h1>
            <p className={styles.subtitle}>
              We&apos;ve sent a 6-digit verification code to{" "}
              <span className={styles.phoneHighlight}>{phone}</span>
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.otpWrapper} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className={`${styles.otpInput} ${digit ? styles.otpInputFilled : ""}`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.resendSection}>
            <p className={styles.timerText}>Code expires in {formatTimer(timer)}</p>
            <button
              type="button"
              className={`${styles.resendLink} ${timer > 0 ? styles.resendLinkDisabled : ""}`}
              onClick={handleResend}
              disabled={timer > 0}
            >
              Resend Code
            </button>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.primaryButton} disabled={!canVerify}>
              Verify
            </button>

            <Link href={backHref} className={styles.backLink}>
              <iconify-icon icon="lucide:arrow-left" />
              Back to sign up
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
