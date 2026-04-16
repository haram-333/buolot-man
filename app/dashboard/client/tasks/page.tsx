"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clientTasks, dashboardNavItems, getStatusMeta } from "../taskData";
import styles from "./page.module.css";

export default function ClientTasksPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return clientTasks;
    return clientTasks.filter((task) =>
      [task.title, task.location, task.category, task.pro, task.schedule].join(" ").toLowerCase().includes(normalized)
    );
  }, [query]);

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
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." />
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
            <section className={styles.hero}>
              <div>
                <p className={styles.eyebrow}>Task management</p>
                <h2>My Tasks</h2>
                <p>Open any task to manage progress, review proposals, and keep communication in one place.</p>
              </div>
              <Link href="/post-task" className={styles.primaryButton}>
                <iconify-icon icon="lucide:plus" />
                Post another task
              </Link>
            </section>

            <section className={styles.list}>
              {filteredTasks.map((task) => {
                const statusMeta = getStatusMeta(task.status);
                return (
                  <article key={task.id} className={styles.taskCard}>
                    <div className={styles.taskMain}>
                      <div className={styles.cardHeader}>
                        <span className={`${styles.badge} ${styles[statusMeta.badgeClass]}`}>{statusMeta.label}</span>
                        <strong>{task.budget}</strong>
                      </div>
                      <h3>{task.title}</h3>
                      <div className={styles.taskMeta}>
                        <span>{task.category}</span>
                        <span>{task.location}</span>
                        <span>{task.schedule}</span>
                      </div>
                      <div className={styles.progressBlock}>
                        <div className={styles.progressHeader}>
                          <span>{task.progressLabel}</span>
                          <strong>{task.progress}%</strong>
                        </div>
                        <div className={styles.progressTrack}>
                          <span className={`${styles.progressFill} ${styles[statusMeta.progressClass]}`} style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.taskAside}>
                      <div className={styles.proChip}>{task.pro}</div>
                      <Link
                        href={task.status === "quotes" ? `/dashboard/client/tasks/${task.id}/proposals` : `/dashboard/client/tasks/${task.id}`}
                        className={styles.openButton}
                      >
                        {task.status === "quotes" ? "Review Proposals" : "Open Task"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
