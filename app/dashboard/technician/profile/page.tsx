"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

const skillSet = [
  "Electrical Wiring",
  "Panel Upgrades",
  "Troubleshooting",
  "Smart Home Setup",
  "Lighting Installation",
  "Generator Install",
  "Circuit Repair",
];

const portfolioItems = [
  { id: "portfolio-1", title: "Commercial Lighting", tone: "toneBlue" },
  { id: "portfolio-2", title: "Panel Upgrade", tone: "toneGold" },
  { id: "portfolio-3", title: "Smart Integration", tone: "toneGreen" },
  { id: "portfolio-4", title: "New Wiring", tone: "toneCoral" },
  { id: "portfolio-5", title: "Generator Install", tone: "toneSlate" },
  { id: "portfolio-6", title: "Circuit Repairs", tone: "tonePurple" },
];

const reviews = [
  {
    id: "review-1",
    name: "Sarah Jenkins",
    initials: "SJ",
    date: "October 12, 2024",
    rating: 5,
    text:
      "Carlos arrived on time, diagnosed the circuit breaker issue immediately, and fixed it within the hour. Very professional and explained everything clearly.",
  },
  {
    id: "review-2",
    name: "Mark Thompson",
    initials: "MT",
    date: "September 28, 2024",
    rating: 5,
    text:
      "Hired Carlos for a full panel upgrade on an older home. He handled permits, kept communication clean, and finished with excellent workmanship.",
  },
  {
    id: "review-3",
    name: "Elena Gomez",
    initials: "EG",
    date: "September 15, 2024",
    rating: 4,
    text:
      "Strong work on our smart lighting install. He had to shift by a day because of an emergency call, but the actual execution was clean and reliable.",
  },
];

export default function TechnicianProfilePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/dashboard/technician/profile`);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1600);
    } catch {
      setShareCopied(false);
    }
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

          <div className={styles.profileCardMini}>
            <div className={styles.profileAvatarMini}>CR</div>
            <div className={styles.profileMetaMini}>
              <strong>Carlos R.</strong>
              <span>Technician</span>
              <small>Available today</small>
            </div>
          </div>

          <nav className={styles.sidebarNav} aria-label="Technician navigation">
            <Link href="/dashboard/technician" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:layout-dashboard" /></span>
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/technician/tasks" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:search" /></span>
              <span>Browse Tasks</span>
            </Link>
            <Link href="/dashboard/technician/bids" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:file-text" /></span>
              <span>My Bids</span>
            </Link>
            <Link href="/dashboard/technician/messages" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:message-square" /></span>
              <span>Messages</span>
            </Link>
            <Link href="/dashboard/technician/wallet" className={styles.navItem}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:wallet" /></span>
              <span>Wallet</span>
            </Link>
            <Link href="/dashboard/technician/profile" className={`${styles.navItem} ${styles.navItemActive}`}>
              <span className={styles.navIcon}><iconify-icon icon="lucide:user" /></span>
              <span>Profile</span>
            </Link>
          </nav>

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
                <input type="search" placeholder="Search tasks or users..." aria-label="Search tasks or users" />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button type="button" className={styles.iconButton} aria-label="Notifications">
                <iconify-icon icon="lucide:bell" />
                <span className={styles.notificationDot} />
              </button>
              <div className={styles.topbarProfile}>
                <div className={styles.topbarAvatar}>CR</div>
                <div className={styles.topbarProfileLines}>
                  <strong>Carlos R.</strong>
                  <span>Technician</span>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            <section className={styles.heroCard}>
              <div className={styles.cover} />
              <div className={styles.heroBody}>
                <div className={styles.identityBlock}>
                  <div className={styles.avatarLarge}>CR</div>
                  <div className={styles.identityMeta}>
                    <div className={styles.nameRow}>
                      <h1>Carlos Rodriguez</h1>
                      <span className={styles.verifiedBadge}>
                        <iconify-icon icon="lucide:badge-check" />
                      </span>
                    </div>
                    <div className={styles.metaList}>
                      <span><iconify-icon icon="lucide:wrench" />Master Electrician</span>
                      <span><iconify-icon icon="lucide:map-pin" />Austin, TX</span>
                      <span><iconify-icon icon="lucide:star" />4.9 (124 Reviews)</span>
                    </div>
                  </div>
                </div>

                <div className={styles.heroActions}>
                  <button type="button" className={styles.outlineButton} onClick={handleShare}>
                    <iconify-icon icon="lucide:share-2" />
                    {shareCopied ? "Copied" : "Share"}
                  </button>
                  <button type="button" className={styles.primaryButton} onClick={() => setEditing((value) => !value)}>
                    <iconify-icon icon="lucide:pencil" />
                    {editing ? "Editing Enabled" : "Edit Profile"}
                  </button>
                </div>
              </div>
            </section>

            <div className={styles.profileGrid}>
              <div className={styles.leftColumn}>
                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:user" />About Me</h2>
                  <p>
                    I am a licensed Master Electrician with over 15 years of experience serving residential and commercial clients. I specialize in panel upgrades,
                    wiring, troubleshooting, and smart home installations. I pride myself on punctuality, transparent pricing, and completing every job to the
                    highest safety standards.
                  </p>
                </section>

                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:image" />Portfolio Gallery</h2>
                  <div className={styles.portfolioGrid}>
                    {portfolioItems.map((item) => (
                      <article key={item.id} className={`${styles.portfolioCard} ${styles[item.tone]}`}>
                        <strong>{item.title}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:message-square" />Client Reviews</h2>
                  <div className={styles.reviewList}>
                    {visibleReviews.map((review) => (
                      <article key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                          <div className={styles.reviewer}>
                            <div className={styles.reviewerAvatar}>{review.initials}</div>
                            <div>
                              <strong>{review.name}</strong>
                              <span>{review.date}</span>
                            </div>
                          </div>
                          <div className={styles.reviewStars}>
                            {Array.from({ length: 5 }, (_, index) => (
                              <iconify-icon key={`${review.id}-${index}`} icon={index < review.rating ? "lucide:star" : "lucide:star"} className={index < review.rating ? styles.starFilled : styles.starMuted} />
                            ))}
                          </div>
                        </div>
                        <p>{review.text}</p>
                      </article>
                    ))}
                  </div>
                  <button type="button" className={styles.outlineButton} onClick={() => setShowAllReviews((value) => !value)}>
                    {showAllReviews ? "Show Less Reviews" : "View All 124 Reviews"}
                  </button>
                </section>
              </div>

              <div className={styles.rightColumn}>
                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:bar-chart-2" />At a Glance</h2>
                  <div className={styles.statList}>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}><iconify-icon icon="lucide:check-square" /></span>
                      <div><strong>158</strong><small>Completed Tasks</small></div>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}><iconify-icon icon="lucide:trending-up" /></span>
                      <div><strong>98%</strong><small>Success Rate</small></div>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}><iconify-icon icon="lucide:clock" /></span>
                      <div><strong>&lt; 2 Hrs</strong><small>Avg. Response Time</small></div>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}><iconify-icon icon="lucide:calendar" /></span>
                      <div><strong>2019</strong><small>Member Since</small></div>
                    </div>
                  </div>
                </section>

                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:award" />Skills & Expertise</h2>
                  <div className={styles.skillList}>
                    {skillSet.map((skill) => (
                      <span key={skill} className={styles.skillPill}>{skill}</span>
                    ))}
                  </div>
                </section>

                <section className={styles.card}>
                  <h2><iconify-icon icon="lucide:shield-check" />Verifications</h2>
                  <div className={styles.verifyList}>
                    {["Identity", "Phone Number", "Email Address", "Professional License"].map((item) => (
                      <div key={item} className={styles.verifyItem}>
                        <span>{item}</span>
                        <iconify-icon icon="lucide:check-circle-2" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
