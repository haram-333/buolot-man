"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "./page.module.css";

type Listing = {
  name: string;
  role: string;
  bio: string;
  image: string;
  avatar: string;
  jobsDone: number;
  response: string;
  rating: number;
  reviews: number;
  location: string;
  rate: string;
  verified?: boolean;
  availableToday?: boolean;
  emergency?: boolean;
  weekends?: boolean;
  backgroundChecked?: boolean;
  licensed?: boolean;
  type: "technician" | "company";
  skills: string[];
};

const listings: Listing[] = [
  {
    name: "Kouassi Marc",
    role: "Master Electrician",
    bio: "Certified electrician with 12 years of experience. Specializing in residential troubleshooting, smart home wiring, and panel upgrades.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F2",
    jobsDone: 142,
    response: "< 1 hr",
    rating: 4.9,
    reviews: 128,
    location: "Cocody, Abidjan",
    rate: "15,000 XOF",
    verified: true,
    availableToday: true,
    emergency: true,
    weekends: true,
    backgroundChecked: true,
    licensed: true,
    type: "technician",
    skills: ["Wiring", "Lighting", "Panels"],
  },
  {
    name: "Awa Toure",
    role: "Residential Electrician",
    bio: "Expert in modern home electrical systems. I design and install complete solar setups and integrated smart home security grids.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FAfrican%2F4",
    jobsDone: 94,
    response: "2 hrs",
    rating: 4.8,
    reviews: 94,
    location: "Marcory, Abidjan",
    rate: "20,000 XOF",
    verified: true,
    availableToday: true,
    backgroundChecked: true,
    type: "technician",
    skills: ["Smart Home", "Security", "Solar"],
  },
  {
    name: "Jean Bamba",
    role: "HVAC & Electrical Tech",
    bio: "Fast, reliable service for all cooling and refrigeration needs. I fix complex AC electrical issues and do routine maintenance.",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/5f8d15b1-da73-49d6-81ba-5887a5dc37fc.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F3",
    jobsDone: 68,
    response: "30 mins",
    rating: 4.7,
    reviews: 56,
    location: "Yopougon, Abidjan",
    rate: "10,000 XOF",
    availableToday: true,
    emergency: true,
    weekends: true,
    type: "technician",
    skills: ["AC Repair", "Maintenance", "Wiring"],
  },
  {
    name: "Oumar Sylla",
    role: "Solar & Backup Energy",
    bio: "Ensuring you never lose power. Large scale generator installation, deep cycle batteries, and heavy duty inverter setups.",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/b820927f-4ce5-4e90-ba91-0fc4a7425c6e.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F1",
    jobsDone: 45,
    response: "< 1 hr",
    rating: 5,
    reviews: 32,
    location: "Bingerville, Abidjan",
    rate: "25,000 XOF",
    verified: true,
    availableToday: true,
    emergency: true,
    backgroundChecked: true,
    licensed: true,
    type: "technician",
    skills: ["Solar Panels", "Generators", "Inverters"],
  },
  {
    name: "Mariam Kone",
    role: "Network Specialist",
    bio: "Low voltage cabling and telecommunications. I run neat, perfectly labeled server room cables, intercoms, and CCTV systems.",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/dd7cb441-d5fd-4e35-9fce-3e6bf07c4abb.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-50%2FAfrican%2F2",
    jobsDone: 158,
    response: "2 hrs",
    rating: 4.6,
    reviews: 112,
    location: "Plateau, Abidjan",
    rate: "18,000 XOF",
    verified: true,
    backgroundChecked: true,
    type: "technician",
    skills: ["CCTV", "Data Network", "Intercoms"],
  },
  {
    name: "Cedric Yapi",
    role: "Interior Lighting Expert",
    bio: "Transform your space with beautiful custom lighting solutions. Chandeliers, recessed LED lights, and custom switches.",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/d5aa6958-2f02-48f1-b3ff-012483586b4e.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F5",
    jobsDone: 87,
    response: "1 hr",
    rating: 4.8,
    reviews: 43,
    location: "Treichville, Abidjan",
    rate: "12,000 XOF",
    availableToday: true,
    weekends: true,
    type: "technician",
    skills: ["LED Setup", "Decor Lighting", "Design"],
  },
];

export default function Page() {
  const [availability, setAvailability] = useState({
    today: true,
    emergency: false,
    weekends: false,
  });
  const [trust, setTrust] = useState({
    verified: true,
    backgroundChecked: true,
    licensed: false,
  });
  const [type, setType] = useState<"any" | "technician" | "company">("any");
  const [rating, setRating] = useState(4.5);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const data = listings.filter((item) => {
      if (type !== "any" && item.type !== type) return false;
      if (item.rating < rating) return false;
      if (availability.today && !item.availableToday) return false;
      if (availability.emergency && !item.emergency) return false;
      if (availability.weekends && !item.weekends) return false;
      if (trust.verified && !item.verified) return false;
      if (trust.backgroundChecked && !item.backgroundChecked) return false;
      if (trust.licensed && !item.licensed) return false;
      return true;
    });
    return data;
  }, [availability, rating, trust, type]);

  const clearFilters = () => {
    setAvailability({ today: true, emergency: false, weekends: false });
    setTrust({ verified: true, backgroundChecked: true, licensed: false });
    setType("any");
    setRating(4.5);
    setPage(1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBanner}>
        <iconify-icon icon="lucide:party-popper" />
        <span>
          New to Boulot Man? Get 10% off your first service booking with code <strong>WELCOME10</strong>
        </span>
      </div>

      <Header />

      <main className={`${styles.container} ${styles.content}`}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h2>Filters</h2>
            <button type="button" className={styles.clearFilters} onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <div className={styles.filterSection}>
            <h3>Location</h3>
            <select className={styles.select}>
              <option>Abidjan, CI</option>
              <option>Cocody</option>
              <option>Plateau</option>
            </select>
          </div>

          <div className={styles.filterSection}>
            <h3>Availability</h3>
            <label className={styles.option}><input type="checkbox" checked={availability.today} onChange={() => setAvailability((v) => ({ ...v, today: !v.today }))} /> Available Today</label>
            <label className={styles.option}><input type="checkbox" checked={availability.emergency} onChange={() => setAvailability((v) => ({ ...v, emergency: !v.emergency }))} /> Emergency (24/7)</label>
            <label className={styles.option}><input type="checkbox" checked={availability.weekends} onChange={() => setAvailability((v) => ({ ...v, weekends: !v.weekends }))} /> Weekends</label>
          </div>

          <div className={styles.filterSection}>
            <h3>Trust & Safety</h3>
            <label className={styles.option}><input type="checkbox" checked={trust.verified} onChange={() => setTrust((v) => ({ ...v, verified: !v.verified }))} /> ID Verified</label>
            <label className={styles.option}><input type="checkbox" checked={trust.backgroundChecked} onChange={() => setTrust((v) => ({ ...v, backgroundChecked: !v.backgroundChecked }))} /> Background Checked</label>
            <label className={styles.option}><input type="checkbox" checked={trust.licensed} onChange={() => setTrust((v) => ({ ...v, licensed: !v.licensed }))} /> Licensed Professional</label>
          </div>

          <div className={styles.filterSection}>
            <h3>Professional Type</h3>
            {[
              ["Any", "any"],
              ["Independent Technician", "technician"],
              ["Registered Company", "company"],
            ].map(([label, value]) => (
              <label key={value} className={styles.option}>
                <input type="radio" name="type" checked={type === value} onChange={() => setType(value as typeof type)} />
                {label}
              </label>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h3>Minimum Rating</h3>
            {[4.5, 4.0, 3.0].map((value) => (
              <label key={value} className={styles.option}>
                <input type="radio" name="rating" checked={rating === value} onChange={() => setRating(value)} />
                {value} & up
              </label>
            ))}
          </div>
        </aside>

        <section className={styles.mainColumn}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/categories/electrical">Categories</Link>
            <span>/</span>
            <strong>Electricians</strong>
          </div>

          <div className={styles.listingHeader}>
            <div>
              <h1>Electricians in Abidjan</h1>
              <p>{filtered.length} certified professionals available</p>
            </div>
            <div className={styles.listingControls}>
              <button type="button" className={styles.outlineButton}>Alert me of new pros</button>
              <button type="button" className={styles.outlineButton}>Highest Rated</button>
            </div>
          </div>

          <section className={styles.featuredPromo}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredBadge}>Top Rated Company</div>
              <h2>Need a full commercial rewiring?</h2>
              <p>
                ElectroTech CI specializes in large scale industrial and commercial
                projects, with hundreds of completed jobs and guaranteed satisfaction.
              </p>
              <Link href="/categories/electrical" className={styles.primaryButton}>
                Get a Free Consultation
              </Link>
            </div>
            <div className={styles.featuredImage}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop"
                alt="Commercial Electrical"
              />
            </div>
          </section>

          <div className={styles.grid}>
            {filtered.map((item) => (
              <article key={item.name} className={styles.card}>
                <div className={styles.cardCover}>
                  <img src={item.image} alt={item.role} />
                  {item.verified ? <div className={styles.verifiedBadge}>Verified Pro</div> : null}
                  <div className={styles.avatarWrap}>
                    <img src={item.avatar} alt={item.name} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h3>{item.name}</h3>
                    <button type="button" className={styles.iconButton}>
                      <iconify-icon icon="lucide:heart" />
                    </button>
                  </div>
                  <p className={styles.role}>{item.role}</p>
                  <p className={styles.bio}>{item.bio}</p>
                  <div className={styles.stats}>
                    <div>
                      <span>Jobs Done</span>
                      <strong>{item.jobsDone}</strong>
                    </div>
                    <div>
                      <span>Response</span>
                      <strong>{item.response}</strong>
                    </div>
                  </div>
                  <div className={styles.skills}>
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                  <div className={styles.meta}>
                    <span>{item.rating} ({item.reviews})</span>
                    <span>{item.location}</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <div>
                      <strong>{item.rate}</strong>
                      <small>Hourly rate</small>
                    </div>
                    <Link href="/search" className={styles.primarySmallButton}>
                      View Profile
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.pagination}>
            <button type="button" className={styles.pageButton} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </button>
            {[1, 2, 3].map((value) => (
              <button
                key={value}
                type="button"
                className={`${styles.pageNumber} ${page === value ? styles.pageNumberActive : ""}`}
                onClick={() => setPage(value)}
              >
                {value}
              </button>
            ))}
            <button type="button" className={styles.pageButton} onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
