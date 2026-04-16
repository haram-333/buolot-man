"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

type ProType = "technician" | "company";

type Pro = {
  name: string;
  role: string;
  type: ProType;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  priceUnit: string;
  years: number;
  verified?: boolean;
  topRated?: boolean;
  fastResponder?: boolean;
  availableToday?: boolean;
  emergency?: boolean;
  image: string;
  avatar?: string;
  hiresLabel: string;
};

const subcategories = [
  ["Lighting", "124 Pros", "lucide:lightbulb"],
  ["Wiring & Panels", "89 Pros", "lucide:plug-zap"],
  ["Solar Panels", "56 Pros", "lucide:sun"],
  ["Appliance Setup", "210 Pros", "lucide:fan"],
  ["Security & CCTV", "72 Pros", "lucide:cctv"],
];

const services = [
  ["Ceiling Fan Installation", "10,000 XOF", "lucide:fan"],
  ["Outlet & Switch Repair", "5,000 XOF", "lucide:plug"],
  ["EV Charger Installation", "50,000 XOF", "lucide:battery-charging"],
  ["Full Panel Upgrade", "150,000 XOF", "lucide:panel-left"],
];

const professionals: Pro[] = [
  {
    name: "Kouassi Marc",
    role: "Master Electrician",
    type: "technician",
    rating: 4.9,
    reviews: 128,
    location: "Cocody",
    price: "15,000 XOF",
    priceUnit: "Starting price",
    years: 10,
    verified: true,
    fastResponder: true,
    availableToday: true,
    emergency: true,
    hiresLabel: "150+ Hires",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/fa56c04e-b92a-47bd-b429-0c48ca2e4fa7.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F2",
  },
  {
    name: "Oumar Sylla",
    role: "Solar Panel Specialist",
    type: "technician",
    rating: 4.8,
    reviews: 85,
    location: "Marcory",
    price: "25,000 XOF",
    priceUnit: "Consultation",
    years: 5,
    verified: true,
    topRated: true,
    availableToday: true,
    hiresLabel: "85 Hires",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/a3e76c91-799c-4221-aad5-496399b91f90.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F1",
  },
  {
    name: "Jean Bamba",
    role: "Smart Home Technician",
    type: "technician",
    rating: 4.9,
    reviews: 42,
    location: "Plateau",
    price: "20,000 XOF",
    priceUnit: "Starting price",
    years: 3,
    verified: true,
    fastResponder: true,
    emergency: true,
    hiresLabel: "New Pro",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/80f8723f-80a5-477b-b8a9-39ef986fbffb.jpg",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F3",
  },
  {
    name: "ElectroCorp CI",
    role: "Commercial Installations",
    type: "company",
    rating: 4.9,
    reviews: 420,
    location: "Abidjan",
    price: "Custom Quote",
    priceUnit: "Contact for price",
    years: 10,
    verified: true,
    topRated: true,
    hiresLabel: "Team of 15+",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Lumiere Tech",
    role: "Industrial & Residential",
    type: "company",
    rating: 4.7,
    reviews: 156,
    location: "Abidjan",
    price: "Custom Quote",
    priceUnit: "Contact for price",
    years: 7,
    hiresLabel: "Team of 8",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/d3dae859-984b-443b-a298-3938be362caa.jpg",
  },
];

const reviews = [
  "Kouassi was incredibly professional and fixed our wiring issue within an hour. Highly recommend his services.",
  "ElectroCorp handled the complete installation for our new office building. Their team is efficient and transparent.",
  "Oumar gave excellent advice, designed the system, and installed it flawlessly. Great work.",
];

const faqs = [
  ["How do I know if a professional is certified?", "All verified professionals on Boulot Man pass ID, license, and reference checks before taking jobs."],
  ["What if I have an emergency?", "Use the emergency and fast responder filters to narrow the list to pros who can move immediately."],
  ["Can I get a custom quote for a large project?", "Yes. Companies on the platform can provide custom quotes for commercial and industrial jobs."],
];

export default function Page() {
  const [availability, setAvailability] = useState({ today: true, emergency: false });
  const [type, setType] = useState<"any" | ProType>("any");
  const [years, setYears] = useState(0);
  const [rating, setRating] = useState(4.5);
  const [faqOpen, setFaqOpen] = useState(0);

  const filtered = useMemo(
    () =>
      professionals.filter((pro) => {
        if (type !== "any" && pro.type !== type) return false;
        if (pro.rating < rating) return false;
        if (pro.years < years) return false;
        if (availability.today && !pro.availableToday && pro.type === "technician") return false;
        if (availability.emergency && !pro.emergency && pro.type === "technician") return false;
        return true;
      }),
    [availability, rating, type, years]
  );

  const featured = filtered.filter((pro) => pro.type === "technician");
  const companies = filtered.filter((pro) => pro.type === "company");

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Categories</span>
            <span>/</span>
            <strong>Electrical</strong>
          </div>
          <h1>Electrical Services</h1>
          <p>Find trusted, certified electricians and electrical engineers for residential, commercial, and industrial projects.</p>
          <div className={styles.heroStats}>
            <div>1,200+ Verified Pros</div>
            <div>4.8/5 Average Rating</div>
            <div>Secure Payments</div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Explore Subcategories</h2>
          <div className={styles.subcategoryRow}>
            {subcategories.map(([title, count, icon]) => (
              <button key={title} type="button" className={styles.subcategoryCard}>
                <span className={styles.iconBox}><iconify-icon icon={icon} /></span>
                <span><strong>{title}</strong><small>{count}</small></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Popular Services in Electrical</h2>
          <div className={styles.servicesGrid}>
            {services.map(([title, price, icon]) => (
              <article key={title} className={styles.serviceCard}>
                <span className={styles.serviceIcon}><iconify-icon icon={icon} /></span>
                <h3>{title}</h3>
                <div className={styles.servicePrice}><span>Average starting price</span><strong>{price}</strong></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <main className={`${styles.container} ${styles.content}`}>
        <section className={styles.mainColumn}>
          <div className={styles.headerRow}>
            <div>
              <h2>Featured Professionals</h2>
              <p>Showing {featured.length} filtered technicians</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/categories/electrical/listings" className={styles.primarySmall}>
                Browse all electricians
              </Link>
              <button type="button" className={styles.ghostButton}>Recommended</button>
            </div>
          </div>

          <div className={styles.cardsGrid}>
            {featured.map((pro) => (
              <article key={pro.name} className={styles.proCard}>
                <div className={styles.cover}>
                  <img src={pro.image} alt={pro.role} />
                  {pro.avatar ? <div className={styles.avatar}><img src={pro.avatar} alt={pro.name} /></div> : null}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.badges}>
                    {pro.fastResponder ? <span className={styles.badgePrimary}>Fast Responder</span> : null}
                    {pro.topRated ? <span className={styles.badgeAccent}>Top Rated</span> : null}
                    <span className={styles.badgeMuted}>{pro.hiresLabel}</span>
                  </div>
                  <h3>{pro.name}</h3>
                  <p>{pro.role}</p>
                  <div className={styles.meta}>{pro.rating} ({pro.reviews}) · {pro.location}</div>
                  <div className={styles.cardFooter}>
                    <div><strong>{pro.price}</strong><small>{pro.priceUnit}</small></div>
                    <Link href="/search" className={styles.primarySmall}>Book Now</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className={styles.banner}>
            <div>
              <h3>Can&apos;t find the perfect match?</h3>
              <p>Post your job once and let qualified electricians come to you with competitive quotes.</p>
            </div>
            <Link href="/search" className={styles.whiteButton}>Post a Job for Free</Link>
          </section>

          <div className={styles.headerRow}>
            <div>
              <h2>Top Rated Agencies</h2>
              <p>For large commercial or industrial projects</p>
            </div>
          </div>

          <div className={styles.cardsGrid}>
            {companies.map((pro) => (
              <article key={pro.name} className={styles.proCard}>
                <div className={styles.cover}><img src={pro.image} alt={pro.role} /></div>
                <div className={styles.cardBody}>
                  <div className={styles.badges}><span className={styles.badgeMuted}>{pro.hiresLabel}</span></div>
                  <h3>{pro.name}</h3>
                  <p>{pro.role}</p>
                  <div className={styles.meta}>{pro.rating} ({pro.reviews}) · {pro.location}</div>
                  <div className={styles.cardFooter}>
                    <div><strong>{pro.price}</strong><small>{pro.priceUnit}</small></div>
                    <Link href="/search" className={styles.secondarySmall}>View Profile</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h2>Filters</h2>
            <button type="button" className={styles.clearLink} onClick={() => {
              setAvailability({ today: true, emergency: false });
              setType("any");
              setYears(0);
              setRating(4.5);
            }}>Clear all</button>
          </div>

          <div className={styles.filterBlock}>
            <h3>Availability</h3>
            <label><input type="checkbox" checked={availability.today} onChange={() => setAvailability((v) => ({ ...v, today: !v.today }))} /> Available Today</label>
            <label><input type="checkbox" checked={availability.emergency} onChange={() => setAvailability((v) => ({ ...v, emergency: !v.emergency }))} /> Emergency (24/7)</label>
          </div>

          <div className={styles.filterBlock}>
            <h3>Professional Type</h3>
            <label><input type="radio" name="type" checked={type === "any"} onChange={() => setType("any")} /> Any</label>
            <label><input type="radio" name="type" checked={type === "technician"} onChange={() => setType("technician")} /> Independent Technician</label>
            <label><input type="radio" name="type" checked={type === "company"} onChange={() => setType("company")} /> Registered Company</label>
          </div>

          <div className={styles.filterBlock}>
            <h3>Years of Experience</h3>
            {[0, 3, 5, 10].map((value) => (
              <label key={value}><input type="radio" name="years" checked={years === value} onChange={() => setYears(value)} /> {value === 0 ? "Any" : `${value}+ Years`}</label>
            ))}
          </div>

          <div className={styles.filterBlock}>
            <h3>Minimum Rating</h3>
            {[4.5, 4.0, 3.0].map((value) => (
              <label key={value}><input type="radio" name="rating" checked={rating === value} onChange={() => setRating(value)} /> {value} & up</label>
            ))}
          </div>

          <div className={styles.sidebarPromo}>
            <h3>Are you a certified Electrician?</h3>
            <p>Join thousands of professionals earning more on Boulot Man. Get verified and access premium clients today.</p>
            <Link href="/signup" className={styles.primaryFull}>Apply as a Pro</Link>
          </div>
        </aside>
      </main>

      <section className={styles.howSection}>
        <div className={styles.container}>
          <h2 className={styles.centerTitle}>How to hire an electrician on Boulot Man</h2>
          <div className={styles.stepsGrid}>
            {["Post or Search", "Compare Quotes", "Hire Safely"].map((title, index) => (
              <article key={title} className={styles.stepCard}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h2>Recent Verified Reviews</h2>
          </div>
          <div className={styles.reviewGrid}>
            {reviews.map((review, index) => (
              <article key={index} className={styles.reviewCard}>
                <div className={styles.reviewStars}>★★★★★</div>
                <p>{review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.centerTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map(([question, answer], index) => (
              <button key={question} type="button" className={styles.faqCard} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
                <div className={styles.faqQuestion}>{question}</div>
                {faqOpen === index ? <p>{answer}</p> : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
