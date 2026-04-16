"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type BidStatus = "all" | "pending" | "accepted" | "rejected";
type SortOption = "newest" | "highest" | "lowest";

type Bid = {
  id: string;
  taskTitle: string;
  location: string;
  submittedAt: string;
  competingBids: number;
  description: string;
  skills: string[];
  proposal: string;
  duration: string;
  extra: string;
  amount: number;
  amountLabel: string;
  client: string;
  clientRating: string;
  clientInitials: string;
  status: Exclude<BidStatus, "all">;
};

const bids: Bid[] = [
  {
    id: "bid-plumbing",
    taskTitle: "Urgent Plumbing Repair - Leaky Pipe",
    location: "Brooklyn, NY",
    submittedAt: "Submitted 2 hours ago",
    competingBids: 4,
    description:
      "Burst pipe in the basement needs immediate repair before water service is restored.",
    skills: ["Plumbing", "Emergency Service", "Pipe Repair"],
    proposal:
      "I can be there in 30 minutes. I handle emergency plumbing daily and carry the parts and tools needed to resolve this immediately.",
    duration: "2-3 Hours",
    extra: "Parts & Labor",
    amount: 150,
    amountLabel: "$150.00",
    client: "Sarah Jenkins",
    clientRating: "4.8 (24 reviews)",
    clientInitials: "SJ",
    status: "pending",
  },
  {
    id: "bid-painting",
    taskTitle: "Complete House Painting (Interior)",
    location: "Queens, NY",
    submittedAt: "Submitted 2 days ago",
    competingBids: 12,
    description:
      "Full interior painting for a 3-bedroom house. Paint provided, supplies and crew required.",
    skills: ["Interior Painting", "Residential", "Team Required"],
    proposal:
      "I have a team of 3 painters ready to start this weekend. We can finish the whole house in 2 days with a clean, high-quality finish.",
    duration: "2 Days",
    extra: "3 Painters",
    amount: 1200,
    amountLabel: "$1,200.00",
    client: "Michael Chen",
    clientRating: "5.0 (8 reviews)",
    clientInitials: "MC",
    status: "accepted",
  },
  {
    id: "bid-fans",
    taskTitle: "Install 3 Ceiling Fans",
    location: "Manhattan, NY",
    submittedAt: "Submitted 4 days ago",
    competingBids: 8,
    description:
      "Swap light fixtures for ceiling fans in three bedrooms with 10ft ceilings.",
    skills: ["Electrical", "Installation"],
    proposal:
      "Experienced electrician here. I have tall ladders and can install all three fans safely within 4 hours. Fully insured.",
    duration: "4 Hours",
    extra: "Fully Insured",
    amount: 250,
    amountLabel: "$250.00",
    client: "Emily Davis",
    clientRating: "4.9 (15 reviews)",
    clientInitials: "ED",
    status: "rejected",
  },
  {
    id: "bid-generator",
    taskTitle: "Generator Maintenance Check",
    location: "Bronx, NY",
    submittedAt: "Submitted yesterday",
    competingBids: 3,
    description:
      "Quarterly generator service and diagnostics before winter load testing.",
    skills: ["Electrical", "Maintenance", "Commercial"],
    proposal:
      "I can perform a full inspection, load test, and preventive maintenance pass with same-day reporting for your facility team.",
    duration: "1 Day",
    extra: "Inspection Report",
    amount: 420,
    amountLabel: "$420.00",
    client: "Jordan Blake",
    clientRating: "4.7 (12 reviews)",
    clientInitials: "JB",
    status: "pending",
  },
];

const PAGE_SIZE = 2;

export default function TechnicianBidsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<BidStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [withdrawnIds, setWithdrawnIds] = useState<string[]>([]);
  const [messagedIds, setMessagedIds] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBids = useMemo(() => {
    let next = bids.filter((bid) => !withdrawnIds.includes(bid.id));

    if (activeTab !== "all") {
      next = next.filter((bid) => bid.status === activeTab);
    }

    if (normalizedQuery) {
      next = next.filter((bid) =>
        [bid.taskTitle, bid.location, bid.client, bid.description, ...bid.skills]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      );
    }

    if (sortBy === "highest") next = [...next].sort((a, b) => b.amount - a.amount);
    else if (sortBy === "lowest") next = [...next].sort((a, b) => a.amount - b.amount);

    return next;
  }, [activeTab, normalizedQuery, sortBy, withdrawnIds]);

  const totalPages = Math.max(1, Math.ceil(filteredBids.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedBids = filteredBids.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pendingCount = bids.filter((bid) => bid.status === "pending").length;
  const acceptedCount = bids.filter((bid) => bid.status === "accepted").length;
  const rejectedCount = bids.filter((bid) => bid.status === "rejected").length;
  const earnedTotal = bids.filter((bid) => bid.status === "accepted").reduce((sum, bid) => sum + bid.amount, 0);
  const winRate = `${Math.round((acceptedCount / bids.length) * 100)}%`;

  const withdrawBid = (bidId: string) => {
    setWithdrawnIds((current) => (current.includes(bidId) ? current : [...current, bidId]));
  };

  const messageClient = (bidId: string) => {
    setMessagedIds((current) => (current.includes(bidId) ? current : [...current, bidId]));
  };

  const changeTab = (tab: BidStatus) => {
    setActiveTab(tab);
    setPage(1);
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
            <div className={styles.profileAvatar}>CR</div>
            <div className={styles.profileMeta}>
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
            <Link href="/dashboard/technician/bids" className={`${styles.navItem} ${styles.navItemActive}`}>
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
            <Link href="/dashboard/technician/profile" className={styles.navItem}>
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
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks or users..." aria-label="Search bids" />
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
            <section className={styles.pageHeader}>
              <div>
                <p className={styles.eyebrow}>Bid management</p>
                <h1>My Bids</h1>
              </div>
              <Link href="/dashboard/technician/tasks" className={styles.primaryButton}>
                <iconify-icon icon="lucide:search" />
                Find New Tasks
              </Link>
            </section>

            <section className={styles.statsGrid}>
              <article className={styles.statCard}>
                <span className={styles.statIcon}><iconify-icon icon="lucide:file-stack" /></span>
                <div><small>Total Bids</small><strong>{bids.length}</strong></div>
              </article>
              <article className={styles.statCard}>
                <span className={styles.statIcon}><iconify-icon icon="lucide:clock" /></span>
                <div><small>Active Pending</small><strong>{pendingCount}</strong></div>
              </article>
              <article className={styles.statCard}>
                <span className={`${styles.statIcon} ${styles.statSuccess}`}><iconify-icon icon="lucide:check-circle" /></span>
                <div><small>Win Rate</small><strong>{winRate}</strong></div>
              </article>
              <article className={styles.statCard}>
                <span className={`${styles.statIcon} ${styles.statWarning}`}><iconify-icon icon="lucide:coins" /></span>
                <div><small>Earned via Bids</small><strong>${earnedTotal.toLocaleString()}</strong></div>
              </article>
            </section>

            <section className={styles.toolbar}>
              <div className={styles.tabs}>
                <button type="button" className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`} onClick={() => changeTab("all")}>All Bids ({bids.length})</button>
                <button type="button" className={`${styles.tab} ${activeTab === "pending" ? styles.tabActive : ""}`} onClick={() => changeTab("pending")}>Pending ({pendingCount})</button>
                <button type="button" className={`${styles.tab} ${activeTab === "accepted" ? styles.tabActive : ""}`} onClick={() => changeTab("accepted")}>Accepted ({acceptedCount})</button>
                <button type="button" className={`${styles.tab} ${activeTab === "rejected" ? styles.tabActive : ""}`} onClick={() => changeTab("rejected")}>Rejected ({rejectedCount})</button>
              </div>

              <label className={styles.sortWrap}>
                <span>Sort by</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className={styles.sortSelect}>
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </label>
            </section>

            <section className={styles.bidList}>
              {pagedBids.length ? (
                pagedBids.map((bid) => {
                  const statusClass =
                    bid.status === "accepted"
                      ? styles.statusAccepted
                      : bid.status === "rejected"
                        ? styles.statusRejected
                        : styles.statusPending;
                  const isMessaged = messagedIds.includes(bid.id);

                  return (
                    <article key={bid.id} className={styles.bidCard}>
                      <div className={styles.bidHeader}>
                        <div className={styles.taskInfo}>
                          <h2>{bid.taskTitle}</h2>
                          <div className={styles.metaRow}>
                            <span><iconify-icon icon="lucide:map-pin" />{bid.location}</span>
                            <span><iconify-icon icon="lucide:clock" />{bid.submittedAt}</span>
                            <span><iconify-icon icon="lucide:users" />{bid.competingBids} Competing Bids</span>
                          </div>
                        </div>
                        <span className={`${styles.statusPill} ${statusClass}`}>
                          <iconify-icon icon={bid.status === "accepted" ? "lucide:check-circle-2" : bid.status === "rejected" ? "lucide:x-circle" : "lucide:loader-2"} />
                          {bid.status}
                        </span>
                      </div>

                      <p className={styles.description}>{bid.description}</p>

                      <div className={styles.skillRow}>
                        {bid.skills.map((skill) => (
                          <span key={skill} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>

                      <div className={styles.offerBox}>
                        <div className={styles.offerDetails}>
                          <span className={styles.offerLabel}>Your Proposal</span>
                          <p>{bid.proposal}</p>
                          <div className={styles.offerMeta}>
                            <span><iconify-icon icon="lucide:calendar-clock" />Est. Duration: <strong>{bid.duration}</strong></span>
                            <span><iconify-icon icon="lucide:shield-check" />Includes: <strong>{bid.extra}</strong></span>
                          </div>
                        </div>
                        <div className={styles.offerPrice}>
                          <strong>{bid.amountLabel}</strong>
                          <small>Fixed Amount</small>
                        </div>
                      </div>

                      <div className={styles.bidFooter}>
                        <div className={styles.clientInfo}>
                          <span className={styles.clientAvatar}>{bid.clientInitials}</span>
                          <div>
                            <strong>{bid.client}</strong>
                            <span><iconify-icon icon="lucide:star" />{bid.clientRating}</span>
                          </div>
                        </div>

                        <div className={styles.actionRow}>
                          {bid.status === "pending" ? (
                            <button type="button" className={styles.outlineButton} onClick={() => withdrawBid(bid.id)}>
                              Withdraw Bid
                            </button>
                          ) : null}
                          {bid.status === "accepted" ? (
                            <Link href="/dashboard/technician/messages" className={styles.outlineButton} onClick={() => messageClient(bid.id)}>
                              <iconify-icon icon="lucide:message-circle" />
                              {isMessaged ? "Message Sent" : "Message"}
                            </Link>
                          ) : null}
                          <button type="button" className={styles.primarySmallButton}>
                            {bid.status === "accepted" ? "Manage Task" : "View Details"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className={styles.emptyState}>No bids match your current filters.</div>
              )}
            </section>

            <div className={styles.pagination}>
              <button type="button" className={styles.pageButton} disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                <iconify-icon icon="lucide:chevron-left" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
                <button key={value} type="button" className={`${styles.pageButton} ${value === currentPage ? styles.pageButtonActive : ""}`} onClick={() => setPage(value)}>
                  {value}
                </button>
              ))}
              <button type="button" className={styles.pageButton} disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
                <iconify-icon icon="lucide:chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
