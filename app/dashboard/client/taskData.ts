export type NavKey = "dashboard" | "tasks" | "messages" | "payments" | "saved" | "profile";
export type TaskStatus = "in-progress" | "scheduled" | "quotes";
export type MessageSender = "client" | "pro";

export type ClientConversation = {
  id: string;
  participant: {
    name: string;
    initials: string;
    role: string;
    status: "online" | "offline";
  };
  taskTitle: string;
  updatedAt: string;
  unreadCount: number;
  messages: Array<{
    id: string;
    sender: MessageSender;
    text: string;
    time: string;
  }>;
};

export type ClientTask = {
  id: string;
  title: string;
  location: string;
  schedule: string;
  budget: string;
  progressLabel: string;
  progress: number;
  status: TaskStatus;
  pro: string;
  category: string;
  postedAt: string;
  views: number;
  description: string[];
  skills: string[];
  attachments: Array<{ name: string; size: string; type: "image" | "file" }>;
  logistics: {
    budgetLabel: string;
    scheduleLabel: string;
    locationLabel: string;
    materials: string;
    propertyType: string;
    parking: string;
  };
  statusSummary: {
    label: string;
    proposals: string;
    views: string;
    interviews: string;
  };
  client: {
    name: string;
    initials: string;
    rating: string;
    location: string;
    tasksPosted: string;
    totalSpent: string;
    memberSince: string;
  };
  bids: Array<{
    id: string;
    bidder: string;
    initials: string;
    rating: number;
    reviews: number;
    verified?: boolean;
    amount: string;
    amountType: string;
    message: string;
    portfolio: string[];
    profile: {
      title: string;
      rate: string;
      rateLabel: string;
      jobsCompleted: string;
      responseTime: string;
      availability: string;
      backgroundCheck: string;
      about: string[];
      skills: string[];
      languages: Array<{ name: string; level: string }>;
      gallery: Array<{ title: string; label: string }>;
      reviewsList: Array<{
        id: string;
        reviewer: string;
        initials: string;
        date: string;
        service: string;
        ratingLabel: string;
        text: string;
      }>;
    };
  }>;
  questions: Array<{
    id: string;
    asker: string;
    initials: string;
    time: string;
    question: string;
    reply?: {
      name: string;
      badge?: string;
      time: string;
      text: string;
    };
  }>;
  similarTasks: Array<{
    id: string;
    title: string;
    budget: string;
    location: string;
  }>;
};

export const dashboardNavItems: Array<{ key: NavKey; label: string; icon: string; href: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "lucide:layout-dashboard", href: "/dashboard/client" },
  { key: "tasks", label: "My Tasks", icon: "lucide:clipboard-list", href: "/dashboard/client/tasks" },
  { key: "messages", label: "Messages", icon: "lucide:message-square", href: "/dashboard/client/messages" },
  { key: "payments", label: "Payments", icon: "lucide:credit-card", href: "/dashboard/client" },
  { key: "saved", label: "Saved", icon: "lucide:bookmark", href: "/dashboard/client" },
  { key: "profile", label: "Profile", icon: "lucide:user", href: "/dashboard/client" },
];

export const clientConversations: ClientConversation[] = [
  {
    id: "conv-carlos",
    participant: {
      name: "Carlos Rodriguez",
      initials: "CR",
      role: "Master Electrician",
      status: "online",
    },
    taskTitle: "Electrical Wiring Troubleshooting",
    updatedAt: "10:15 AM",
    unreadCount: 0,
    messages: [
      {
        id: "carlos-1",
        sender: "client",
        text: "Hi Carlos, I saw your proposal and I want to confirm whether Thursday morning still works for the site visit.",
        time: "09:45 AM",
      },
      {
        id: "carlos-2",
        sender: "pro",
        text: "Good morning John. Yes, Thursday works. I can be at the apartment around 10:00 AM and start with the panel and circuit checks first.",
        time: "09:50 AM",
      },
      {
        id: "carlos-3",
        sender: "client",
        text: "Perfect. Please bring whatever you need for a first diagnostic pass. Building access is already cleared.",
        time: "09:52 AM",
      },
      {
        id: "carlos-4",
        sender: "pro",
        text: "Sounds great, see you then.",
        time: "10:15 AM",
      },
    ],
  },
  {
    id: "conv-sarah",
    participant: {
      name: "Sarah Jenkins",
      initials: "SJ",
      role: "Project Coordinator",
      status: "offline",
    },
    taskTitle: "Office Network Deployment",
    updatedAt: "Yesterday",
    unreadCount: 1,
    messages: [
      {
        id: "sarah-1",
        sender: "pro",
        text: "The revised proposal is attached below. We added a cleaner rack layout and an extra access point for the meeting room.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "conv-michael",
    participant: {
      name: "Michael Chen",
      initials: "MC",
      role: "Solar Systems Technician",
      status: "online",
    },
    taskTitle: "Smart Home Solar Integration",
    updatedAt: "Tuesday",
    unreadCount: 0,
    messages: [
      {
        id: "michael-1",
        sender: "pro",
        text: "Thanks for the payment. Have a good evening and let me know if the monitoring dashboard needs any adjustment after tomorrow.",
        time: "Tuesday",
      },
    ],
  },
  {
    id: "conv-eb",
    participant: {
      name: "Electrician Bros Co.",
      initials: "EB",
      role: "Electrical Team",
      status: "offline",
    },
    taskTitle: "Electrical Wiring Troubleshooting",
    updatedAt: "Oct 12",
    unreadCount: 0,
    messages: [
      {
        id: "eb-1",
        sender: "pro",
        text: "We can dispatch a team tomorrow if you still need a second quote. Let us know your preferred arrival window.",
        time: "Oct 12",
      },
    ],
  },
];

export const clientTasks: ClientTask[] = [
  {
    id: "task-1",
    title: "Electrical Wiring Troubleshooting",
    location: "Cocody, Abidjan",
    schedule: "Started: Oct 12 • Est. Finish: Oct 14",
    budget: "15,000 XOF",
    progressLabel: "Diagnostics Complete",
    progress: 50,
    status: "in-progress",
    pro: "Kouassi Marc",
    category: "Electrical",
    postedAt: "Posted 2 hours ago",
    views: 42,
    description: [
      "Need a certified electrician to inspect repeated power trips and voltage drops across a 2-bedroom apartment. The issue appears to affect the living room, kitchen, and one bedroom circuit.",
      "The task includes fault tracing, breaker inspection, rewiring of any damaged sections, and testing all corrected circuits before handoff. The property is accessible during business hours and work can continue immediately.",
    ],
    skills: ["Residential Wiring", "Circuit Diagnostics", "Panel Upgrades", "Licensed Electrician"],
    attachments: [
      { name: "current-panel.jpg", size: "2.4 MB", type: "image" },
      { name: "apartment-floorplan.pdf", size: "1.1 MB", type: "file" },
    ],
    logistics: {
      budgetLabel: "15,000 XOF",
      scheduleLabel: "Within 2 days",
      locationLabel: "Cocody, Abidjan (Onsite)",
      materials: "Professional must provide",
      propertyType: "Apartment / Condo",
      parking: "Street parking available",
    },
    statusSummary: {
      label: "In Progress",
      proposals: "3 received",
      views: "42",
      interviews: "1",
    },
    client: {
      name: "John Doe",
      initials: "JD",
      rating: "5.0 (4 reviews)",
      location: "Cote d'Ivoire",
      tasksPosted: "6 (80% Hire Rate)",
      totalSpent: "450,000 XOF+",
      memberSince: "Jan 2024",
    },
    bids: [
      {
        id: "bid-1",
        bidder: "Carlos Rodriguez",
        initials: "CR",
        rating: 4.9,
        reviews: 124,
        verified: true,
        amount: "18,000 XOF",
        amountType: "Total Price",
        message:
          "I have handled similar rewiring and breaker instability jobs in older apartments. I can continue the diagnostics, replace damaged sections, and close the issue within two working days.",
        portfolio: ["Kitchen panel upgrade", "Apartment rewiring"],
        profile: {
          title: "Master Electrician & Smart Home Specialist",
          rate: "85,000 XOF",
          rateLabel: "Standard rate • Minimum 2 hours",
          jobsCompleted: "150+ Jobs Completed",
          responseTime: "~1 Hour",
          availability: "Usually 2-3 days",
          backgroundCheck: "Passed",
          about: [
            "With over 12 years of hands-on experience in residential and commercial electrical systems, I specialize in bringing modern power and smart automation into aging buildings without compromising safety or code compliance.",
            "My work ranges from full rewires and panel upgrades to fault tracing, lighting plans, EV charger installs, and permit-heavy renovation jobs. I stay involved from diagnosis through final testing and handoff.",
          ],
          skills: [
            "Panel Upgrades",
            "Whole-home Rewiring",
            "Smart Home Setup",
            "Lighting Design",
            "EV Chargers",
            "Code Corrections",
            "Permit Handling",
            "Backup Systems",
          ],
          languages: [
            { name: "English", level: "Fluent" },
            { name: "Spanish", level: "Native" },
          ],
          gallery: [
            { title: "Panel Refresh", label: "Neat breaker panel installation" },
            { title: "Lighting Upgrade", label: "Modern recessed ceiling lighting" },
            { title: "EV Charger", label: "Garage charging point setup" },
            { title: "Smart Controls", label: "Thermostat and switch integration" },
          ],
          reviewsList: [
            {
              id: "cr-review-1",
              reviewer: "Sarah Jenkins",
              initials: "SJ",
              date: "October 12, 2024",
              service: "Panel Upgrade",
              ratingLabel: "5.0",
              text: "Carlos handled a difficult panel upgrade in our older apartment building with zero drama. He coordinated the paperwork, kept us informed, and the finished install looked exceptionally clean.",
            },
            {
              id: "cr-review-2",
              reviewer: "Michael Chen",
              initials: "MC",
              date: "September 28, 2024",
              service: "Smart Home Setup",
              ratingLabel: "5.0",
              text: "He installed smart switches, a thermostat, and an EV charger and then walked us through the setup carefully. Strong technical judgment and very clear communication.",
            },
            {
              id: "cr-review-3",
              reviewer: "Jessica O.",
              initials: "JO",
              date: "August 15, 2024",
              service: "Emergency Repair",
              ratingLabel: "4.5",
              text: "Carlos responded quickly to a partial outage and diagnosed the issue fast. Professional, methodical, and easy to work with under pressure.",
            },
          ],
        },
      },
      {
        id: "bid-2",
        bidder: "David Smith Electrical",
        initials: "DS",
        rating: 4.7,
        reviews: 89,
        amount: "16,500 XOF",
        amountType: "Total Price",
        message:
          "My team can finish the troubleshooting and circuit corrections quickly. We would like a short call first to confirm whether the panel load calculation has already been reviewed.",
        portfolio: ["Breaker replacement", "Lighting restoration"],
        profile: {
          title: "Electrical Contractor & Team Lead",
          rate: "78,000 XOF",
          rateLabel: "Crew rate • Minimum half day",
          jobsCompleted: "90+ Jobs Completed",
          responseTime: "~3 Hours",
          availability: "Next Monday",
          backgroundCheck: "Passed",
          about: [
            "I run a small electrical crew focused on apartment retrofits, lighting upgrades, and fast-turnaround corrective work. We are strongest when a task needs coordinated labor, structured execution, and clean documentation.",
            "Our approach is practical: verify scope early, align on materials and permitting, then move quickly on-site with a clear division of work across the team.",
          ],
          skills: [
            "Apartment Retrofits",
            "Crew Coordination",
            "Lighting Systems",
            "Breaker Replacement",
            "Cable Routing",
            "Site Documentation",
          ],
          languages: [
            { name: "English", level: "Fluent" },
          ],
          gallery: [
            { title: "Lighting Restore", label: "Fixture and switch replacement" },
            { title: "Breaker Work", label: "Panel and breaker correction" },
            { title: "Cable Run", label: "Structured routing in finished walls" },
            { title: "Team Install", label: "Multi-room upgrade delivery" },
          ],
          reviewsList: [
            {
              id: "ds-review-1",
              reviewer: "Sarah T.",
              initials: "ST",
              date: "July 07, 2024",
              service: "Home Rewire",
              ratingLabel: "4.8",
              text: "David's crew rewired our older home with very little disruption. The schedule was accurate and the communication stayed clear throughout.",
            },
            {
              id: "ds-review-2",
              reviewer: "Andre F.",
              initials: "AF",
              date: "May 19, 2024",
              service: "Fixture Upgrade",
              ratingLabel: "4.7",
              text: "The team moved fast and left the site tidy. Good fit for jobs that need more than one technician on-site at the same time.",
            },
          ],
        },
      },
    ],
    questions: [
      {
        id: "qa-1",
        asker: "Miguel Torres",
        initials: "MT",
        time: "1 hour ago",
        question: "Do you know if building management requires a certificate of insurance before any electrical work begins?",
        reply: {
          name: "John Doe",
          badge: "Client",
          time: "45 mins ago",
          text: "Yes, they need a COI with general liability coverage. I can share the exact wording once we confirm the professional.",
        },
      },
    ],
    similarTasks: [
      { id: "sim-1", title: "Install EV charger in garage", budget: "400,000 - 600,000 XOF", location: "Cocody" },
      { id: "sim-2", title: "Troubleshoot flickering lights across house", budget: "Hourly", location: "Marcory" },
      { id: "sim-3", title: "Replace 5 ceiling fans and fixtures", budget: "350,000 XOF", location: "Plateau" },
    ],
  },
  {
    id: "task-2",
    title: "Smart Home Solar Integration",
    location: "Marcory, Abidjan",
    schedule: "Tomorrow, 10:00 AM - 02:00 PM",
    budget: "20,000 XOF",
    progressLabel: "Awaiting Professional Arrival",
    progress: 0,
    status: "scheduled",
    pro: "Awa Toure",
    category: "Solar",
    postedAt: "Posted yesterday",
    views: 28,
    description: [
      "Looking for a solar installation specialist to integrate an existing inverter setup with a smart home monitoring panel and battery dashboard.",
      "The system is partially installed. The remaining work is final wiring, sensor configuration, testing, and explaining the usage flow to the homeowner.",
    ],
    skills: ["Solar Installation", "Smart Home Setup", "Battery Systems"],
    attachments: [
      { name: "roof-layout.jpg", size: "1.8 MB", type: "image" },
      { name: "system-specs.pdf", size: "860 KB", type: "file" },
    ],
    logistics: {
      budgetLabel: "20,000 XOF",
      scheduleLabel: "Tomorrow morning",
      locationLabel: "Marcory, Abidjan (Onsite)",
      materials: "Client provides materials",
      propertyType: "Single Family Home",
      parking: "Driveway available",
    },
    statusSummary: {
      label: "Scheduled",
      proposals: "Assigned",
      views: "28",
      interviews: "0",
    },
    client: {
      name: "John Doe",
      initials: "JD",
      rating: "5.0 (4 reviews)",
      location: "Cote d'Ivoire",
      tasksPosted: "6 (80% Hire Rate)",
      totalSpent: "450,000 XOF+",
      memberSince: "Jan 2024",
    },
    bids: [],
    questions: [],
    similarTasks: [
      { id: "sim-4", title: "Battery backup troubleshooting", budget: "120,000 XOF", location: "Marcory" },
      { id: "sim-5", title: "Install rooftop panel controller", budget: "Fixed Price", location: "Cocody" },
    ],
  },
  {
    id: "task-3",
    title: "Office Network Deployment",
    location: "Plateau, Abidjan",
    schedule: "Flexible timeline • Needs 2 days",
    budget: "Est. 45k-60k",
    progressLabel: "3 active offers to review",
    progress: 10,
    status: "quotes",
    pro: "3 Offers",
    category: "Networking",
    postedAt: "Posted today",
    views: 17,
    description: [
      "Need a network professional to deploy a small office LAN with router setup, switch rack organization, structured cabling, and Wi-Fi access point coverage.",
      "The office is moving into a new floor and needs a clean, documented installation with room for future expansion.",
    ],
    skills: ["Structured Cabling", "Router Setup", "Wi-Fi", "Office IT"],
    attachments: [
      { name: "office-plan.pdf", size: "1.2 MB", type: "file" },
      { name: "rack-room.jpg", size: "980 KB", type: "image" },
    ],
    logistics: {
      budgetLabel: "45,000 - 60,000 XOF",
      scheduleLabel: "Flexible / 2 days",
      locationLabel: "Plateau, Abidjan (Onsite)",
      materials: "Professional must provide",
      propertyType: "Office Space",
      parking: "Building parking available",
    },
    statusSummary: {
      label: "Open for Bids",
      proposals: "3 received",
      views: "17",
      interviews: "0",
    },
    client: {
      name: "John Doe",
      initials: "JD",
      rating: "5.0 (4 reviews)",
      location: "Cote d'Ivoire",
      tasksPosted: "6 (80% Hire Rate)",
      totalSpent: "450,000 XOF+",
      memberSince: "Jan 2024",
    },
    bids: [
      {
        id: "bid-3",
        bidder: "Youssouf IT Services",
        initials: "YS",
        rating: 4.8,
        reviews: 61,
        amount: "52,000 XOF",
        amountType: "Fixed Quote",
        message:
          "We can handle the cabling, switch configuration, and wireless setup in two days with basic documentation and post-install testing included.",
        portfolio: ["Retail network install", "Office rack cleanup"],
        profile: {
          title: "Network Deployment Specialist",
          rate: "95,000 XOF",
          rateLabel: "Project-based pricing",
          jobsCompleted: "70+ Installations",
          responseTime: "~2 Hours",
          availability: "This week",
          backgroundCheck: "Passed",
          about: [
            "I design and deploy small-office networks with an emphasis on stable cabling, clean rack layouts, Wi-Fi coverage, and simple documentation for handoff.",
            "Most of my work is for teams moving into new spaces and needing reliable infrastructure that can scale without a full redesign six months later.",
          ],
          skills: [
            "Structured Cabling",
            "Router Setup",
            "Switch Configuration",
            "Wi-Fi Planning",
            "Rack Organization",
            "Network Documentation",
          ],
          languages: [
            { name: "English", level: "Fluent" },
            { name: "French", level: "Native" },
          ],
          gallery: [
            { title: "Office Rack", label: "Rack cleanup and relabeling" },
            { title: "Access Points", label: "Multi-room wireless rollout" },
            { title: "Patch Panel", label: "Structured cabling termination" },
            { title: "Router Setup", label: "Business gateway install" },
          ],
          reviewsList: [
            {
              id: "ys-review-1",
              reviewer: "Nadia K.",
              initials: "NK",
              date: "March 02, 2025",
              service: "Office LAN Setup",
              ratingLabel: "4.9",
              text: "Youssouf delivered a clean office network with documentation our internal team could actually use. Strong organization and solid follow-through.",
            },
          ],
        },
      },
    ],
    questions: [],
    similarTasks: [
      { id: "sim-6", title: "Warehouse CCTV and network refresh", budget: "Quote", location: "Yopougon" },
      { id: "sim-7", title: "Install access points in coworking floor", budget: "Fixed Price", location: "Plateau" },
    ],
  },
];

export function getStatusMeta(status: TaskStatus) {
  switch (status) {
    case "in-progress":
      return { label: "In Progress", badgeClass: "badgeWarning", progressClass: "progressWarning" };
    case "scheduled":
      return { label: "Scheduled", badgeClass: "badgeSuccess", progressClass: "progressSuccess" };
    default:
      return { label: "Pending Quote Review", badgeClass: "badgeMuted", progressClass: "progressAccent" };
  }
}

export function getTaskById(taskId: string) {
  return clientTasks.find((task) => task.id === taskId);
}

export function getBidById(taskId: string, bidId: string) {
  return getTaskById(taskId)?.bids.find((bid) => bid.id === bidId);
}
