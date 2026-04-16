import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import styles from "./search.module.css";

const categories = [
  { label: "Electrical", count: 124, active: true },
  { label: "Plumbing", count: 86, active: false },
  { label: "Cleaning", count: 210, active: false },
  { label: "Painting", count: 45, active: false },
];

const professionalTypes = [
  { label: "Any", active: true },
  { label: "Independent Technician", active: false },
  { label: "Registered Company", active: false },
];

const ratings = [
  { label: "4.5 & up", active: true },
  { label: "4.0 & up", active: false },
  { label: "3.0 & up", active: false },
];

const tabs = [
  { label: "All results", count: 124, active: true },
  { label: "Technicians", count: 86, active: false },
  { label: "Companies", count: 38, active: false },
];

const results = [
  {
    name: "Moussa Traoré",
    badge: "Verified",
    badgeKind: "verified",
    role: "Master Electrician",
    chips: ["Same-day booking", "Certified"],
    description:
      "Certified electrician with over 8 years of experience in residential and commercial wiring, troubleshooting, and emergency repairs.",
    location: "Cocody, Abidjan",
    rating: "4.9 (218 reviews)",
    meta: "300+ jobs",
    price: "18,000 XOF",
    priceLabel: "per visit",
    action: "View profile",
    actionKind: "primary",
    image:
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F2",
    imageAlt: "Moussa Traoré",
    metaIcon: "lucide:briefcase",
  },
  {
    name: "FastFix Electrical",
    badge: "Verified Company",
    badgeKind: "company",
    role: "Electrical Maintenance Company",
    chips: ["24/7 Support", "Insured"],
    description:
      "A specialized electrical company providing round-the-clock emergency repairs, large-scale installations, and regular maintenance contracts for businesses.",
    location: "Marcory, Abidjan",
    rating: "4.8 (145 reviews)",
    meta: "12 Staff",
    price: "25,000 XOF",
    priceLabel: "base callout",
    action: "View company",
    actionKind: "secondary",
    placeholder: { icon: "lucide:building-2", tone: "primary" },
    metaIcon: "lucide:users",
  },
  {
    name: "Serge Yao",
    badge: "Verified",
    badgeKind: "verified",
    role: "Facility Technician",
    chips: ["Business support", "Verified ID"],
    description:
      "Jack-of-all-trades facility technician with a strong electrical background. Ideal for office maintenance, lighting replacements, and minor structural repairs.",
    location: "Plateau, Abidjan",
    rating: "4.7 (89 reviews)",
    meta: "150+ jobs",
    price: "15,000 XOF",
    priceLabel: "per hour",
    action: "View profile",
    actionKind: "primary",
    image:
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F1",
    imageAlt: "Serge Yao",
    metaIcon: "lucide:briefcase",
  },
  {
    name: "Volt Power Solutions",
    badge: "Verified Company",
    badgeKind: "company",
    role: "Energy & Electrical Systems",
    chips: ["Solar Installation", "Commercial"],
    description:
      "Large-scale electrical installations, backup generator setup, and solar power integration for homes and corporate buildings.",
    location: "Treichville, Abidjan",
    rating: "4.9 (310 reviews)",
    meta: "35 Staff",
    price: "Custom Quote",
    priceLabel: "Contact for pricing",
    action: "View company",
    actionKind: "secondary",
    placeholder: { icon: "lucide:zap", tone: "accent" },
    metaIcon: "lucide:users",
  },
  {
    name: "Ibrahim Touré",
    role: "Independent Electrician",
    chips: ["Quick response"],
    description:
      "Reliable and affordable electrician for everyday household issues like short circuits, faulty outlets, and ceiling fan installations.",
    location: "Yopougon, Abidjan",
    rating: "4.6 (54 reviews)",
    meta: "85+ jobs",
    price: "10,000 XOF",
    priceLabel: "per visit",
    action: "View profile",
    actionKind: "primary",
    image:
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F5",
    imageAlt: "Ibrahim Touré",
    metaIcon: "lucide:briefcase",
  },
];

export default function SearchPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerGrid}>
            <Link href="/" className={styles.brand} aria-label="Boulot Man home">
              <Image
                src="/boulotman-logo.png"
                alt="Boulot Man"
                width={168}
                height={42}
                className={styles.brandImage}
                priority
              />
            </Link>

            <div className={styles.mobileProfile} aria-hidden="true">
              <img
                src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FEuropean%2F1"
                alt=""
              />
            </div>

            <form className={styles.searchBar} role="search">
              <label className={styles.searchField}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <iconify-icon icon="lucide:search" />
                </span>
                <input type="text" defaultValue="Electrician" aria-label="Service" />
              </label>
              <label className={styles.searchField}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <iconify-icon icon="lucide:map-pin" />
                </span>
                <input type="text" defaultValue="Abidjan" aria-label="Location" />
              </label>
              <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                Search
              </button>
            </form>

            <div className={styles.headerActions}>
              <Link href="#" className={`${styles.button} ${styles.buttonSecondary}`}>
                Post a job
              </Link>
              <div className={styles.avatar} aria-hidden="true">
                <img
                  src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FEuropean%2F1"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={`${styles.container} ${styles.main}`}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h1 className={styles.filterTitle}>Filters</h1>
            <button type="button" className={styles.clearButton}>
              Clear all
            </button>
          </div>

          <section className={styles.filterSection} aria-labelledby="service-category-title">
            <h2 id="service-category-title" className={styles.sectionTitle}>
              Service Category
            </h2>
            <div className={styles.optionList}>
              {categories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  className={`${styles.optionItem} ${category.active ? styles.optionItemActive : ""}`}
                  aria-pressed={category.active}
                >
                  <span className={styles.checkboxBox} aria-hidden="true">
                    <iconify-icon icon="lucide:check" />
                  </span>
                  <span className={styles.optionLabel}>
                    {category.label} <span className={styles.optionCount}>({category.count})</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.filterSection} aria-labelledby="location-title">
            <h2 id="location-title" className={styles.sectionTitle}>
              Location
            </h2>
            <button type="button" className={styles.selectFake}>
              <span>Abidjan</span>
              <iconify-icon icon="lucide:chevron-down" />
            </button>
          </section>

          <section className={styles.filterSection} aria-labelledby="budget-title">
            <h2 id="budget-title" className={styles.sectionTitle}>
              Budget (XOF)
            </h2>
            <div className={styles.budgetGrid}>
              <label className={styles.budgetField}>
                <span>Min</span>
                <input className={styles.inputFake} type="text" defaultValue="0" aria-label="Minimum budget" />
              </label>
              <label className={styles.budgetField}>
                <span>Max</span>
                <input
                  className={styles.inputFake}
                  type="text"
                  defaultValue="150,000+"
                  aria-label="Maximum budget"
                />
              </label>
            </div>
          </section>

          <section className={styles.filterSection} aria-labelledby="professional-type-title">
            <h2 id="professional-type-title" className={styles.sectionTitle}>
              Professional Type
            </h2>
            <div className={styles.optionList}>
              {professionalTypes.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className={`${styles.optionItem} ${option.active ? styles.optionItemActive : ""}`}
                  aria-pressed={option.active}
                >
                  <span className={styles.radioCircle} aria-hidden="true" />
                  <span className={styles.optionLabel}>{option.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.filterSection} aria-labelledby="rating-title">
            <h2 id="rating-title" className={styles.sectionTitle}>
              Minimum Rating
            </h2>
            <div className={styles.optionList}>
              {ratings.map((rating) => (
                <button
                  key={rating.label}
                  type="button"
                  className={`${styles.optionItem} ${rating.active ? styles.optionItemActive : ""}`}
                  aria-pressed={rating.active}
                >
                  <span className={styles.radioCircle} aria-hidden="true" />
                  <span className={styles.optionLabel}>
                    <iconify-icon icon="lucide:star" className={styles.starIcon} />
                    {rating.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className={styles.resultsArea}>
          <div className={styles.resultsTopBar}>
            <div className={styles.tabs} role="tablist" aria-label="Result categories">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={tab.active}
                  className={`${styles.tab} ${tab.active ? styles.tabActive : ""}`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <label className={styles.sortBy}>
              <span>Sort by:</span>
              <select aria-label="Sort results">
                <option>Relevance</option>
                <option>Highest rated</option>
                <option>Lowest price</option>
              </select>
            </label>
          </div>

          <div className={styles.resultsList}>
            {results.map((result) => (
              <article key={result.name} className={styles.resultCard}>
                <div className={styles.resultMedia}>
                  {result.image ? (
                    <img src={result.image} alt={result.imageAlt} className={styles.resultImage} />
                  ) : (
                    <div
                      className={`${styles.companyPlaceholder} ${
                        result.placeholder?.tone === "accent" ? styles.companyPlaceholderAccent : styles.companyPlaceholderPrimary
                      }`}
                      aria-hidden="true"
                    >
                      <iconify-icon icon={result.placeholder?.icon} />
                    </div>
                  )}
                </div>

                <div className={styles.resultBody}>
                  <div className={styles.resultTitleRow}>
                    <h2 className={styles.resultName}>{result.name}</h2>
                    {result.badge ? (
                      <span
                        className={`${styles.badge} ${
                          result.badgeKind === "company" ? styles.companyBadge : styles.verifiedBadge
                        }`}
                      >
                        <iconify-icon
                          icon={result.badgeKind === "company" ? "lucide:building-2" : "lucide:shield-check"}
                        />
                        {result.badge}
                      </span>
                    ) : null}
                  </div>

                  <p className={styles.resultRole}>{result.role}</p>

                  <div className={styles.chips}>
                    {result.chips.map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className={styles.resultDescription}>{result.description}</p>

                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <iconify-icon icon="lucide:map-pin" />
                      {result.location}
                    </span>
                    <span className={`${styles.metaItem} ${styles.metaRating}`}>
                      <iconify-icon icon="lucide:star" className={styles.starIcon} />
                      {result.rating}
                    </span>
                    <span className={styles.metaItem}>
                      <iconify-icon icon={result.metaIcon} />
                      {result.meta}
                    </span>
                  </div>
                </div>

                <div className={styles.resultActions}>
                  <div className={styles.priceBlock}>
                    <div className={styles.price}>{result.price}</div>
                    <div className={styles.priceLabel}>{result.priceLabel}</div>
                  </div>

                  <Link
                    href="#"
                    className={`${styles.button} ${
                      result.actionKind === "secondary" ? styles.buttonSecondary : styles.buttonPrimary
                    } ${styles.actionButton}`}
                  >
                    {result.action}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <nav className={styles.pagination} aria-label="Pagination">
            <button type="button" className={`${styles.pageButton} ${styles.pageButtonDisabled}`} disabled>
              <iconify-icon icon="lucide:chevron-left" />
              Previous
            </button>
            <div className={styles.pageNumbers}>
              <button type="button" className={`${styles.pageNumber} ${styles.pageNumberActive}`}>
                1
              </button>
              <button type="button" className={styles.pageNumber}>
                2
              </button>
              <button type="button" className={styles.pageNumber}>
                3
              </button>
              <span className={styles.pageEllipsis}>...</span>
              <button type="button" className={styles.pageNumber}>
                12
              </button>
            </div>
            <button type="button" className={styles.pageButton}>
              Next
              <iconify-icon icon="lucide:chevron-right" />
            </button>
          </nav>
        </section>
      </main>

      <Footer />
    </div>
  );
}
