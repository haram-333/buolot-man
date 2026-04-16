"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { getTechnicianMarketplaceTask } from "../../../taskMarketplaceData";
import styles from "./page.module.css";

type PaymentType = "project" | "milestone";

const deliveryOptions = ["1 Day", "2 Days", "3 Days", "5 Days", "1 Week"];

export default function TechnicianSubmitBidPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = use(params);
  const task = getTechnicianMarketplaceTask(taskId);

  if (!task) {
    notFound();
  }

  const [paymentType, setPaymentType] = useState<PaymentType>("project");
  const [offerPrice, setOfferPrice] = useState(String(Math.max(150, Math.round(task.budgetValue))));
  const [deliveryTime, setDeliveryTime] = useState("3 Days");
  const [message, setMessage] = useState(
    `Hi ${task.client.name.split(" ")[0]}, I have strong experience with ${task.category.toLowerCase()} work and comparable ${task.type} projects. I can handle the scope cleanly, communicate clearly throughout the job, and keep the work aligned with the requested timeline. I am available to start quickly and can share relevant project references if needed.`
  );
  const [attachments, setAttachments] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const numericOffer = Number(offerPrice.replace(/[^0-9.]/g, "")) || 0;
  const serviceFee = numericOffer * 0.1;
  const payout = numericOffer - serviceFee;
  const connectsNeeded = Math.max(3, Math.min(8, task.proposals.length + 2));

  const clientToneClass = useMemo(() => {
    if (task.client.avatarTone === "blue") return styles.avatarBlue;
    if (task.client.avatarTone === "green") return styles.avatarGreen;
    if (task.client.avatarTone === "gold") return styles.avatarGold;
    return styles.avatarOrange;
  }, [task.client.avatarTone]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const addAttachment = () => {
    setAttachments((current) => [...current, `license-reference-${current.length + 1}.pdf`]);
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link href="/" className={styles.brand} aria-label="Boulot Man home">
            <Image src="/boulotman-logo.png" alt="Boulot Man" width={220} height={56} className={styles.brandImage} priority />
          </Link>
          <Link href={`/dashboard/technician/tasks/${task.id}`} className={styles.backButton}>
            <iconify-icon icon="lucide:arrow-left" />
            <span>Back to Task Details</span>
          </Link>
        </div>

        <div className={styles.topbarRight}>
          <Link href="/dashboard/technician/bids" className={styles.topbarLink}>
            My Bids
          </Link>
          <Link href="/dashboard/technician/profile" className={styles.profilePill}>
            <span className={styles.profileAvatar}>DM</span>
            <span className={styles.profileText}>
              <strong>Daniel Mensah</strong>
              <small>Technician</small>
            </span>
          </Link>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Submit Your Bid</h1>
          <p>Offer your services, define your terms, and send a focused proposal to the client.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.mainColumn}>
            <section className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <h2>{task.title}</h2>
                <div className={styles.previewBudget}>
                  <strong>{task.budgetLabel}</strong>
                  <span>Client Budget</span>
                </div>
              </div>

              <div className={styles.tagList}>
                <span className={styles.tag}>{task.type === "commercial" ? "Commercial" : "Residential"}</span>
                <span className={styles.tag}>{task.category}</span>
                {task.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.previewMeta}>
                <span><iconify-icon icon="lucide:map-pin" />{task.locationLabel}</span>
                <span><iconify-icon icon="lucide:calendar" />{task.deadline}</span>
              </div>

              <div className={styles.clientMini}>
                <span className={`${styles.clientAvatar} ${clientToneClass}`}>{task.client.initials}</span>
                <div className={styles.clientMiniCopy}>
                  <strong>{task.client.name}</strong>
                  <div className={styles.clientMiniStats}>
                    <span className={styles.rating}><iconify-icon icon="lucide:star" />{task.client.rating}</span>
                    <span className={styles.verified}><iconify-icon icon="lucide:badge-check" />Payment Verified</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.formCard}>
              <div className={styles.sectionTitle}>Terms & Payment</div>

              <div className={styles.paymentTypeSelector}>
                <button
                  type="button"
                  className={`${styles.radioCard} ${paymentType === "project" ? styles.radioCardSelected : ""}`}
                  onClick={() => setPaymentType("project")}
                >
                  <div className={styles.radioHeader}>
                    <span className={styles.radioCircle} />
                    <span className={styles.radioLabel}>By Project</span>
                  </div>
                  <p>Get paid for the full scope after the complete task is delivered and approved.</p>
                </button>
                <button
                  type="button"
                  className={`${styles.radioCard} ${paymentType === "milestone" ? styles.radioCardSelected : ""}`}
                  onClick={() => setPaymentType("milestone")}
                >
                  <div className={styles.radioHeader}>
                    <span className={styles.radioCircle} />
                    <span className={styles.radioLabel}>By Milestone</span>
                  </div>
                  <p>Split the work into phases and collect payment as each milestone is completed.</p>
                </button>
              </div>

              <div className={styles.formGrid}>
                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Offer Price</span>
                  <span className={styles.inputWrap}>
                    <span className={styles.inputIcon}><iconify-icon icon="lucide:dollar-sign" /></span>
                    <input
                      className={`${styles.formInput} ${styles.formInputWithIcon}`}
                      type="text"
                      inputMode="decimal"
                      value={offerPrice}
                      onChange={(event) => setOfferPrice(event.target.value)}
                      aria-label="Offer price"
                    />
                  </span>
                  <small>Total amount you are proposing to the client.</small>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Estimated Delivery Time</span>
                  <span className={styles.inputWrap}>
                    <span className={styles.inputIcon}><iconify-icon icon="lucide:clock-3" /></span>
                    <select
                      className={`${styles.formInput} ${styles.formInputWithIcon} ${styles.formSelect}`}
                      value={deliveryTime}
                      onChange={(event) => setDeliveryTime(event.target.value)}
                      aria-label="Estimated delivery time"
                    >
                      {deliveryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </span>
                  <small>How long will this task take you to complete?</small>
                </label>
              </div>

              <div className={styles.feeBreakdown}>
                <div className={styles.feeRow}>
                  <span>Your Proposal</span>
                  <span>{formatCurrency(numericOffer)}</span>
                </div>
                <div className={styles.feeRow}>
                  <span>Boulot Man Service Fee (10%)</span>
                  <span>-{formatCurrency(serviceFee)}</span>
                </div>
                <div className={`${styles.feeRow} ${styles.feeTotal}`}>
                  <span>You&apos;ll Receive</span>
                  <span>{formatCurrency(Math.max(0, payout))}</span>
                </div>
              </div>

              <div className={styles.sectionTitle}>Cover Letter & Attachments</div>

              <label className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <span className={styles.formLabel}>Message to Client</span>
                <textarea
                  className={styles.formTextarea}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-label="Message to client"
                />
                <small>Introduce yourself, highlight relevant experience, and explain your approach to the task.</small>
              </label>

              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <span className={styles.formLabel}>Attachments (Optional)</span>
                <button type="button" className={styles.uploadArea} onClick={addAttachment}>
                  <iconify-icon icon="lucide:upload-cloud" />
                  <strong>Drag & drop files or <span>Browse</span></strong>
                  <small>Upload licenses, portfolio items, or a detailed quote PDF (Max 25MB)</small>
                </button>
                {attachments.length ? (
                  <div className={styles.attachmentList}>
                    {attachments.map((file) => (
                      <span key={file} className={styles.attachmentChip}>
                        <iconify-icon icon="lucide:file-text" />
                        {file}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className={styles.formActions}>
                <Link href={`/dashboard/technician/tasks/${task.id}`} className={styles.ghostButton}>
                  Cancel
                </Link>
                <button type="button" className={`${styles.primaryButton} ${submitted ? styles.successButton : ""}`} onClick={() => setSubmitted(true)}>
                  <span>{submitted ? "Bid Submitted" : "Submit Bid"}</span>
                  <iconify-icon icon={submitted ? "lucide:check-circle-2" : "lucide:send"} />
                </button>
              </div>

              {submitted ? (
                <div className={styles.successPanel}>
                  <strong>Bid sent.</strong>
                  <p>Your proposal is now queued in the client&apos;s review list with your delivery estimate and payout breakdown.</p>
                  <Link href="/dashboard/technician/bids" className={styles.successLink}>
                    Go to My Bids
                  </Link>
                </div>
              ) : null}
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <h2 className={styles.sideCardTitle}>Connects & Bidding</h2>
              <div className={styles.connectsBalance}>
                <strong>45</strong>
                <span>Connects Available</span>
              </div>
              <div className={styles.connectsCost}>
                <span>This bid requires:</span>
                <strong>{connectsNeeded} Connects</strong>
              </div>
              <Link href="/dashboard/technician/wallet" className={styles.buyLink}>
                Buy more connects
              </Link>
            </section>

            <section className={`${styles.sideCard} ${styles.mutedCard}`}>
              <h2 className={styles.sideCardTitleWithIcon}>
                <iconify-icon icon="lucide:lightbulb" />
                <span>Pro Tips</span>
              </h2>
              <ul className={styles.tipsList}>
                <li>
                  <strong>Be highly specific</strong>
                  Clients respond better when your scope, assumptions, and deliverables are clear.
                </li>
                <li>
                  <strong>Lead with relevant work</strong>
                  Mention comparable {task.category.toLowerCase()} jobs you’ve completed successfully.
                </li>
                <li>
                  <strong>Stay competitive</strong>
                  Similar bids around this scope usually land near {formatCurrency(Math.max(task.budgetValue, 1900))}.
                </li>
              </ul>
            </section>

            <section className={styles.sideCard}>
              <div className={styles.trustBadge}>
                <iconify-icon icon="lucide:shield-check" />
                <div>
                  <strong>Safe Payment Protection</strong>
                  <p>Funds are held in escrow until the work is completed and the client approves the result.</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
