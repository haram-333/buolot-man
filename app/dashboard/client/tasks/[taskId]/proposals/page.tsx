"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { dashboardNavItems, getTaskById } from "../../../taskData";
import styles from "./page.module.css";

const sortOptions = [
  { id: "best-match", label: "Best Match" },
  { id: "lowest-price", label: "Lowest Price" },
  { id: "top-rated", label: "Top Rated" },
] as const;

type SortId = (typeof sortOptions)[number]["id"];

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return Number(digits || 0);
}

export default function TaskProposalsPage({ params }: { params: Promise<{ taskId: string }> }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortId>("best-match");
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const { taskId } = use(params);
  const task = getTaskById(taskId);

  if (!task) notFound();

  const bids = useMemo(() => {
    const ranked = [...task.bids];
    if (sortBy === "lowest-price") {
      ranked.sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount));
    } else if (sortBy === "top-rated") {
      ranked.sort((a, b) => b.rating - a.rating);
    } else {
      ranked.sort((a, b) => {
        const scoreA = a.rating * 100 + (a.verified ? 25 : 0) - parseAmount(a.amount) / 1000;
        const scoreB = b.rating * 100 + (b.verified ? 25 : 0) - parseAmount(b.amount) / 1000;
        return scoreB - scoreA;
      });
    }
    return ranked;
  }, [sortBy, task.bids]);

  const proposalCount = bids.length;
  const amounts = bids.map((bid) => parseAmount(bid.amount)).filter((value) => value > 0);
  const averageBid = amounts.length ? Math.round(amounts.reduce((sum, value) => sum + value, 0) / amounts.length) : 0;
  const lowestBid = amounts.length ? Math.min(...amounts) : 0;
  const highestBid = amounts.length ? Math.max(...amounts) : 0;

  const shortlistedCount = shortlistedIds.length;

  const toggleShortlist = (bidId: string) => {
    setShortlistedIds((current) => (current.includes(bidId) ? current.filter((id) => id !== bidId) : [...current, bidId]));
  };

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
            <section className={styles.headerRow}>
              <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.backLink}>
                <iconify-icon icon="lucide:arrow-left" />
                Back to Task Details
              </Link>

              <div className={styles.headerBar}>
                <div>
                  <h1 className={styles.pageTitle}>Review Proposals ({proposalCount})</h1>
                  <div className={styles.timeline}>
                    <span className={`${styles.timelineStep} ${styles.timelineDone}`}>Posted</span>
                    <span className={`${styles.timelineLine} ${styles.timelineLineActive}`} />
                    <span className={`${styles.timelineStep} ${styles.timelineActive}`}>Reviewing ({proposalCount})</span>
                    <span className={styles.timelineLine} />
                    <span className={styles.timelineStep}>Hired</span>
                    <span className={styles.timelineLine} />
                    <span className={styles.timelineStep}>Completed</span>
                  </div>
                </div>

                <div className={styles.sortWrap}>
                  <label htmlFor="proposal-sort" className={styles.sortLabel}>
                    Sort by
                  </label>
                  <select id="proposal-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortId)} className={styles.sortSelect}>
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.overviewPanel}>
              <div className={styles.overviewMain}>
                <div className={styles.overviewTop}>
                  <div>
                    <span className={styles.statusBadge}>Open for Bids</span>
                    <h2 className={styles.overviewTitle}>{task.title}</h2>
                    <p className={styles.overviewMeta}>
                      {task.postedAt} • ID: #{task.id.toUpperCase()}
                    </p>
                  </div>

                  <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.outlineButton}>
                    Full Posting
                  </Link>
                </div>

                <div className={styles.detailsGrid}>
                  <div>
                    <span>Client Budget</span>
                    <strong>{task.logistics.budgetLabel}</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>{task.location}</strong>
                  </div>
                  <div>
                    <span>Timeline</span>
                    <strong>{task.logistics.scheduleLabel}</strong>
                  </div>
                  <div>
                    <span>Property Type</span>
                    <strong>{task.logistics.propertyType}</strong>
                  </div>
                </div>

                <div className={styles.descriptionBlock}>
                  <h3>Task Description</h3>
                  <p>{task.description[0]}</p>
                  <div className={styles.skillRow}>
                    {task.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.attachmentsBlock}>
                  <h3>Task Attachments</h3>
                  <div className={styles.attachmentRow}>
                    {task.attachments.map((attachment) => (
                      <button key={attachment.name} type="button" className={styles.attachmentChip}>
                        <iconify-icon icon={attachment.type === "image" ? "lucide:image" : "lucide:file-text"} />
                        <span>{attachment.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <aside className={styles.overviewSide}>
                <h3>Bid Insights</h3>
                <div className={styles.insightList}>
                  <div><span>Total Proposals</span><strong>{proposalCount}</strong></div>
                  <div><span>Average Bid</span><strong>{averageBid.toLocaleString()} XOF</strong></div>
                  <div><span>Lowest Bid</span><strong>{lowestBid ? `${lowestBid.toLocaleString()} XOF` : "N/A"}</strong></div>
                  <div><span>Highest Bid</span><strong>{highestBid ? `${highestBid.toLocaleString()} XOF` : "N/A"}</strong></div>
                  <div><span>Shortlisted</span><strong>{shortlistedCount}</strong></div>
                </div>
                <p className={styles.insightNote}>
                  Proposals are linked to this task only. That solves the routing issue: each task has its own review page and its own proposal set.
                </p>
              </aside>
            </section>

            <section className={styles.gridBids}>
              {bids.length ? (
                bids.map((bid, index) => {
                  const shortlisted = shortlistedIds.includes(bid.id);
                  const labor = Math.round(parseAmount(bid.amount) * 0.67);
                  const materials = Math.round(parseAmount(bid.amount) * 0.25);
                  const fees = parseAmount(bid.amount) - labor - materials;

                  return (
                    <article key={bid.id} className={styles.bidCard}>
                      <div className={styles.bidHeader}>
                        <Link href={`/dashboard/client/tasks/${task.id}/proposals/${bid.id}`} className={styles.bidUserLink}>
                          <div className={styles.bidUser}>
                            <div className={styles.bidAvatar}>{bid.initials}</div>
                            <div>
                              <div className={styles.bidNameRow}>
                                <h3>{bid.bidder}</h3>
                                {index === 0 ? <span className={styles.topRatedBadge}>Top Rated</span> : null}
                              </div>
                              <div className={styles.bidMeta}>
                                <span>{bid.rating} ({bid.reviews} Reviews)</span>
                                {bid.verified ? <span className={styles.verified}>Verified Pro</span> : null}
                                <span>{task.location}</span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className={styles.bidPriceBox}>
                          <strong>{bid.amount}</strong>
                          <span>{bid.amountType}</span>
                        </div>
                      </div>

                      <div className={styles.costBreakdown}>
                        <div><span>Labor</span><span>{labor.toLocaleString()} XOF</span></div>
                        <div><span>Materials</span><span>{materials.toLocaleString()} XOF</span></div>
                        <div><span>Fees / Extras</span><span>{fees.toLocaleString()} XOF</span></div>
                        <div className={styles.totalRow}><span>Total Proposal</span><span>{bid.amount}</span></div>
                      </div>

                      <div className={styles.statsGrid}>
                        <div><span>Success Rate</span><strong>{Math.round(bid.rating * 20)}% Completion</strong></div>
                        <div><span>Duration</span><strong>{index === 0 ? "3 days work" : "4 days work"}</strong></div>
                        <div><span>Availability</span><strong>{index === 0 ? "Starts Wednesday" : "Next Monday"}</strong></div>
                        <div><span>Warranty</span><strong>{bid.verified ? "1 Year on labor" : "Standard support"}</strong></div>
                      </div>

                      <div className={styles.questionBox}>
                        <strong>Question from {bid.bidder.split(" ")[0]}:</strong>
                        <p>
                          {index === 0
                            ? "Do you need any building-specific insurance wording before work starts?"
                            : "Do we have full access to the property during working hours for uninterrupted installation?"}
                        </p>
                      </div>

                      <blockquote className={styles.coverLetter}>{bid.message}</blockquote>

                      <div>
                        <h4 className={styles.subhead}>{index === 0 ? "Related Past Work" : "Featured Review"}</h4>
                        {index === 0 ? (
                          <div className={styles.portfolioRow}>
                            {bid.portfolio.map((item) => (
                              <span key={item} className={styles.portfolioThumb}>
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className={styles.reviewBox}>
                            <p>
                              &quot;Strong communication, clean execution, and they finished an older-building upgrade without surprises.&quot;
                            </p>
                            <span>Client review</span>
                          </div>
                        )}
                      </div>

                      <div className={styles.bidActions}>
                        <Link href={`/dashboard/client/tasks/${task.id}/proposals/${bid.id}`} className={styles.outlineButton}>
                          View Profile
                        </Link>
                        <button type="button" className={shortlisted ? styles.secondaryActiveButton : styles.outlineButton} onClick={() => toggleShortlist(bid.id)}>
                          {shortlisted ? "Shortlisted" : "Shortlist"}
                        </button>
                        <Link href={`/dashboard/client/tasks/${task.id}/proposals/${bid.id}/payment`} className={styles.primaryButton}>
                          Accept Proposal
                        </Link>
                        <button type="button" className={styles.iconAction} aria-label={`Message ${bid.bidder}`}>
                          <iconify-icon icon="lucide:message-square" />
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className={styles.emptyState}>No proposals have arrived for this task yet.</div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
