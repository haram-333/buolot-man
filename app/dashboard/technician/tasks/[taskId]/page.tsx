"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { getTechnicianMarketplaceTask } from "../../taskMarketplaceData";
import styles from "./page.module.css";

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
};

const clientActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Fast responder",
    detail: "Usually hires within 12 hours once a clear scope and rate are provided.",
  },
  {
    id: "activity-2",
    title: "Payment record",
    detail: "Past marketplace payouts were released on time after work approval.",
  },
];

export default function TechnicianTaskDetailsPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = use(params);
  const task = getTechnicianMarketplaceTask(taskId);
  const [saved, setSaved] = useState(false);

  if (!task) {
    notFound();
  }

  const clientToneClass = useMemo(() => {
    if (task.client.avatarTone === "blue") return styles.avatarBlue;
    if (task.client.avatarTone === "green") return styles.avatarGreen;
    if (task.client.avatarTone === "gold") return styles.avatarGold;
    return styles.avatarOrange;
  }, [task.client.avatarTone]);

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link href="/" className={styles.brand} aria-label="Boulot Man home">
            <Image src="/boulotman-logo.png" alt="Boulot Man" width={220} height={56} className={styles.brandImage} priority />
          </Link>
          <Link href="/dashboard/technician/tasks" className={styles.backButton}>
            <iconify-icon icon="lucide:arrow-left" />
            <span>Back to Tasks</span>
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
        <div className={styles.grid}>
          <div className={styles.mainColumn}>
            <section className={styles.detailCard}>
              <div className={styles.badgeRow}>
                {task.urgent ? <span className={`${styles.badge} ${styles.badgeUrgent}`}>Urgent</span> : null}
                <span className={`${styles.badge} ${styles.badgeCategory}`}>{task.category}</span>
              </div>

              <h1 className={styles.title}>{task.title}</h1>

              <div className={styles.metaGrid}>
                <article className={styles.metaItem}>
                  <span className={styles.metaIcon}><iconify-icon icon="lucide:map-pin" /></span>
                  <div className={styles.metaCopy}>
                    <small>Location</small>
                    <strong>{task.locationLabel}</strong>
                  </div>
                </article>
                <article className={styles.metaItem}>
                  <span className={styles.metaIcon}><iconify-icon icon="lucide:calendar" /></span>
                  <div className={styles.metaCopy}>
                    <small>Schedule</small>
                    <strong>{task.deadline}</strong>
                  </div>
                </article>
                <article className={styles.metaItem}>
                  <span className={styles.metaIcon}><iconify-icon icon="lucide:clock-3" /></span>
                  <div className={styles.metaCopy}>
                    <small>Posted</small>
                    <strong>{task.posted.replace("Posted ", "")}</strong>
                  </div>
                </article>
              </div>

              <div className={styles.section}>
                <h2>Task Description</h2>
                <div className={styles.description}>
                  {task.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p>
                    <strong>Key requirements:</strong>
                  </p>
                  <ul>
                    {task.requirements.map((requirement) => (
                      <li key={requirement}>{requirement}</li>
                    ))}
                  </ul>
                  <p>
                    Attachments on this request: <strong>{task.attachments}</strong>. Existing demand:{" "}
                    <strong>{task.proposals.length} active bids</strong>.
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Scope Tags</h2>
                <div className={styles.tagList}>
                  {task.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <div className={styles.budgetBlock}>
                <small>Client Budget</small>
                <strong>{task.budgetLabel}</strong>
                <span>{task.budgetDetail}</span>
              </div>

              <Link href={`/dashboard/technician/tasks/${task.id}/submit-bid`} className={styles.primaryButton}>
                <iconify-icon icon="lucide:send-horizontal" />
                <span>Submit a Bid</span>
              </Link>

              <button type="button" className={styles.secondaryButton} onClick={() => setSaved((current) => !current)}>
                <iconify-icon icon={saved ? "lucide:bookmark-check" : "lucide:bookmark"} />
                <span>{saved ? "Saved to Shortlist" : "Save Task"}</span>
              </button>

              <div className={styles.bidStats}>
                <span>Bids so far: {task.proposals.length}</span>
                <span>Status: Open</span>
              </div>
            </section>

            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>About the Client</h2>

              <div className={styles.clientHeader}>
                <span className={`${styles.clientAvatar} ${clientToneClass}`}>{task.client.initials}</span>
                <div className={styles.clientCopy}>
                  <strong>{task.client.name}</strong>
                  <span className={styles.clientRating}>
                    <iconify-icon icon="lucide:star" />
                    <iconify-icon icon="lucide:star" />
                    <iconify-icon icon="lucide:star" />
                    <iconify-icon icon="lucide:star" />
                    <iconify-icon icon="lucide:star" />
                    <small>{task.client.rating}</small>
                  </span>
                </div>
              </div>

              <div className={styles.clientMetaList}>
                <div className={styles.clientMetaItem}>
                  <iconify-icon icon="lucide:shield-check" />
                  <span className={styles.verifiedText}>
                    {task.client.paymentVerified ? "Payment Method Verified" : "Payment verification pending"}
                  </span>
                </div>
                <div className={styles.clientMetaItem}>
                  <iconify-icon icon="lucide:briefcase-business" />
                  <span>{task.client.tasksPosted}</span>
                </div>
                <div className={styles.clientMetaItem}>
                  <iconify-icon icon="lucide:dollar-sign" />
                  <span>{task.client.totalSpent}</span>
                </div>
                <div className={styles.clientMetaItem}>
                  <iconify-icon icon="lucide:calendar-days" />
                  <span>{task.client.memberSince}</span>
                </div>
              </div>
            </section>

            <section className={`${styles.sideCard} ${styles.insightCard}`}>
              <h2 className={styles.sideTitle}>Bid Insights</h2>
              <div className={styles.activityList}>
                {clientActivities.map((item) => (
                  <article key={item.id} className={styles.activityItem}>
                    <span className={styles.activityIcon}><iconify-icon icon="lucide:sparkles" /></span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
