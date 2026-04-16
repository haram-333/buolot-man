"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type NavKey = "dashboard" | "tasks" | "messages" | "payments" | "saved" | "profile";
type ServiceType = "onsite" | "remote" | "hybrid";
type Urgency = "urgent" | "standard";
type BudgetMode = "fixed" | "hourly";
type ContactMethod = "in-app" | "phone" | "whatsapp";

const navItems: Array<{ key: NavKey; label: string; icon: string; href: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard", href: "/dashboard/client" },
  { key: "tasks", label: "My Tasks", icon: "lucide:clipboard-list", href: "/dashboard/client" },
  { key: "messages", label: "Messages", icon: "lucide:message-square", href: "/dashboard/client" },
  { key: "payments", label: "Payments", icon: "lucide:credit-card", href: "/dashboard/client" },
  { key: "saved", label: "Saved", icon: "lucide:bookmark", href: "/dashboard/client" },
  { key: "profile", label: "Profile", icon: "lucide:user", href: "/dashboard/client" },
];

const categories = ["Electrical", "Plumbing", "HVAC", "Cleaning", "Carpentry"];
const subcategories: Record<string, string[]> = {
  Electrical: ["Wiring & Installation", "Lighting", "Panel Upgrade", "Solar Setup"],
  Plumbing: ["Pipe Repair", "Drain Cleaning", "Water Heater", "Bathroom Install"],
  HVAC: ["AC Repair", "AC Installation", "Ventilation", "Maintenance"],
  Cleaning: ["Deep Cleaning", "Office Cleaning", "Move-out Cleaning", "Post-Reno Cleaning"],
  Carpentry: ["Furniture", "Doors", "Cabinets", "Wood Repair"],
};

export default function PostTaskPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>("onsite");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [budgetMode, setBudgetMode] = useState<BudgetMode>("fixed");
  const [materialsProvided, setMaterialsProvided] = useState(true);
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>(["in-app", "phone"]);
  const [skillInput, setSkillInput] = useState("");
  const [published, setPublished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    title: "Complete electrical wiring for new apartment",
    category: "Electrical",
    subcategory: "Wiring & Installation",
    description:
      "I need a certified electrician to completely wire a newly built 3-bedroom apartment. The job includes installing circuit breakers, wiring for all lighting fixtures, and installing wall outlets. All structural conduits are already in place.",
    address: "Rue des Jardins, Cocody Deux Plateaux",
    apartment: "Building C, Apt 14",
    city: "Abidjan",
    expectedDate: "Oct 24, 2025",
    timePreference: "Morning (8AM - 12PM)",
    budget: "85,000",
  });
  const [skills, setSkills] = useState(["Wiring", "Circuit Breakers", "Lighting Installation"]);
  const [files, setFiles] = useState([
    { name: "apartment_floor_plan.pdf", size: "2.4 MB", kind: "pdf" },
    { name: "current_panel_photo.jpg", size: "1.1 MB", kind: "image" },
  ]);

  const taskSummary = useMemo(
    () => ({
      categoryLabel: `${formData.category} / ${formData.subcategory}`,
      scheduleLabel: `${formData.expectedDate} • ${formData.timePreference}`,
      budgetLabel: budgetMode === "fixed" ? `${formData.budget} XOF fixed` : `${formData.budget} XOF / hr`,
      contactLabel: contactMethods.length ? contactMethods.join(", ") : "No contact methods selected",
    }),
    [budgetMode, contactMethods, formData]
  );

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (field === "category") {
      const nextSubcategory = subcategories[value]?.[0] ?? "";
      setFormData((current) => ({ ...current, category: value, subcategory: nextSubcategory }));
    }
  };

  const toggleContactMethod = (method: ContactMethod) => {
    setContactMethods((current) =>
      current.includes(method) ? current.filter((item) => item !== method) : [...current, method]
    );
  };

  const addSkill = () => {
    const next = skillInput.trim();
    if (!next || skills.includes(next)) return;
    setSkills((current) => [...current, next]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((current) => current.filter((item) => item !== skill));
  };

  const removeFile = (name: string) => {
    setFiles((current) => current.filter((file) => file.name !== name));
  };

  const saveDraft = () => {
    setSaved(true);
    setPublished(false);
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
              <Link key={item.key} href={item.href} className={styles.navItem}>
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
                  <h2>Post a Task</h2>
                  <p>Provide detailed information to find the best professional for your job.</p>
                </div>

                <div className={styles.stepper} aria-label="Task publishing progress">
                  <div className={`${styles.step} ${styles.stepActive}`}>
                    <span className={styles.stepNumber}>1</span>
                    <span className={styles.stepText}>Draft</span>
                  </div>
                  <span className={styles.stepLine} />
                  <div className={styles.step}>
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

              {(published || saved) ? (
                <section className={`${styles.banner} ${published ? styles.bannerSuccess : styles.bannerDraft}`}>
                  <div>
                    <strong>{published ? "Task ready to go" : "Draft saved"}</strong>
                    <p>
                      {published
                        ? "Your task has been prepared and is ready to publish to professionals."
                        : "Your draft is saved locally so you can keep editing before publishing."}
                    </p>
                  </div>
                  <Link href="/dashboard/client" className={styles.bannerLink}>
                    Back to dashboard
                  </Link>
                </section>
              ) : null}

              <div className={styles.twoColumnLayout}>
                <div className={styles.mainColumn}>
                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Task Overview</h3>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}>
                        <label htmlFor="title" className={styles.label}>Task Title</label>
                        <input id="title" className={styles.input} value={formData.title} onChange={(event) => updateField("title", event.target.value)} />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.label}>Category</label>
                        <select id="category" className={styles.select} value={formData.category} onChange={(event) => updateField("category", event.target.value)}>
                          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="subcategory" className={styles.label}>Sub-Category</label>
                        <select id="subcategory" className={styles.select} value={formData.subcategory} onChange={(event) => updateField("subcategory", event.target.value)}>
                          {(subcategories[formData.category] ?? []).map((subcategory) => <option key={subcategory} value={subcategory}>{subcategory}</option>)}
                        </select>
                      </div>

                      <div className={styles.formGroupFull}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea id="description" className={styles.textarea} value={formData.description} onChange={(event) => updateField("description", event.target.value)} />
                      </div>

                      <div className={styles.formGroupFull}>
                        <label htmlFor="skill-input" className={styles.label}>Specific Skills Required (Optional)</label>
                        <div className={styles.inlineInputRow}>
                          <input
                            id="skill-input"
                            className={styles.input}
                            placeholder="e.g. Panel Installation"
                            value={skillInput}
                            onChange={(event) => setSkillInput(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <button type="button" className={styles.secondaryButton} onClick={addSkill}>Add</button>
                        </div>

                        <div className={styles.tagRow}>
                          {skills.map((skill) => (
                            <span key={skill} className={styles.tag}>
                              {skill}
                              <button type="button" className={styles.tagRemove} onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                                <iconify-icon icon="lucide:x" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Location Details</h3>
                    </div>

                    <div className={styles.mapPreview}>
                      <div className={styles.mapPin}>
                        <iconify-icon icon="lucide:map-pin" />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}>
                        <label htmlFor="address" className={styles.label}>Street Address</label>
                        <input id="address" className={styles.input} value={formData.address} onChange={(event) => updateField("address", event.target.value)} />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="apartment" className={styles.label}>Apartment, suite, etc. (Optional)</label>
                        <input id="apartment" className={styles.input} value={formData.apartment} onChange={(event) => updateField("apartment", event.target.value)} />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="city" className={styles.label}>City</label>
                        <input id="city" className={styles.input} value={formData.city} onChange={(event) => updateField("city", event.target.value)} />
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Media & Attachments</h3>
                      <span>(Optional)</span>
                    </div>

                    <button type="button" className={styles.uploadZone}>
                      <div className={styles.uploadIcon}>
                        <iconify-icon icon="lucide:upload-cloud" />
                      </div>
                      <strong>Click to upload or drag and drop</strong>
                      <span>SVG, PNG, JPG or PDF (max. 10MB)</span>
                    </button>

                    <div className={styles.fileList}>
                      {files.map((file) => (
                        <div key={file.name} className={styles.fileItem}>
                          <div className={styles.fileIcon}>
                            <iconify-icon icon={file.kind === "pdf" ? "lucide:file-text" : "lucide:image"} />
                          </div>
                          <div className={styles.fileInfo}>
                            <strong>{file.name}</strong>
                            <span>{file.size}</span>
                          </div>
                          <button type="button" className={styles.fileRemove} onClick={() => removeFile(file.name)} aria-label={`Remove ${file.name}`}>
                            <iconify-icon icon="lucide:trash-2" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className={styles.sidePanel}>
                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Task Setup</h3>
                    </div>

                    <div className={styles.stack}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Service Type</label>
                        <div className={styles.segmentedControl}>
                          {[
                            { value: "onsite", label: "Onsite" },
                            { value: "remote", label: "Remote" },
                            { value: "hybrid", label: "Hybrid" },
                          ].map((option) => (
                            <button key={option.value} type="button" className={`${styles.segment} ${serviceType === option.value ? styles.segmentActive : ""}`} onClick={() => setServiceType(option.value as ServiceType)}>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.divider} />

                      <div className={styles.formGroup}>
                        <label htmlFor="expectedDate" className={styles.label}>Expected Date</label>
                        <input id="expectedDate" className={styles.input} value={formData.expectedDate} onChange={(event) => updateField("expectedDate", event.target.value)} />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="timePreference" className={styles.label}>Time Preference</label>
                        <input id="timePreference" className={styles.input} value={formData.timePreference} onChange={(event) => updateField("timePreference", event.target.value)} />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Urgency Level</label>
                        <div className={styles.stackCompact}>
                          {[
                            { value: "urgent", label: "Urgent (Within 24h)" },
                            { value: "standard", label: "Standard / Flexible" },
                          ].map((option) => (
                            <button key={option.value} type="button" className={`${styles.radioCard} ${urgency === option.value ? styles.radioCardActive : ""}`} onClick={() => setUrgency(option.value as Urgency)}>
                              <span className={styles.radioIndicator} />
                              <span>{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.divider} />

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Budget Options</label>
                        <div className={styles.segmentedControl}>
                          {[
                            { value: "fixed", label: "Fixed Price" },
                            { value: "hourly", label: "Hourly Rate" },
                          ].map((option) => (
                            <button key={option.value} type="button" className={`${styles.segment} ${budgetMode === option.value ? styles.segmentActive : ""}`} onClick={() => setBudgetMode(option.value as BudgetMode)}>
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <div className={styles.currencyInput}>
                          <span>XOF</span>
                          <input value={formData.budget} onChange={(event) => updateField("budget", event.target.value)} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={styles.card}>
                    <div className={styles.sectionTitle}>
                      <h3>Preferences</h3>
                    </div>

                    <div className={styles.stack}>
                      <div className={styles.toggleRow}>
                        <div>
                          <strong>Materials Provided</strong>
                          <span>Client provides materials</span>
                        </div>
                        <button type="button" className={`${styles.toggle} ${materialsProvided ? styles.toggleOn : ""}`} onClick={() => setMaterialsProvided((current) => !current)} aria-pressed={materialsProvided}>
                          <span />
                        </button>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Contact Method</label>
                        <div className={styles.stackCompact}>
                          {[
                            { value: "in-app", label: "In-app Messaging" },
                            { value: "phone", label: "Phone Call" },
                            { value: "whatsapp", label: "WhatsApp" },
                          ].map((option) => {
                            const checked = contactMethods.includes(option.value as ContactMethod);

                            return (
                              <button key={option.value} type="button" className={styles.checkboxRow} onClick={() => toggleContactMethod(option.value as ContactMethod)}>
                                <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ""}`}>
                                  {checked ? <iconify-icon icon="lucide:check" /> : null}
                                </span>
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={`${styles.card} ${styles.summaryCard}`}>
                    <div className={styles.sectionTitle}>
                      <h3>Task Summary</h3>
                    </div>

                    <div className={styles.summaryList}>
                      <div>
                        <span>Category</span>
                        <strong>{taskSummary.categoryLabel}</strong>
                      </div>
                      <div>
                        <span>Schedule</span>
                        <strong>{taskSummary.scheduleLabel}</strong>
                      </div>
                      <div>
                        <span>Budget</span>
                        <strong>{taskSummary.budgetLabel}</strong>
                      </div>
                      <div>
                        <span>Contact</span>
                        <strong>{taskSummary.contactLabel}</strong>
                      </div>
                    </div>

                    <div className={styles.actionStack}>
                      <Link href="/post-task/review" className={styles.primaryButtonBlock}>
                        Review & Publish
                      </Link>
                      <button type="button" className={styles.secondaryButtonBlock} onClick={saveDraft}>Save as Draft</button>
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
