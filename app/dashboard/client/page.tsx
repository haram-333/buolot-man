"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getStatusMeta, type NavKey, type TaskStatus } from "./taskData";
import styles from "./page.module.css";

type Task = {
  id: string;
  title: string;
  location: string;
  schedule: string;
  budget: string;
  progressLabel: string;
  progress: number;
  status: TaskStatus;
  pro: string;
};

type Activity = {
  id: string;
  icon: string;
  title: string;
  time: string;
  note?: string;
};

type SavedPro = {
  id: string;
  name: string;
  role: string;
  rating: number;
  jobs: number;
  initials: string;
};

type RecommendedPro = {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  tags: string[];
  initials: string;
};

const navItems: Array<{ key: NavKey; label: string; icon: string; href?: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard" },
  { key: "tasks", label: "My Tasks", icon: "lucide:clipboard-list", href: "/dashboard/client/tasks" },
  { key: "messages", label: "Messages", icon: "lucide:message-square", href: "/dashboard/client/messages" },
  { key: "payments", label: "Payments", icon: "lucide:credit-card" },
  { key: "saved", label: "Saved", icon: "lucide:bookmark" },
  { key: "profile", label: "Profile", icon: "lucide:user" },
];

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Electrical Wiring Troubleshooting",
    location: "Cocody, Abidjan",
    schedule: "Started: Oct 12 • Est. Finish: Oct 14",
    budget: "15,000 XOF",
    progressLabel: "Diagnostics Complete",
    progress: 50,
    status: "in-progress",
    pro: "Kouassi Marc",
  },
  {
    id: "task-2",
    title: "Smart Home Solar Integration",
    location: "Marcory, Abidjan",
    schedule: "Tomorrow, 10:00 AM - 02:00 PM",
    budget: "20,000 XOF",
    progressLabel: "Awaiting Professional Arrival",
    progress: 0,
    status: "scheduled",
    pro: "Awa Toure",
  },
  {
    id: "task-3",
    title: "Office Network Deployment",
    location: "Plateau, Abidjan",
    schedule: "Flexible timeline • Needs 2 days",
    budget: "Est. 45k-60k",
    progressLabel: "3 active offers to review",
    progress: 10,
    status: "quotes",
    pro: "3 Offers",
  },
];

const activities: Activity[] = [
  {
    id: "activity-1",
    icon: "lucide:play-circle",
    title: "Kouassi Marc started working on Electrical Wiring",
    time: "Today, 09:15 AM",
    note: '"I have arrived at the site and I am starting diagnostics now."',
  },
  {
    id: "activity-2",
    icon: "lucide:check-circle",
    title: "Payment of 25,000 XOF released to Mariam Kone",
    time: "Yesterday, 04:45 PM",
  },
  {
    id: "activity-3",
    icon: "lucide:star",
    title: "Mariam Kone left you a 5-star review",
    time: "Yesterday, 04:50 PM",
  },
  {
    id: "activity-4",
    icon: "lucide:file-text",
    title: "You posted a new task: Smart Home Solar Integration",
    time: "Oct 11, 02:30 PM",
  },
];

const initialSavedPros: SavedPro[] = [
  { id: "saved-1", name: "Mariam Kone", role: "Network & CCTV Expert", rating: 4.9, jobs: 120, initials: "MK" },
  { id: "saved-2", name: "Amadou Diop", role: "Plumbing Specialist", rating: 4.7, jobs: 85, initials: "AD" },
  { id: "saved-3", name: "Awa Toure", role: "Solar Installation", rating: 5.0, jobs: 32, initials: "AT" },
];

const recommendedPros: RecommendedPro[] = [
  { id: "rec-1", name: "Jean-Luc B.", role: "Master Carpenter", rating: 4.8, reviews: 56, tags: ["Furniture", "Doors"], initials: "JB" },
  { id: "rec-2", name: "Fatou S.", role: "Interior Painter", rating: 4.9, reviews: 112, tags: ["Painting", "Decor"], initials: "FS" },
  { id: "rec-3", name: "Bamba K.", role: "Appliance Repair", rating: 4.6, reviews: 43, tags: ["AC Units", "Fridges"], initials: "BK" },
  { id: "rec-4", name: "Sarah M.", role: "Deep Cleaning Spec.", rating: 5.0, reviews: 89, tags: ["Post-Reno", "Office"], initials: "SM" },
];

export default function ClientDashboardPage() {
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [savedPros, setSavedPros] = useState(initialSavedPros);
  const [hiredIds, setHiredIds] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        [task.title, task.location, task.pro, task.schedule].join(" ").toLowerCase().includes(normalizedQuery)
      ),
    [normalizedQuery, tasks]
  );

  const filteredSavedPros = useMemo(
    () => savedPros.filter((pro) => [pro.name, pro.role].join(" ").toLowerCase().includes(normalizedQuery)),
    [normalizedQuery, savedPros]
  );

  const filteredRecommended = useMemo(
    () =>
      recommendedPros.filter((pro) =>
        [pro.name, pro.role, ...pro.tags].join(" ").toLowerCase().includes(normalizedQuery)
      ),
    [normalizedQuery]
  );

  const activeTasks = tasks.filter((task) => task.status !== "quotes").length;

  const completeTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const rescheduleTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, schedule: "Rescheduled for Friday, 11:00 AM", status: "scheduled" } : task
      )
    );
  };

  const hireSavedPro = (proId: string) => {
    if (hiredIds.includes(proId)) return;
    setHiredIds((current) => [...current, proId]);
  };

  const removeSavedPro = (proId: string) => {
    setSavedPros((current) => current.filter((pro) => pro.id !== proId));
    setHiredIds((current) => current.filter((id) => id !== proId));
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
            <button
              type="button"
              className={styles.sidebarClose}
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            >
              <iconify-icon icon="lucide:x" />
            </button>
          </div>

          <nav className={styles.sidebarNav} aria-label="Dashboard navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.navItem} ${activeNav === item.key ? styles.navItemActive : ""}`}
                onClick={() => {
                  if (item.href) {
                    window.location.href = item.href;
                    return;
                  }
                  setActiveNav(item.key);
                  setMobileNavOpen(false);
                }}
              >
                <iconify-icon icon={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <p className={styles.sidebarHint}>Need more help?</p>
            <Link href="/search" className={styles.sidebarLink}>
              Explore professionals
            </Link>
            <Link href="/login" className={styles.logoutButton}>
              <iconify-icon icon="lucide:log-out" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button
                type="button"
                className={styles.mobileMenuButton}
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
              >
                <iconify-icon icon="lucide:menu" />
              </button>

              <label className={styles.searchBar}>
                <iconify-icon icon="lucide:search" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tasks, professionals, activity..."
                  aria-label="Search dashboard content"
                />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button type="button" className={styles.iconButton} aria-label="Notifications">
                <iconify-icon icon="lucide:bell" />
                <span className={styles.notificationDot} />
              </button>

              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>JD</div>
                <div>
                  <p className={styles.userName}>John Doe</p>
                  <p className={styles.userRole}>Client</p>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <section className={styles.welcomeSection}>
              <div>
                <p className={styles.eyebrow}>Dashboard overview</p>
                <h2 className={styles.welcomeTitle}>Welcome back, ready to get things done?</h2>
                <p className={styles.welcomeSubtitle}>
                  Track active jobs, review quotes, manage saved professionals, and move faster on your next project.
                </p>
              </div>

              <div className={styles.welcomeActions}>
                <Link href="/post-task" className={styles.primaryButton}>
                  <iconify-icon icon="lucide:plus" />
                  Post a Task
                </Link>
                <Link href="/categories/electrical/listings" className={styles.secondaryButton}>
                  Browse electricians
                </Link>
              </div>
            </section>

            <section className={styles.statsGrid} aria-label="Account stats">
              <article className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.statAccent}`}>
                  <iconify-icon icon="lucide:briefcase" />
                </div>
                <div>
                  <h3>{activeTasks}</h3>
                  <p>Active Tasks</p>
                </div>
              </article>

              <article className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.statSuccess}`}>
                  <iconify-icon icon="lucide:check-square" />
                </div>
                <div>
                  <h3>12</h3>
                  <p>Completed Tasks</p>
                </div>
              </article>

              <article className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.statPrimary}`}>
                  <iconify-icon icon="lucide:wallet" />
                </div>
                <div>
                  <h3>450k XOF</h3>
                  <p>Total Spent</p>
                </div>
              </article>

              <article className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.statWarning}`}>
                  <iconify-icon icon="lucide:bookmark" />
                </div>
                <div>
                  <h3>{savedPros.length}</h3>
                  <p>Saved Pros</p>
                </div>
              </article>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Active Tasks Details</h3>
                <Link href="/dashboard/client/tasks" className={styles.linkButton}>
                  View All Tasks
                </Link>
              </div>

              <div className={styles.tasksGrid}>
                {filteredTasks.map((task) => {
                  const statusMeta = getStatusMeta(task.status);

                  return (
                    <article key={task.id} className={styles.card}>
                      <div className={styles.cardHeaderRow}>
                        <span className={`${styles.badge} ${styles[statusMeta.badgeClass]}`}>{statusMeta.label}</span>
                        <strong className={styles.amount}>{task.budget}</strong>
                      </div>

                      <div className={styles.taskBody}>
                        <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.taskTitleLink}>
                          <h4 className={styles.taskTitle}>{task.title}</h4>
                        </Link>
                        <div className={styles.metaList}>
                          <p className={styles.metaItem}>
                            <iconify-icon icon="lucide:map-pin" />
                            {task.location}
                          </p>
                          <p className={styles.metaItem}>
                            <iconify-icon icon="lucide:calendar-clock" />
                            {task.schedule}
                          </p>
                        </div>

                        <div className={styles.progressBlock}>
                          <div className={styles.progressHeader}>
                            <span>{task.progressLabel}</span>
                            <strong>{task.progress}%</strong>
                          </div>
                          <div className={styles.progressTrack}>
                            <span
                              className={`${styles.progressFill} ${styles[statusMeta.progressClass]}`}
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.taskFooter}>
                        <div className={styles.inlineIdentity}>
                          <span className={styles.identityAvatar}>{task.pro.slice(0, 2).toUpperCase()}</span>
                          <span className={styles.identityName}>{task.pro}</span>
                        </div>

                        {task.status === "in-progress" ? (
                          <div className={styles.taskActionGroup}>
                            <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.outlineSmallButton}>
                              Open Task
                            </Link>
                            <button type="button" className={styles.outlineSmallButton} onClick={() => completeTask(task.id)}>
                              Mark complete
                            </button>
                          </div>
                        ) : null}

                        {task.status === "scheduled" ? (
                          <div className={styles.taskActionGroup}>
                            <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.outlineSmallButton}>
                              Open Task
                            </Link>
                            <button type="button" className={styles.outlineSmallButton} onClick={() => rescheduleTask(task.id)}>
                              Reschedule
                            </button>
                          </div>
                        ) : null}

                        {task.status === "quotes" ? (
                          <div className={styles.taskActionGroup}>
                            <Link href={`/dashboard/client/tasks/${task.id}`} className={styles.outlineSmallButton}>
                              Open Task
                            </Link>
                            <Link href={`/dashboard/client/tasks/${task.id}/proposals`} className={styles.primarySmallButton}>
                              Review Proposals
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className={styles.twoColumnGrid}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3>Recent Activity Pipeline</h3>
                  <button type="button" className={styles.linkButton} onClick={() => setActiveNav("messages")}>
                    View History
                  </button>
                </div>

                <div className={`${styles.card} ${styles.timelineCard}`}>
                  <div className={styles.timeline}>
                    {activities
                      .filter((activity) =>
                        [activity.title, activity.time, activity.note ?? ""].join(" ").toLowerCase().includes(normalizedQuery)
                      )
                      .map((activity) => (
                        <article key={activity.id} className={styles.timelineItem}>
                          <div className={styles.timelineIcon}>
                            <iconify-icon icon={activity.icon} />
                          </div>
                          <div className={styles.timelineContent}>
                            <h4>{activity.title}</h4>
                            <p>{activity.time}</p>
                            {activity.note ? <div className={styles.activityNote}>{activity.note}</div> : null}
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3>Saved Professionals</h3>
                  <button type="button" className={styles.linkButton} onClick={() => setActiveNav("saved")}>
                    View Bookmarks
                  </button>
                </div>

                <div className={styles.savedList}>
                  {filteredSavedPros.map((pro) => {
                    const hired = hiredIds.includes(pro.id);

                    return (
                      <article key={pro.id} className={styles.savedItem}>
                        <div className={styles.savedAvatar}>{pro.initials}</div>
                        <div className={styles.savedInfo}>
                          <h4>{pro.name}</h4>
                          <p>{pro.role}</p>
                          <span className={styles.savedRating}>
                            <iconify-icon icon="lucide:star" />
                            {pro.rating} ({pro.jobs} jobs)
                          </span>
                        </div>
                        <div className={styles.savedActions}>
                          <button
                            type="button"
                            className={hired ? styles.successSmallButton : styles.outlineSmallButton}
                            onClick={() => hireSavedPro(pro.id)}
                          >
                            {hired ? "Hired" : "Hire"}
                          </button>
                          <button type="button" className={styles.linkButtonMuted} onClick={() => removeSavedPro(pro.id)}>
                            Remove
                          </button>
                        </div>
                      </article>
                    );
                  })}

                  <Link href="/categories/electrical/listings" className={styles.dashedButton}>
                    <iconify-icon icon="lucide:search" />
                    Find more professionals
                  </Link>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Recommended for your next projects</h3>
              </div>

              <div className={styles.recommendedGrid}>
                {filteredRecommended.map((pro) => (
                  <article key={pro.id} className={`${styles.card} ${styles.recommendedCard}`}>
                    <div className={styles.recommendedAvatar}>{pro.initials}</div>
                    <h4>{pro.name}</h4>
                    <p>{pro.role}</p>
                    <span className={styles.savedRating}>
                      <iconify-icon icon="lucide:star" />
                      {pro.rating} ({pro.reviews} reviews)
                    </span>
                    <div className={styles.tagList}>
                      {pro.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href="/categories/electrical/listings" className={styles.outlineBlockButton}>
                      View Profile
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
