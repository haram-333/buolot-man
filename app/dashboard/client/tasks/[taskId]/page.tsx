"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { dashboardNavItems, getTaskById } from "../../taskData";
import styles from "./page.module.css";

export default function TaskDetailsPage({ params }: { params: Promise<{ taskId: string }> }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { taskId } = use(params);
  const task = getTaskById(taskId);

  if (!task) notFound();

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
            <div className={styles.grid}>
              <div>
                <div className={styles.taskHeader}>
                  <div>
                    <Link href="/dashboard/client/tasks" className={styles.backLink}>
                      <iconify-icon icon="lucide:arrow-left" />
                      Back to My Tasks
                    </Link>
                    <h1 className={styles.taskTitle}>{task.title}</h1>
                    <div className={styles.taskMeta}>
                      <span className={styles.categoryBadge}>{task.category}</span>
                      <span>{task.postedAt}</span>
                      <span>{task.location}</span>
                      <span>{task.views} Views</span>
                    </div>
                  </div>

                  <div className={styles.taskActions}>
                    <button type="button" className={styles.iconAction} aria-label="Share task">
                      <iconify-icon icon="lucide:share-2" />
                    </button>
                    <button type="button" className={styles.iconAction} aria-label="Save task">
                      <iconify-icon icon="lucide:bookmark" />
                    </button>
                  </div>
                </div>

                <section className={styles.card}>
                  <h2 className={styles.sectionTitle}>Task Details</h2>
                  {task.description.map((paragraph) => (
                    <p key={paragraph} className={styles.description}>
                      {paragraph}
                    </p>
                  ))}

                  <h3 className={styles.label}>Required Skills</h3>
                  <div className={styles.skillsList}>
                    {task.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 className={styles.label}>Attachments ({task.attachments.length})</h3>
                  <div className={styles.attachmentGrid}>
                    {task.attachments.map((attachment) => (
                      <button key={attachment.name} type="button" className={styles.attachmentCard}>
                        <span className={styles.attachmentIcon}>
                          <iconify-icon icon={attachment.type === "image" ? "lucide:image" : "lucide:file-text"} />
                        </span>
                        <span className={styles.attachmentInfo}>
                          <strong>{attachment.name}</strong>
                          <span>{attachment.size}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.sectionTitle}>Logistics & Requirements</h2>
                  <div className={styles.infoGrid}>
                    <article className={styles.infoItem}>
                      <span className={styles.infoIcon}><iconify-icon icon="lucide:dollar-sign" /></span>
                      <div><small>Budget</small><strong>{task.logistics.budgetLabel}</strong></div>
                    </article>
                    <article className={styles.infoItem}>
                      <span className={styles.infoIcon}><iconify-icon icon="lucide:calendar" /></span>
                      <div><small>Schedule</small><strong>{task.logistics.scheduleLabel}</strong></div>
                    </article>
                    <article className={styles.infoItem}>
                      <span className={styles.infoIcon}><iconify-icon icon="lucide:map-pin" /></span>
                      <div><small>Location</small><strong>{task.logistics.locationLabel}</strong></div>
                    </article>
                  </div>

                  <div className={styles.extraList}>
                    <div><span>Materials</span><strong>{task.logistics.materials}</strong></div>
                    <div><span>Property Type</span><strong>{task.logistics.propertyType}</strong></div>
                    <div><span>Parking</span><strong>{task.logistics.parking}</strong></div>
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Incoming Proposals ({task.bids.length})</h2>
                    {task.bids.length ? (
                      <Link href={`/dashboard/client/tasks/${task.id}/proposals`} className={styles.linkCtaInline}>
                        Review all proposals
                      </Link>
                    ) : (
                      <span className={styles.sortText}>Sort by: <strong>Best Match</strong></span>
                    )}
                  </div>

                  <div className={styles.bidList}>
                    {task.bids.length ? (
                      task.bids.map((bid) => (
                        <article key={bid.id} className={styles.bidCard}>
                          <div className={styles.bidHeader}>
                            <div className={styles.bidderInfo}>
                              <div className={styles.bidderAvatar}>{bid.initials}</div>
                              <div>
                                <h3>{bid.bidder}</h3>
                                <div className={styles.bidderMeta}>
                                  <span>{bid.rating} ({bid.reviews} reviews)</span>
                                  {bid.verified ? <span className={styles.verified}>Verified License</span> : null}
                                </div>
                              </div>
                            </div>
                            <div className={styles.bidPrice}>
                              <strong>{bid.amount}</strong>
                              <span>{bid.amountType}</span>
                            </div>
                          </div>

                          <p className={styles.bidMessage}>{bid.message}</p>
                          <div className={styles.portfolioRow}>
                            {bid.portfolio.map((item) => (
                              <span key={item} className={styles.portfolioChip}>{item}</span>
                            ))}
                          </div>
                          <div className={styles.bidActions}>
                            <Link href={`/dashboard/client/tasks/${task.id}/proposals/${bid.id}/payment`} className={styles.primaryButton}>Accept Proposal</Link>
                            <button type="button" className={styles.secondaryButton}>Message</button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No proposals yet for this task.</div>
                    )}
                  </div>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.sectionTitle}>Questions & Answers ({task.questions.length})</h2>
                  <p className={styles.helperText}>
                    Professionals can ask clarifying questions here. Answers will remain visible to everyone.
                  </p>

                  <div className={styles.qaList}>
                    {task.questions.length ? (
                      task.questions.map((item) => (
                        <article key={item.id} className={styles.qaItem}>
                          <div className={styles.qaAvatar}>{item.initials}</div>
                          <div className={styles.qaContent}>
                            <div className={styles.qaHeader}>
                              <strong>{item.asker}</strong>
                              <span>{item.time}</span>
                            </div>
                            <p>{item.question}</p>
                            {item.reply ? (
                              <div className={styles.qaReply}>
                                <div className={styles.qaHeader}>
                                  <strong>
                                    {item.reply.name}
                                    {item.reply.badge ? <span className={styles.replyBadge}>{item.reply.badge}</span> : null}
                                  </strong>
                                  <span>{item.reply.time}</span>
                                </div>
                                <p>{item.reply.text}</p>
                              </div>
                            ) : null}
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No questions yet.</div>
                    )}
                  </div>
                </section>
              </div>

              <aside>
                <section className={styles.card}>
                  <h3 className={styles.widgetTitle}>Task Status</h3>
                  <div className={styles.statusPill}>{task.statusSummary.label}</div>
                  <div className={styles.widgetStats}>
                    <div><span>Proposals</span><strong>{task.statusSummary.proposals}</strong></div>
                    <div><span>Views</span><strong>{task.statusSummary.views}</strong></div>
                    <div><span>Interviews</span><strong>{task.statusSummary.interviews}</strong></div>
                  </div>
                  <div className={styles.widgetActions}>
                    {task.bids.length ? (
                      <Link href={`/dashboard/client/tasks/${task.id}/proposals`} className={styles.primaryButton}>Review Proposals</Link>
                    ) : (
                      <button type="button" className={styles.primaryButton}>Invite Pros</button>
                    )}
                    <Link href="/post-task" className={styles.secondaryButton}>Edit</Link>
                  </div>
                </section>

                <section className={styles.card}>
                  <h3 className={styles.widgetTitle}>About the Client</h3>
                  <div className={styles.clientProfile}>
                    <div className={styles.clientAvatar}>{task.client.initials}</div>
                    <div>
                      <strong>{task.client.name}</strong>
                      <p>{task.client.rating}</p>
                    </div>
                  </div>
                  <div className={styles.widgetStats}>
                    <div><span>Location</span><strong>{task.client.location}</strong></div>
                    <div><span>Tasks Posted</span><strong>{task.client.tasksPosted}</strong></div>
                    <div><span>Total Spent</span><strong>{task.client.totalSpent}</strong></div>
                    <div><span>Member Since</span><strong>{task.client.memberSince}</strong></div>
                  </div>
                </section>

                <section className={styles.card}>
                  <h3 className={styles.widgetTitle}>Similar Tasks</h3>
                  <div className={styles.similarList}>
                    {task.similarTasks.map((similar) => (
                      <article key={similar.id} className={styles.similarTask}>
                        <strong>{similar.title}</strong>
                        <div>
                          <span>{similar.budget}</span>
                          <span>{similar.location}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                  <Link href="/dashboard/client/tasks" className={styles.linkCta}>View all similar tasks</Link>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
