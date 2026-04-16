export type TechnicianTaskType = "residential" | "commercial";

export type TechnicianMarketplaceTask = {
  id: string;
  title: string;
  description: string;
  location: string;
  locationLabel: string;
  posted: string;
  schedule: string;
  deadline: string;
  budgetLabel: string;
  budgetDetail: string;
  budgetValue: number;
  match: number;
  attachments: number;
  tags: string[];
  type: TechnicianTaskType;
  category: string;
  urgent?: boolean;
  proposals: string[];
  requirements: string[];
  overview: string[];
  client: {
    name: string;
    initials: string;
    avatarTone: "orange" | "blue" | "green" | "gold";
    rating: string;
    paymentVerified: boolean;
    tasksPosted: string;
    totalSpent: string;
    memberSince: string;
  };
};

export const technicianMarketplaceTasks: TechnicianMarketplaceTask[] = [
  {
    id: "retail-repair",
    title: "Emergency electrical repair for retail store",
    description:
      "Client needs immediate diagnosis and repair for repeated power outages affecting a small storefront before opening hours.",
    location: "Brooklyn, NY",
    locationLabel: "Brooklyn, NY (Onsite)",
    posted: "Posted 2 hours ago",
    schedule: "Starts today",
    deadline: "Before 6 PM today",
    budgetLabel: "$150 - $250",
    budgetDetail: "Estimated fixed price",
    budgetValue: 250,
    match: 96,
    attachments: 2,
    tags: ["Electrical Repair", "Troubleshooting", "Urgent"],
    type: "commercial",
    category: "Electrical",
    urgent: true,
    proposals: ["KW", "AJ", "MR"],
    overview: [
      "A neighborhood retail shop is experiencing intermittent power loss across the front counter, signage circuit, and one back-office outlet run. The owner needs a licensed electrician to inspect the current setup, isolate the fault, and restore stable power before the evening rush.",
      "The storefront remains open, so the work needs to be done cleanly and with minimal disruption to staff and customers. The client can provide access to the breaker panel, maintenance closet, and any previous repair notes from the landlord.",
    ],
    requirements: [
      "Diagnose the short or overload causing repeated outages.",
      "Repair or replace any damaged breakers, receptacles, or exposed wiring tied to the affected circuit.",
      "Confirm all repaired circuits are safe for reopening and brief the client on next steps if a deeper panel issue is found.",
    ],
    client: {
      name: "Khaled Wright",
      initials: "KW",
      avatarTone: "orange",
      rating: "4.9 (32 reviews)",
      paymentVerified: true,
      tasksPosted: "18 Tasks Posted (83% Hire Rate)",
      totalSpent: "$14.2k Total Spent",
      memberSince: "Member since Mar 2021",
    },
  },
  {
    id: "smart-lighting",
    title: "Install smart lighting in 3-bedroom apartment",
    description:
      "Residential install for connected switches, fixtures, and app setup across multiple rooms with a walkthrough for the client.",
    location: "Queens, NY",
    locationLabel: "Queens, NY (Residential)",
    posted: "Posted 5 hours ago",
    schedule: "Within 3 days",
    deadline: "Complete this week",
    budgetLabel: "$480",
    budgetDetail: "Fixed project budget",
    budgetValue: 480,
    match: 91,
    attachments: 1,
    tags: ["Residential", "Smart Home", "Repeat Client"],
    type: "residential",
    category: "Smart Home",
    proposals: ["AT", "BK"],
    overview: [
      "The client is upgrading a three-bedroom apartment with smart switches, new dimmable fixtures, and voice-assistant-ready controls. They want the setup installed cleanly, paired in-app, and explained at the end of the job.",
      "Most devices have already been purchased, but the selected technician should confirm compatibility and flag any additional mounting hardware before arrival.",
    ],
    requirements: [
      "Install and pair smart switches and fixtures in the living room, hallway, and bedrooms.",
      "Test scene control, scheduling, and app access on the client's phone.",
      "Leave the apartment cleaned up and provide a quick handoff walkthrough.",
    ],
    client: {
      name: "Ariana Torres",
      initials: "AT",
      avatarTone: "green",
      rating: "4.8 (19 reviews)",
      paymentVerified: true,
      tasksPosted: "9 Tasks Posted (78% Hire Rate)",
      totalSpent: "$6.7k Total Spent",
      memberSince: "Member since Aug 2022",
    },
  },
  {
    id: "panel-inspection",
    title: "Residential panel inspection and load check",
    description:
      "Homeowner wants a licensed electrician to inspect an older panel and recommend any immediate safety fixes before selling the property.",
    location: "Bronx, NY",
    locationLabel: "Bronx, NY (Residential)",
    posted: "Posted yesterday",
    schedule: "This week",
    deadline: "Before open house on Saturday",
    budgetLabel: "$180",
    budgetDetail: "Inspection budget",
    budgetValue: 180,
    match: 88,
    attachments: 3,
    tags: ["Inspection", "Residential", "Safety"],
    type: "residential",
    category: "Inspection",
    proposals: ["DM"],
    overview: [
      "A homeowner preparing to sell wants a professional inspection of an older electrical panel and a load check on key circuits. The goal is to identify any immediate risks that should be corrected before listing photos and the first open house.",
      "They are not asking for a full rewire at this stage, but they do want clear notes, code concerns, and a repair recommendation if anything urgent is uncovered.",
    ],
    requirements: [
      "Inspect the existing panel, labeling, grounding, and breaker condition.",
      "Perform a practical load assessment for kitchen, HVAC, and laundry circuits.",
      "Provide a written summary of safety issues and recommended next steps.",
    ],
    client: {
      name: "Darius Miles",
      initials: "DM",
      avatarTone: "blue",
      rating: "5.0 (11 reviews)",
      paymentVerified: true,
      tasksPosted: "6 Tasks Posted (100% Hire Rate)",
      totalSpent: "$3.1k Total Spent",
      memberSince: "Member since Jan 2024",
    },
  },
  {
    id: "cafe-upgrade",
    title: "Lighting upgrade for cafe renovation",
    description:
      "Cafe owner needs pendant installation, dimmer setup, and a clean finish before reopening next weekend.",
    location: "Manhattan, NY",
    locationLabel: "Manhattan, NY (Commercial)",
    posted: "Posted 2 days ago",
    schedule: "Start by Friday",
    deadline: "Finish before reopening next weekend",
    budgetLabel: "$620",
    budgetDetail: "Estimated fixed price",
    budgetValue: 620,
    match: 84,
    attachments: 4,
    tags: ["Commercial", "Lighting", "Renovation"],
    type: "commercial",
    category: "Lighting",
    proposals: ["LS", "TY", "DM"],
    overview: [
      "A cafe renovation is in its final stage and needs a technician to install new pendant fixtures, wire dimmers, and tune the lighting temperature before the soft launch next weekend.",
      "The client wants a polished finish that works for both daytime service and evening ambiance. Existing junction points are in place, but a tidy install matters because most fixtures are visible from the front counter.",
    ],
    requirements: [
      "Install pendants and verify alignment above the counter and seating zone.",
      "Wire and test dimmers for morning and evening presets.",
      "Complete punch-list fixes so the designer can sign off before reopening.",
    ],
    client: {
      name: "Lena Shah",
      initials: "LS",
      avatarTone: "gold",
      rating: "4.7 (27 reviews)",
      paymentVerified: true,
      tasksPosted: "22 Tasks Posted (72% Hire Rate)",
      totalSpent: "$18.9k Total Spent",
      memberSince: "Member since Nov 2020",
    },
  },
];

export function getTechnicianMarketplaceTask(taskId: string) {
  return technicianMarketplaceTasks.find((task) => task.id === taskId);
}
