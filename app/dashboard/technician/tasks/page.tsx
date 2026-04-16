"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { technicianMarketplaceTasks, type TechnicianMarketplaceTask } from "../taskMarketplaceData";
import styles from "./page.module.css";

type TaskFilter = "all" | "urgent" | "residential" | "commercial";
type SortOption = "newest" | "budget" | "match";

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

const tasks = technicianMarketplaceTasks;

const initialActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Shortlisted for generator maintenance check",
    detail: "Client viewed your profile and kept your bid in the top three.",
    time: "18 min ago",
  },
  {
    id: "activity-2",
    title: "Escrow released",
    detail: "Apartment lighting payout moved into your available wallet.",
    time: "Today",
  },
  {
    id: "activity-3",
    title: "Profile visibility increased",
    detail: "You appeared in 18 searches after updating your availability.",
    time: "Yesterday",
  },
];

export default function TechnicianTasksPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [activities, setActivities] = useState(initialActivities);
  const [walletAvailable, setWalletAvailable] = useState(2980);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    let next = tasks.filter((task) => {
      if (activeFilter === "urgent" && !task.urgent) return false;
      if (activeFilter === "residential" && task.type !== "residential") return false;
      if (activeFilter === "commercial" && task.type !== "commercial") return false;

      if (!normalizedQuery) return true;

      return [task.title, task.description, task.location, task.schedule, ...task.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });

    if (sortBy === "budget") next = [...next].sort((a, b) => b.budgetValue - a.budgetValue);
    else if (sortBy === "match") next = [...next].sort((a, b) => b.match - a.match);

    return next;
  }, [activeFilter, normalizedQuery, sortBy]);

  const activeJobs = tasks.filter((task) => submittedIds.includes(task.id)).length;
  const urgentCount = tasks.filter((task) => task.urgent).length;
  const averageMatch = Math.round(tasks.reduce((sum, task) => sum + task.match, 0) / tasks.length);

  const pushActivity = (title: string, detail: string, time: string) => {
    setActivities((current) => [{ id: `${Date.now()}-${Math.random()}`, title, detail, time }, ...current]);
  };

  const toggleSaved = (taskId: string) => {
    const isSaved = savedIds.includes(taskId);
    setSavedIds((current) => (isSaved ? current.filter((id) => id !== taskId) : [...current, taskId]));
    pushActivity(
      isSaved ? "Removed task from saved list" : "Saved task for later",
      tasks.find((task) => task.id === taskId)?.title ?? "Marketplace task",
      "Now"
    );
  };

  const submitBid = (task: TechnicianMarketplaceTask) => {
    if (submittedIds.includes(task.id)) return;
    setSubmittedIds((current) => [...current, task.id]);
    pushActivity("Bid submitted", `You sent a proposal for ${task.title}.`, "Now");
  };

  const addFunds = () => {
    setWalletAvailable((current) => current + 250);
    pushActivity("Wallet topped up", "Added working capital for travel, materials, and marketplace fees.", "Now");
  };

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarTop}>
            <Link href="/" className={styles.brand} aria-label="Boulot Man home">
              <Image src="/boulotman-logo.png" alt="Boulot Man" width={220} height={56} className={styles.brandImage} priority />
            </Link>
            <button type="button" className={styles.sidebarClose} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>
              <iconify-icon icon="lucide:x" />
            </button>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>DM</div>
            <div className={styles.profileMeta}>
              <strong>Daniel Mensah</strong>
              <span>Electrician · Verified Pro</span>
              <small>4.9 rating · 126 completed jobs</small>
            </div>
          </div>

          <nav className={styles.sidebarNav} aria-label="Technician navigation">
            <Link href="/dashboard/technician" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:layout-dashboard" /></span>
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/technician/tasks" className={`${styles.navItem} ${styles.navItemActive}`}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:search" /></span>
              <span>Browse Tasks</span>
            </Link>
            <Link href="/dashboard/technician/bids" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:file-text" /></span>
              <span>My Bids</span>
            </Link>
            <Link href="/dashboard/technician/messages" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:messages-square" /></span>
              <span>Messages</span>
            </Link>
            <Link href="/dashboard/technician/wallet" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:wallet" /></span>
              <span>Wallet</span>
            </Link>
            <Link href="/dashboard/technician/profile" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:user-round" /></span>
              <span>Profile</span>
            </Link>
          </nav>

          <div className={styles.sidebarCard}>
            <strong>Bid smarter</strong>
            <p>Use match score, budget, and urgency to prioritize the requests most likely to convert into paid work.</p>
          </div>

          <Link href="/login" className={styles.logoutButton}>
            <iconify-icon icon="lucide:log-out" />
            <span>Logout</span>
          </Link>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button type="button" className={styles.mobileMenuButton} aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
                <iconify-icon icon="lucide:menu" />
              </button>
              <label className={styles.searchBox}>
                <iconify-icon icon="lucide:search" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks or keywords" aria-label="Search tasks" />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button type="button" className={styles.iconButton} aria-label="Notifications">
                <iconify-icon icon="lucide:bell" />
                <span className={styles.notificationDot} />
              </button>
              <div className={styles.topbarProfile}>
                <div className={styles.topbarAvatar}>DM</div>
                <div className={styles.topbarProfileLines}>
                  <strong>Daniel Mensah</strong>
                  <span>Available today</span>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <section className={styles.pageHeader}>
              <div>
                <p className={styles.eyebrow}>Marketplace</p>
                <h1>Browse Tasks</h1>
                <p>Review active requests, compare budgets, and send bids from one focused workspace.</p>
              </div>
              <Link href="/dashboard/technician" className={styles.primaryButton}>
                <iconify-icon icon="lucide:layout-dashboard" />
                Back to Dashboard
              </Link>
            </section>

            <section className={styles.statsGrid}>
              <article className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span>Available tasks</span>
                  <span className={styles.statIcon}><iconify-icon icon="lucide:layers-3" /></span>
                </div>
                <strong>{tasks.length}</strong>
                <p>{urgentCount} urgent requests need fast replies.</p>
              </article>
              <article className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span>Average match</span>
                  <span className={styles.statIcon}><iconify-icon icon="lucide:target" /></span>
                </div>
                <strong>{averageMatch}%</strong>
                <p>Based on your profile, category fit, and response speed.</p>
              </article>
              <article className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span>Bids sent</span>
                  <span className={styles.statIcon}><iconify-icon icon="lucide:send" /></span>
                </div>
                <strong>{activeJobs}</strong>
                <p>Fresh proposals submitted from this marketplace view.</p>
              </article>
            </section>

            <div className={styles.dashboardGrid}>
              <div className={styles.mainColumn}>
                <section className={styles.filtersCard}>
                  <div className={styles.tabs}>
                    <button type="button" className={`${styles.tab} ${activeFilter === "all" ? styles.tabActive : ""}`} onClick={() => setActiveFilter("all")}>All Tasks</button>
                    <button type="button" className={`${styles.tab} ${activeFilter === "urgent" ? styles.tabActive : ""}`} onClick={() => setActiveFilter("urgent")}>Urgent</button>
                    <button type="button" className={`${styles.tab} ${activeFilter === "residential" ? styles.tabActive : ""}`} onClick={() => setActiveFilter("residential")}>Residential</button>
                    <button type="button" className={`${styles.tab} ${activeFilter === "commercial" ? styles.tabActive : ""}`} onClick={() => setActiveFilter("commercial")}>Commercial</button>
                  </div>

                  <label className={styles.sortWrap}>
                    <span>Sort by</span>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className={styles.sortSelect}>
                      <option value="newest">Newest</option>
                      <option value="budget">Highest Budget</option>
                      <option value="match">Best Match</option>
                    </select>
                  </label>
                </section>

                <section className={styles.taskList}>
                  {filteredTasks.length ? (
                    filteredTasks.map((task) => {
                      const isSaved = savedIds.includes(task.id);
                      const isSubmitted = submittedIds.includes(task.id);

                      return (
                        <article key={task.id} className={styles.taskCard}>
                          <div className={styles.taskHeader}>
                            <div className={styles.taskMain}>
                              <div className={styles.titleRow}>
                                <Link href={`/dashboard/technician/tasks/${task.id}`} className={styles.titleLink}>
                                  <h2>{task.title}</h2>
                                </Link>
                                <span className={`${styles.badge} ${task.urgent ? styles.badgeUrgent : styles.badgeOpen}`}>
                                  <iconify-icon icon={task.urgent ? "lucide:zap" : "lucide:circle-dashed"} />
                                  {task.urgent ? "Urgent" : "Open"}
                                </span>
                              </div>
                              <p>{task.description}</p>
                              <div className={styles.tagList}>
                                {task.tags.map((tag) => (
                                  <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                              </div>
                              <div className={styles.metaRow}>
                                <span><iconify-icon icon="lucide:map-pin" />{task.location}</span>
                                <span><iconify-icon icon="lucide:calendar" />{task.posted}</span>
                                <span><iconify-icon icon="lucide:clock-3" />{task.schedule}</span>
                                <span><iconify-icon icon="lucide:paperclip" />{task.attachments} attachments</span>
                              </div>
                            </div>

                            <div className={styles.priceBlock}>
                              <strong>{task.budgetLabel}</strong>
                              <span>{task.match}% match</span>
                            </div>
                          </div>

                          <div className={styles.taskFooter}>
                            <div className={styles.proposalsInfo}>
                              <div className={styles.proposalAvatars} aria-hidden="true">
                                {task.proposals.map((initials) => (
                                  <span key={initials}>{initials}</span>
                                ))}
                              </div>
                              <small>{task.proposals.length} active bids already in play</small>
                            </div>

                            <div className={styles.actions}>
                              <Link href={`/dashboard/technician/tasks/${task.id}`} className={styles.secondaryButton}>
                                <iconify-icon icon="lucide:arrow-up-right" />
                                View Details
                              </Link>
                              <button type="button" className={styles.secondaryButton} onClick={() => toggleSaved(task.id)}>
                                <iconify-icon icon={isSaved ? "lucide:bookmark-check" : "lucide:bookmark"} />
                                {isSaved ? "Saved" : "Save"}
                              </button>
                              <button type="button" className={`${styles.primarySmallButton} ${isSubmitted ? styles.successButton : ""}`} onClick={() => submitBid(task)}>
                                <iconify-icon icon={isSubmitted ? "lucide:check-circle-2" : "lucide:send-horizontal"} />
                                {isSubmitted ? "Bid Submitted" : "Submit Bid"}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <div className={styles.emptyState}>No tasks match your current filters.</div>
                  )}
                </section>
              </div>

              <aside className={styles.sideColumn}>
                <section className={styles.panelCard}>
                  <div className={styles.panelHeader}>
                    <h3>Wallet Balance</h3>
                    <iconify-icon icon="lucide:wallet" />
                  </div>
                  <strong className={styles.walletValue}>${walletAvailable.toLocaleString()}</strong>
                  <p>Available funds for transport, materials, and fast-turnaround marketplace jobs.</p>
                  <button type="button" className={styles.outlineButton} onClick={addFunds}>
                    <iconify-icon icon="lucide:plus-circle" />
                    Add Funds
                  </button>
                </section>

                <section className={styles.panelCard}>
                  <div className={styles.panelHeader}>
                    <h3>Recent Activity</h3>
                    <span>{activities.length}</span>
                  </div>
                  <div className={styles.timeline}>
                    {activities.map((item, index) => (
                      <div key={item.id} className={styles.timelineItem}>
                        <span className={`${styles.timelineIcon} ${index === 0 ? styles.timelineIconActive : ""}`}>
                          <iconify-icon icon={index === 0 ? "lucide:sparkles" : "lucide:file-text"} />
                        </span>
                        <div className={styles.timelineContent}>
                          <strong>{item.title}</strong>
                          <p>{item.detail}</p>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className={`${styles.panelCard} ${styles.helpCard}`}>
                  <h3>Need Help?</h3>
                  <p>Support can review suspicious requests, payment issues, or task scope questions before you bid.</p>
                  <button type="button" className={styles.helpButton}>Contact Support</button>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
