"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

type NavKey = "dashboard" | "tasks" | "messages" | "payments" | "saved" | "profile";

const navItems: Array<{ key: NavKey; label: string; icon: string; href: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard", href: "/dashboard/client" },
  { key: "tasks", label: "My Tasks", icon: "lucide:clipboard-list", href: "/dashboard/client" },
  { key: "messages", label: "Messages", icon: "lucide:message-square", href: "/dashboard/client" },
  { key: "payments", label: "Payments", icon: "lucide:credit-card", href: "/dashboard/client" },
  { key: "saved", label: "Saved", icon: "lucide:bookmark", href: "/dashboard/client" },
  { key: "profile", label: "Profile", icon: "lucide:user", href: "/dashboard/client" },
];

const attachments = [
  { name: "apartment_floor_plan.pdf", size: "2.4 MB • PDF Document", icon: "lucide:file-text" },
  { name: "current_panel_photo.jpg", size: "1.1 MB • JPEG Image", icon: "lucide:image" },
];

const skills = ["Wiring", "Circuit Breakers", "Lighting Installation", "Panel Installation"];

export default function TaskReviewPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
              <Link key={item.key} href={item.href} className={`${styles.navItem} ${item.key === "tasks" ? styles.navItemActive : ""}`}>
                <iconify-icon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
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
                <input type="search" placeholder="Search tasks, professionals..." aria-label="Search tasks and professionals" />
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
            <div className={styles.contentInner}>
              <section className={styles.pageHeader}>
                <div>
                  <h2>Review & Publish</h2>
                  <p>Here&apos;s how your task will appear to professionals.</p>
                </div>

                <div className={styles.stepper} aria-label="Task publishing progress">
                  <div className={`${styles.step} ${styles.stepCompleted}`}>
                    <span className={styles.stepNumber}>
                      <iconify-icon icon="lucide:check" />
                    </span>
                    <span className={styles.stepText}>Draft</span>
                  </div>
                  <span className={`${styles.stepLine} ${styles.stepLineCompleted}`} />
                  <div className={`${styles.step} ${styles.stepActive}`}>
                    <span className={styles.stepNumber}>2</span>
                    <span className={styles.stepText}>Preview</span>
                  </div>
                  <span className={styles.stepLine} />
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>3</span>
                    <span className={styles.stepText}>Publish</span>
                  </div>
                </div>
              </section>

              <div className={styles.twoColumnLayout}>
                <div className={styles.mainColumn}>
                  <section className={styles.card}>
                    <div className={styles.previewMeta}>
                      <span className={styles.metaBadge}>Electrical</span>
                      <span className={styles.metaBadge}>Wiring & Installation</span>
                      <span className={`${styles.metaBadge} ${styles.metaUrgency}`}>Standard / Flexible</span>
                    </div>

                    <h3 className={styles.taskTitle}>Complete electrical wiring for new apartment</h3>

                    <p className={styles.copy}>
                      I need a certified electrician to completely wire a newly built 3-bedroom apartment. The job includes
                      installing circuit breakers, wiring for all lighting fixtures, and installing wall outlets. All
                      structural conduits are already in place.
                    </p>
                    <p className={styles.copy}>
                      The workspace is clean and easily accessible. Expected timeframe for completion is about 3-5 days.
                      Please ensure you have references for similar residential projects.
                    </p>

                    <div className={styles.divider} />

                    <div className={styles.skillsBlock}>
                      <strong>Required Skills</strong>
                      <div className={styles.tagRow}>
                        {skills.map((skill) => (
                          <span key={skill} className={styles.tag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Logistics & Schedule</h3>
                    </div>

                    <div className={styles.detailGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}><iconify-icon icon="lucide:calendar" /></span>
                        <div>
                          <small>Expected Date</small>
                          <strong>Oct 24, 2025</strong>
                        </div>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}><iconify-icon icon="lucide:sun" /></span>
                        <div>
                          <small>Time Preference</small>
                          <strong>Morning (8AM - 12PM)</strong>
                        </div>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}><iconify-icon icon="lucide:hammer" /></span>
                        <div>
                          <small>Materials</small>
                          <strong>Client provides materials</strong>
                        </div>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}><iconify-icon icon="lucide:smartphone" /></span>
                        <div>
                          <small>Contact Method</small>
                          <strong>In-app Messaging, Phone</strong>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Location</h3>
                    </div>

                    <div className={styles.locationGrid}>
                      <div className={styles.mapPreview}>
                        <div className={styles.mapPin}><iconify-icon icon="lucide:map-pin" /></div>
                      </div>

                      <div className={styles.locationInfo}>
                        <span className={styles.locationBadge}>
                          <iconify-icon icon="lucide:navigation" />
                          Onsite Task
                        </span>
                        <strong>Rue des Jardins, Cocody Deux Plateaux</strong>
                        <p>
                          Building C, Apt 14
                          <br />
                          Abidjan
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Attachments (2)</h3>
                    </div>

                    <div className={styles.fileList}>
                      {attachments.map((file) => (
                        <div key={file.name} className={styles.fileItem}>
                          <div className={styles.fileIcon}>
                            <iconify-icon icon={file.icon} />
                          </div>
                          <div className={styles.fileInfo}>
                            <strong>{file.name}</strong>
                            <span>{file.size}</span>
                          </div>
                          <button type="button" className={styles.downloadButton} aria-label={`Download ${file.name}`}>
                            <iconify-icon icon="lucide:download" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className={styles.sidePanel}>
                  <section className={styles.card}>
                    <small className={styles.eyebrow}>Estimated Budget</small>
                    <div className={styles.priceDisplay}>
                      85,000 <span>XOF</span>
                    </div>
                    <span className={styles.priceType}>Fixed Price</span>

                    <div className={styles.divider} />

                    <div className={styles.costList}>
                      <div>
                        <span>Boulot Man Service Fee (5%)</span>
                        <strong>4,250 XOF</strong>
                      </div>
                      <div>
                        <span>Total Estimated Cost</span>
                        <strong>89,250 XOF</strong>
                      </div>
                    </div>

                    <div className={styles.safeNotice}>
                      <iconify-icon icon="lucide:shield-check" />
                      <p>Your payment is held securely until you confirm the task is completed.</p>
                    </div>
                  </section>

                  <section className={`${styles.card} ${styles.actionCard}`}>
                    <div className={styles.actionIntro}>
                      <h3>Ready to post?</h3>
                      <p>Once published, available professionals in your area will be notified and can start sending offers.</p>
                    </div>

                    <div className={styles.actionStack}>
                      <Link href="/post-task/success" className={styles.primaryButton}>
                        Publish Task Now
                      </Link>
                      <Link href="/post-task" className={styles.editButton}>
                        <iconify-icon icon="lucide:pencil" />
                        Edit Details
                      </Link>
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
