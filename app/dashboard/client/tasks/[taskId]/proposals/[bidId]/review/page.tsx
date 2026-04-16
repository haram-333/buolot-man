"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { getBidById, getTaskById } from "../../../../../taskData";
import styles from "./page.module.css";

const feedbackOptions = [
  "Professional",
  "Punctual",
  "High Quality Work",
  "Great Communication",
  "Went Above & Beyond",
] as const;

export default function ProposalReviewPage({ params }: { params: Promise<{ taskId: string; bidId: string }> }) {
  const { taskId, bidId } = use(params);
  const task = getTaskById(taskId);
  const bid = getBidById(taskId, bidId);

  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Professional", "Punctual"]);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!task || !bid) notFound();

  const firstName = bid.bidder.split(" ")[0];

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.logoBar}>
          <Link href="/" className={styles.logoLink} aria-label="Boulot Man home">
            <Image src="/boulotman-logo.png" alt="Boulot Man" width={280} height={72} className={styles.logoImage} priority />
          </Link>
        </div>

        <section className={styles.successCard}>
          <span className={styles.successBadge}>Review submitted</span>
          <h1>Thanks for rating {firstName}</h1>
          <p>
            Your feedback helps other clients evaluate {bid.bidder} and keeps the marketplace trustworthy.
          </p>

          <div className={styles.successSummary}>
            <div>
              <span>Rating</span>
              <strong>{rating}/5</strong>
            </div>
            <div>
              <span>Highlights</span>
              <strong>{selectedTags.length || 1}</strong>
            </div>
            <div>
              <span>Task</span>
              <strong>{task.title}</strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.secondaryButton}>
              Back to task
            </Link>
            <Link href="/dashboard/client/messages" className={styles.primaryButton}>
              Open messages
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.logoBar}>
        <Link href="/" className={styles.logoLink} aria-label="Boulot Man home">
          <Image src="/boulotman-logo.png" alt="Boulot Man" width={280} height={72} className={styles.logoImage} priority />
        </Link>
      </div>

      <div className={styles.shell}>
        <div className={styles.header}>
          <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.backLink}>
            Back to task
          </Link>
          <h1 className={styles.title}>Rate your experience</h1>
          <p className={styles.subtitle}>Your feedback helps maintain trust in the Boulot Man community.</p>
        </div>

        <section className={styles.card}>
          <div className={styles.proHeader}>
            <div className={styles.proAvatar}>{bid.initials}</div>
            <div className={styles.proMeta}>
              <strong>{bid.bidder}</strong>
              <span>{bid.profile.title}</span>
            </div>
          </div>

          <div className={styles.taskSummary}>
            <div className={styles.summaryIcon}>
              <iconify-icon icon="lucide:check-circle" />
            </div>
            <div className={styles.summaryText}>
              <strong>{task.title}</strong>
              <span>Completed review for this accepted proposal</span>
            </div>
          </div>

          <div className={styles.ratingSection}>
            <div className={styles.ratingCopy}>
              <h2>How would you rate {firstName}&apos;s work?</h2>
              <p>Select a rating, choose what stood out, and leave optional comments.</p>
            </div>

            <div className={styles.stars} role="radiogroup" aria-label={`Rate ${bid.bidder}`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  className={`${styles.starButton} ${value <= rating ? styles.starButtonActive : ""}`}
                  onClick={() => setRating(value)}
                >
                  <iconify-icon icon="lucide:star" />
                </button>
              ))}
            </div>

            <p className={styles.ratingValue}>{rating === 5 ? "Excellent work" : rating === 4 ? "Very good" : rating === 3 ? "Good" : rating === 2 ? "Needs improvement" : "Poor experience"}</p>
          </div>

          <div className={styles.feedbackSection}>
            <label className={styles.feedbackLabel}>What did you like about {firstName}?</label>
            <div className={styles.tags}>
              {feedbackOptions.map((tag) => {
                const active = selectedTags.includes(tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.tag} ${active ? styles.tagActive : ""}`}
                    aria-pressed={active}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <label htmlFor="review-comments" className={styles.feedbackLabel}>
              Additional comments
            </label>
            <textarea
              id="review-comments"
              className={styles.textarea}
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder={`Share details about your experience working with ${firstName}...`}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.primaryButton} onClick={() => setSubmitted(true)}>
              Submit review
            </button>
            <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.skipLink}>
              Skip for now
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
