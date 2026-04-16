"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { dashboardNavItems, getBidById, getTaskById } from "../../../../taskData";
import styles from "./page.module.css";

export default function ProposalProfilePage({ params }: { params: Promise<{ taskId: string; bidId: string }> }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { taskId, bidId } = use(params);
  const task = getTaskById(taskId);
  const bid = getBidById(taskId, bidId);

  if (!task || !bid) notFound();

  const profile = bid.profile;

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarHeader}>
            <div>
              <p className={styles.sidebarEyebrow}>Boulot Man</p>
              <h1 className={styles.sidebarTitle}>Client Space</h1>
            </div>
            <button type="button" className={styles.sidebarClose} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>
              <iconify-icon icon="lucide:x" />
            </button>
          </div>

          <nav className={styles.sidebarNav} aria-label="Dashboard navigation">
            {dashboardNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.navItem} ${item.key === "tasks" ? styles.navItemActive : ""}`}
                onClick={() => setMobileNavOpen(false)}
              >
                <iconify-icon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/login" className={styles.logoutButton}>
              <iconify-icon icon="lucide:log-out" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button type="button" className={styles.mobileMenuButton} aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
                <iconify-icon icon="lucide:menu" />
              </button>

              <label className={styles.searchBar}>
                <iconify-icon icon="lucide:search" />
                <input type="search" placeholder="Search tasks, professionals..." aria-label="Search tasks and professionals" />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button type="button" className={styles.iconButton} aria-label="Notifications">
                <iconify-icon icon="lucide:bell" />
                <span className={styles.notificationDot} />
              </button>

              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>{task.client.initials}</div>
                <div>
                  <p className={styles.userName}>{task.client.name}</p>
                  <p className={styles.userRole}>Client</p>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <Link href={`/dashboard/client/tasks/${task.id}/proposals`} className={styles.backLink}>
              <iconify-icon icon="lucide:arrow-left" />
              Back to Proposals
            </Link>

            <div className={styles.profileLayout}>
              <section className={styles.profileMain}>
                <article className={styles.card}>
                  <div className={styles.hero}>
                    <div className={styles.avatar}>{bid.initials}</div>
                    <div className={styles.heroContent}>
                      <div className={styles.nameRow}>
                        <h1 className={styles.name}>{bid.bidder}</h1>
                        {bid.verified ? <span className={styles.verifiedBadge}>Verified Pro</span> : null}
                      </div>
                      <p className={styles.title}>{profile.title}</p>
                      <div className={styles.statsRow}>
                        <span>{bid.rating} ({bid.reviews} Reviews)</span>
                        <span>{task.location}</span>
                        <span>{profile.jobsCompleted}</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className={styles.card}>
                  <h2 className={styles.sectionTitle}>About {bid.bidder.split(" ")[0]}</h2>
                  <div className={styles.aboutBlock}>
                    {profile.about.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>

                <article className={styles.card}>
                  <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
                  <div className={styles.skillsGrid}>
                    {profile.skills.map((skill) => (
                      <span key={skill} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>

                <article className={styles.card}>
                  <h2 className={styles.sectionTitle}>Recent Work</h2>
                  <div className={styles.galleryGrid}>
                    {profile.gallery.map((item, index) => (
                      <div key={item.title} className={`${styles.galleryCard} ${styles[`galleryTone${(index % 4) + 1}`]}`}>
                        <strong>{item.title}</strong>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={styles.card}>
                  <div className={styles.reviewHeader}>
                    <h2 className={styles.sectionTitle}>Client Reviews ({bid.reviews})</h2>
                    <button type="button" className={styles.secondaryButton}>
                      View All Reviews
                    </button>
                  </div>

                  <div className={styles.reviewList}>
                    {profile.reviewsList.map((review) => (
                      <article key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewTop}>
                          <div className={styles.reviewer}>
                            <div className={styles.reviewerAvatar}>{review.initials}</div>
                            <div>
                              <strong>{review.reviewer}</strong>
                              <p>
                                {review.date} • {review.service}
                              </p>
                            </div>
                          </div>
                          <span className={styles.reviewRating}>{review.ratingLabel}</span>
                        </div>
                        <p className={styles.reviewText}>{review.text}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </section>

              <aside className={styles.profileSidebar}>
                <article className={styles.card}>
                  <div className={styles.rate}>
                    {profile.rate}
                    <span>/engagement</span>
                  </div>
                  <p className={styles.rateLabel}>{profile.rateLabel}</p>

                  <div className={styles.actionGroup}>
                    <Link href={`/dashboard/client/tasks/${task.id}/proposals/${bid.id}/payment`} className={styles.primaryButton}>
                      Hire {bid.bidder.split(" ")[0]} Now
                    </Link>
                    <button type="button" className={styles.outlineButton}>
                      Send Message
                    </button>
                  </div>

                  <div className={styles.metrics}>
                    <div><span>Job Success Rate</span><strong>{Math.round(bid.rating * 20)}%</strong></div>
                    <div><span>Response Time</span><strong>{profile.responseTime}</strong></div>
                    <div><span>Availability</span><strong>{profile.availability}</strong></div>
                    <div><span>Background Check</span><strong>{profile.backgroundCheck}</strong></div>
                  </div>
                </article>

                <article className={styles.card}>
                  <h3 className={styles.sideTitle}>Proposal Snapshot</h3>
                  <div className={styles.snapshot}>
                    <div><span>Task</span><strong>{task.title}</strong></div>
                    <div><span>Bid Amount</span><strong>{bid.amount}</strong></div>
                    <div><span>Bid Type</span><strong>{bid.amountType}</strong></div>
                    <div><span>Client</span><strong>{task.client.name}</strong></div>
                  </div>
                </article>

                <article className={styles.card}>
                  <h3 className={styles.sideTitle}>Languages</h3>
                  <div className={styles.languageList}>
                    {profile.languages.map((language) => (
                      <div key={language.name}>
                        <span>{language.name}</span>
                        <strong>{language.level}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
