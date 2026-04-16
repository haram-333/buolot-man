"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type NavKey = "dashboard" | "tasks" | "bids" | "messages" | "wallet" | "profile";
type TaskItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  schedule: string;
  meta: string;
  matchScore: string;
  amount: number;
  tags: string[];
  urgency?: "urgent" | "standard";
  submitted?: boolean;
};

type BidStatus = "awaiting" | "shortlisted" | "won";
type BidItem = {
  id: string;
  title: string;
  note: string;
  status: BidStatus;
};

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  value: string;
};

const initialTasks: TaskItem[] = [
  {
    id: "task-retail-repair",
    title: "Emergency electrical repair for retail store",
    description:
      "Client needs immediate diagnosis and repair for repeated power outages affecting a small storefront before opening hours.",
    location: "Brooklyn, NY",
    schedule: "Starts today",
    meta: "Commercial",
    matchScore: "96%",
    amount: 350,
    tags: ["Urgent", "Onsite", "Commercial"],
    urgency: "urgent",
  },
  {
    id: "task-smart-lighting",
    title: "Install smart lighting in 3-bedroom apartment",
    description:
      "Looking for a technician with residential experience to install connected switches, fixtures, and app setup across multiple rooms.",
    location: "Queens, NY",
    schedule: "Within 3 days",
    meta: "Fixed budget",
    matchScore: "91%",
    amount: 480,
    tags: ["Residential", "Hybrid consult", "Repeat client"],
  },
];

const initialQuickJobs: TaskItem[] = [
  {
    id: "quick-panel-inspection",
    title: "Panel inspection",
    description: "Residential panel check requested nearby.",
    location: "2.1 miles away",
    schedule: "Today",
    meta: "Residential",
    matchScore: "88%",
    amount: 95,
    tags: ["Quick job"],
  },
  {
    id: "quick-socket-replacement",
    title: "Socket replacement",
    description: "Urgent replacement needed for two damaged outlets.",
    location: "Today",
    schedule: "Urgent request",
    meta: "Repair",
    matchScore: "84%",
    amount: 80,
    tags: ["Urgent", "Repair"],
    urgency: "urgent",
  },
];

const initialBids: BidItem[] = [
  {
    id: "bid-office-rewire",
    title: "Office rewiring project",
    note: "Submitted 2 hours ago · Client viewed",
    status: "awaiting",
  },
  {
    id: "bid-generator",
    title: "Generator maintenance check",
    note: "Shortlisted with 3 other pros",
    status: "shortlisted",
  },
  {
    id: "bid-cafe-lighting",
    title: "Lighting retrofit for cafe",
    note: "Accepted · Start date confirmed",
    status: "won",
  },
];

const initialActivities: ActivityItem[] = [
  {
    id: "activity-message",
    title: "New message from Sarah K.",
    detail: "Asked for updated arrival time on current job.",
    value: "5 min ago",
  },
  {
    id: "activity-escrow",
    title: "Escrow released",
    detail: "Payment from apartment lighting installation is now available.",
    value: "$420",
  },
  {
    id: "activity-visibility",
    title: "Profile boosted",
    detail: "You appeared in 18 search results today.",
    value: "Today",
  },
];

const chartData = [
  { label: "Mon", height: "52%" },
  { label: "Tue", height: "68%" },
  { label: "Wed", height: "61%" },
  { label: "Thu", height: "82%" },
  { label: "Fri", height: "75%" },
  { label: "Sat", height: "93%" },
  { label: "Sun", height: "64%" },
];

export default function TechnicianDashboardPage() {
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [availableTasks, setAvailableTasks] = useState(initialTasks);
  const [quickJobs, setQuickJobs] = useState(initialQuickJobs);
  const [bids, setBids] = useState(initialBids);
  const [activities, setActivities] = useState(initialActivities);
  const [walletAvailable, setWalletAvailable] = useState(2980);
  const [walletHeld, setWalletHeld] = useState(640);
  const [notificationsOpen, setNotificationsOpen] = useState(true);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTasks = useMemo(
    () =>
      availableTasks.filter((task) =>
        [task.title, task.description, task.location, task.schedule, task.meta, ...task.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      ),
    [availableTasks, normalizedQuery]
  );

  const filteredBids = useMemo(
    () => bids.filter((bid) => [bid.title, bid.note].join(" ").toLowerCase().includes(normalizedQuery)),
    [bids, normalizedQuery]
  );

  const filteredActivities = useMemo(
    () =>
      activities.filter((item) => [item.title, item.detail, item.value].join(" ").toLowerCase().includes(normalizedQuery)),
    [activities, normalizedQuery]
  );

  const filteredQuickJobs = useMemo(
    () =>
      quickJobs.filter((task) =>
        [task.title, task.description, task.location, task.schedule, task.meta, ...task.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      ),
    [normalizedQuery, quickJobs]
  );

  const wonBids = bids.filter((bid) => bid.status === "won").length;
  const awaitingBids = bids.filter((bid) => bid.status === "awaiting").length;
  const totalEarnings = walletAvailable + walletHeld + 4800;

  const pushActivity = (title: string, detail: string, value: string) => {
    setActivities((current) => [{ id: `${Date.now()}-${Math.random()}`, title, detail, value }, ...current]);
  };

  const submitBid = (task: TaskItem, source: "tasks" | "quick") => {
    setBids((current) => {
      if (current.some((bid) => bid.title === task.title)) return current;

      return [
        {
          id: `bid-${task.id}`,
          title: task.title,
          note: `Just submitted · ${task.location}`,
          status: "awaiting",
        },
        ...current,
      ];
    });

    if (source === "tasks") {
      setAvailableTasks((current) => current.map((item) => (item.id === task.id ? { ...item, submitted: true } : item)));
    } else {
      setQuickJobs((current) => current.filter((item) => item.id !== task.id));
    }

    pushActivity("Bid submitted", `You sent a proposal for ${task.title}.`, `$${task.amount}`);
  };

  const withdrawFunds = () => {
    if (walletAvailable <= 0) return;

    const withdrawn = walletAvailable;
    setWalletAvailable(0);
    pushActivity("Withdrawal initiated", "Available balance has been queued for transfer to your bank account.", `$${withdrawn}`);
  };

  const releaseEscrow = () => {
    if (walletHeld <= 0) return;

    const released = walletHeld;
    setWalletAvailable((current) => current + released);
    setWalletHeld(0);
    pushActivity("Escrow released", "Held funds were moved into your available wallet balance.", `$${released}`);
  };

  const scrollToSection = (key: NavKey) => {
    const map: Record<NavKey, string> = {
      dashboard: "tech-dashboard-overview",
      tasks: "tech-dashboard-tasks",
      bids: "tech-dashboard-bids",
      messages: "tech-dashboard-bids",
      wallet: "tech-dashboard-wallet",
      profile: "tech-dashboard-profile",
    };

    setActiveNav(key);
    setMobileNavOpen(false);
    document.getElementById(map[key])?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems: Array<{ key: NavKey; label: string; icon: string }> = [
    { key: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard" },
    { key: "tasks", label: "Browse Tasks", icon: "lucide:search" },
    { key: "bids", label: "My Bids", icon: "lucide:file-text" },
    { key: "messages", label: "Messages", icon: "lucide:messages-square" },
    { key: "wallet", label: "Wallet", icon: "lucide:wallet" },
    { key: "profile", label: "Profile", icon: "lucide:user-round" },
  ];

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

          <div className={styles.proSummary} id="tech-dashboard-profile">
            <div className={styles.proAvatar}>DM</div>
            <div className={styles.proMeta}>
              <strong>Daniel Mensah</strong>
              <span>Electrician · Verified Pro</span>
              <small>4.9 rating · 126 completed jobs</small>
            </div>
          </div>

          <nav className={styles.sidebarNav} aria-label="Technician navigation">
            {navItems.map((item) =>
              item.key === "tasks" ? (
                <Link key={item.key} href="/dashboard/technician/tasks" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : item.key === "bids" ? (
                <Link key={item.key} href="/dashboard/technician/bids" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : item.key === "messages" ? (
                <Link key={item.key} href="/dashboard/technician/messages" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : item.key === "wallet" ? (
                <Link key={item.key} href="/dashboard/technician/wallet" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : item.key === "profile" ? (
                <Link key={item.key} href="/dashboard/technician/profile" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  className={`${styles.navItem} ${activeNav === item.key ? styles.navItemActive : ""}`}
                  onClick={() => scrollToSection(item.key)}
                >
                  <span className={styles.navIcon}>
                    <iconify-icon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </button>
              )
            )}
          </nav>

          <div className={styles.sidebarCard}>
            <strong>Grow your visibility</strong>
            <p>Complete your profile and respond faster to improve your match score on premium client requests.</p>
            <button type="button" className={styles.sidebarCardButton} onClick={() => scrollToSection("profile")}>
              <iconify-icon icon="lucide:arrow-up-right" />
              Upgrade profile
            </button>
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
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search jobs, bids, messages"
                  aria-label="Search technician dashboard"
                />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button
                type="button"
                className={`${styles.iconButton} ${notificationsOpen ? styles.iconButtonActive : ""}`}
                aria-label="Notifications"
                onClick={() => setNotificationsOpen(false)}
              >
                <iconify-icon icon="lucide:bell" />
                {notificationsOpen ? <span className={styles.notificationDot} /> : null}
              </button>

              <Link
                href="/dashboard/technician/messages"
                className={`${styles.iconButton} ${styles.iconButtonActive}`}
                aria-label="Messages"
              >
                <iconify-icon icon="lucide:message-square-text" />
                <span className={styles.notificationDot} />
              </Link>

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
            <section className={styles.heroCard} id="tech-dashboard-overview">
              <div className={styles.heroCopy}>
                <span className={styles.heroEyebrow}>
                  <iconify-icon icon="lucide:sparkles" />
                  Technician dashboard
                </span>
                <h1>Welcome back, ready to earn today?</h1>
                <p>
                  Track earnings, review active bids, and respond to new client requests from one organized workspace built for growing service professionals.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/dashboard/technician/tasks" className={styles.primaryButton}>
                    <iconify-icon icon="lucide:search-check" />
                    Browse Tasks
                  </Link>
                  <Link href="/dashboard/technician/bids" className={styles.secondaryButton}>
                    <iconify-icon icon="lucide:file-text" />
                    View My Bids
                  </Link>
                </div>
              </div>

              <div className={styles.heroSide}>
                <span>This week</span>
                <strong>12 new matches</strong>
                <small>+18% from last week</small>
                <span>Fastest response time</span>
                <strong className={styles.heroSmallMetric}>14 min</strong>
              </div>
            </section>

            <section className={styles.metricsGrid}>
              <article className={styles.metricCard}>
                <div className={styles.metricTop}>
                  <div>
                    <span>Total earnings</span>
                    <strong>${totalEarnings.toLocaleString()}</strong>
                  </div>
                  <span className={`${styles.metricIcon} ${styles.metricAccent}`}>
                    <iconify-icon icon="lucide:banknote" />
                  </span>
                </div>
                <p className={styles.metricTrend}>
                  <iconify-icon icon="lucide:trending-up" /> +12.4%
                </p>
                <p className={styles.metricNote}>Revenue from completed marketplace jobs and repeat client work.</p>
              </article>

              <article className={styles.metricCard}>
                <div className={styles.metricTop}>
                  <div>
                    <span>Pending</span>
                    <strong>${walletHeld.toLocaleString()}</strong>
                  </div>
                  <span className={`${styles.metricIcon} ${styles.metricPrimary}`}>
                    <iconify-icon icon="lucide:hourglass" />
                  </span>
                </div>
                <p className={`${styles.metricTrend} ${styles.metricTrendWarm}`}>
                  <iconify-icon icon="lucide:clock-3" /> {awaitingBids} bids awaiting
                </p>
                <p className={styles.metricNote}>Funds in escrow or awaiting client approval before release to your wallet.</p>
              </article>

              <article className={styles.metricCard}>
                <div className={styles.metricTop}>
                  <div>
                    <span>Available</span>
                    <strong>${walletAvailable.toLocaleString()}</strong>
                  </div>
                  <span className={`${styles.metricIcon} ${styles.metricSuccess}`}>
                    <iconify-icon icon="lucide:wallet-cards" />
                  </span>
                </div>
                <p className={styles.metricTrend}>
                  <iconify-icon icon="lucide:badge-check" /> Ready to withdraw
                </p>
                <p className={styles.metricNote}>Transfer available funds to your bank account or keep them for marketplace fees.</p>
              </article>
            </section>

            <div className={styles.dashboardGrid}>
              <div className={styles.leftColumn}>
                <section className={styles.sectionCard}>
                  <div className={styles.sectionHead}>
                    <h2>Earnings overview</h2>
                    <button type="button" className={styles.sectionLink} onClick={() => setQuery("")}>
                      View reports
                    </button>
                  </div>

                  <div className={styles.chart}>
                    {chartData.map((entry) => (
                      <div key={entry.label} className={styles.chartBarWrap}>
                        <div className={styles.chartBar} style={{ height: entry.height }} />
                        <span>{entry.label}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className={styles.sectionCard} id="tech-dashboard-tasks">
                  <div className={styles.sectionHead}>
                    <h2>New tasks available</h2>
                    <Link href="/dashboard/technician/tasks" className={styles.sectionLink}>
                      See all matches
                    </Link>
                  </div>

                  <div className={styles.taskList}>
                    {filteredTasks.length ? (
                      filteredTasks.map((task) => (
                        <article key={task.id} className={styles.taskCard}>
                          <div className={styles.taskTop}>
                            <div className={styles.taskMain}>
                              <h3>{task.title}</h3>
                              <p>{task.description}</p>
                              <div className={styles.taskMeta}>
                                <span><iconify-icon icon="lucide:map-pin" />{task.location}</span>
                                <span><iconify-icon icon="lucide:clock-3" />{task.schedule}</span>
                                <span><iconify-icon icon="lucide:star" />Match score {task.matchScore}</span>
                              </div>
                            </div>

                            <strong className={styles.taskPrice}>${task.amount}</strong>
                          </div>

                          <div className={styles.taskBottom}>
                            <div className={styles.taskTags}>
                              {task.tags.map((tag, index) => (
                                <span key={tag} className={`${styles.pill} ${index === 0 && task.urgency === "urgent" ? styles.pillHighlight : ""}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              className={task.submitted ? styles.secondaryButton : styles.primaryButton}
                              onClick={() => submitBid(task, "tasks")}
                              disabled={task.submitted}
                            >
                              {task.submitted ? "Bid Submitted" : "Submit Bid"}
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No task matches your current search.</div>
                    )}
                  </div>
                </section>
              </div>

              <div className={styles.rightColumn}>
                <section className={styles.walletCard} id="tech-dashboard-wallet">
                  <div className={styles.sectionHead}>
                    <h2>Wallet</h2>
                    <button type="button" className={styles.sectionLink} onClick={releaseEscrow}>
                      Transactions
                    </button>
                  </div>

                  <strong className={styles.walletBalance}>${walletAvailable.toLocaleString()}</strong>
                  <p className={styles.walletText}>Available for withdrawal from completed tasks and released escrow payments.</p>

                  <div className={styles.walletActions}>
                    <button type="button" className={styles.primaryButton} onClick={withdrawFunds} disabled={walletAvailable <= 0}>
                      Withdraw funds
                    </button>
                    <Link href="/dashboard/technician/wallet" className={styles.secondaryButton}>
                      View escrow
                    </Link>
                  </div>

                  <div className={styles.miniStatGrid}>
                    <div className={styles.miniStat}>
                      <span>Held in escrow</span>
                      <strong>${walletHeld.toLocaleString()}</strong>
                    </div>
                    <div className={styles.miniStat}>
                      <span>Next payout</span>
                      <strong>{walletAvailable > 0 ? "Tomorrow" : "Queued"}</strong>
                    </div>
                  </div>
                </section>

                <section className={styles.compactCard} id="tech-dashboard-bids">
                  <div className={styles.sectionHead}>
                    <h2>Active bids summary</h2>
                    <Link href="/dashboard/technician/bids" className={styles.sectionLink}>
                      Manage bids
                    </Link>
                  </div>

                  <div className={styles.rowList}>
                    {filteredBids.length ? (
                      filteredBids.map((bid) => (
                        <div key={bid.id} className={styles.rowCard}>
                          <div className={styles.rowMain}>
                            <strong>{bid.title}</strong>
                            <span>{bid.note}</span>
                          </div>
                          <span className={`${styles.statusChip} ${bid.status === "awaiting" ? styles.statusChipOrange : bid.status === "won" ? styles.statusChipGreen : styles.statusChipBlue}`}>
                            {bid.status === "awaiting" ? "Awaiting reply" : bid.status === "won" ? "Won" : "Shortlisted"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No bids match your search.</div>
                    )}
                  </div>
                </section>

                <section className={styles.compactCard}>
                  <div className={styles.sectionHead}>
                    <h2>Recent activity</h2>
                    <button type="button" className={styles.sectionLink} onClick={() => setNotificationsOpen(false)}>
                      Activity log
                    </button>
                  </div>

                  <div className={styles.rowList}>
                    {filteredActivities.length ? (
                      filteredActivities.map((item) => (
                        <div key={item.id} className={styles.rowCard}>
                          <div className={styles.rowMain}>
                            <strong>{item.title}</strong>
                            <span>{item.detail}</span>
                          </div>
                          <span className={styles.rowValue}>{item.value}</span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No activity matches your search.</div>
                    )}
                  </div>
                </section>

                <section className={styles.compactCard}>
                  <div className={styles.sectionHead}>
                    <h2>Quick opportunities</h2>
                    <Link href="/dashboard/technician/tasks" className={styles.sectionLink}>
                      Open marketplace
                    </Link>
                  </div>

                  <div className={styles.rowList}>
                    {filteredQuickJobs.length ? (
                      filteredQuickJobs.map((task) => (
                        <button key={task.id} type="button" className={styles.rowCardButton} onClick={() => submitBid(task, "quick")}>
                          <div className={styles.rowMain}>
                            <strong>{task.title}</strong>
                            <span>{task.location} · {task.meta}</span>
                          </div>
                          <span className={styles.rowValue}>${task.amount}</span>
                        </button>
                      ))
                    ) : (
                      <div className={styles.emptyState}>No quick opportunities available right now.</div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <section className={styles.profileStrip}>
              <div>
                <p className={styles.profileLabel}>Profile strength</p>
                <h2>Keep your technician profile sharp</h2>
                <p className={styles.profileText}>You have won {wonBids} active jobs and currently appear in more search results when you respond within 15 minutes.</p>
              </div>
              <button type="button" className={styles.secondaryButton} onClick={() => scrollToSection("profile")}>
                Update profile
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
