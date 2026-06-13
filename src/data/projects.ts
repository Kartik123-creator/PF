export type ProjectCategory = "web" | "mobile" | "ai";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  bullets: string[];
  /** Short, distinctive feature/module chips shown on the card. */
  highlights: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "cassa",
    name: "CASSA Group ERP",
    category: "web",
    categoryLabel: "ERP · E-commerce",
    description:
      "Transformed a basic e-commerce site into a full ERP platform with inventory, HR and payroll.",
    bullets: [
      "Converted basic e-commerce into a complete ERP system.",
      "Implemented role-based pricing and inventory tracking.",
      "Developed HRMS and payroll modules.",
    ],
    highlights: ["Role-based pricing engine", "HRMS + payroll modules", "Rebuilt without stopping the business"],
    featured: true,
  },
  {
    id: "booksphere",
    name: "Booksphere",
    category: "mobile",
    categoryLabel: "SaaS · Booking · UK Market",
    description:
      "Multi-role appointment booking platform for the UK market with payments and native mobile apps.",
    bullets: [
      "Built a multi-role booking system (Customer, Vendor, Admin).",
      "Integrated Klarna, Clearpay, Visa and Mastercard payments.",
      "Shipped Android & iOS apps using Ionic.",
    ],
    highlights: ["Klarna & Clearpay checkout", "Three-role booking flows", "iOS + Android from one codebase"],
    featured: true,
  },
  {
    id: "ai-gallery",
    name: "AI Image Gallery",
    category: "ai",
    categoryLabel: "AI · Image Generation",
    description:
      "AI-powered image search and generation platform with multiple art styles.",
    bullets: [
      "Created AI-powered image search and generation flows.",
      "Multiple styles (anime, 3D, realistic, cartoon) with dark/light mode.",
      "Image preview and multi-resolution downloads.",
    ],
    highlights: ["Generate in 4 art styles", "Multi-resolution downloads", "Search by prompt or image"],
    featured: true,
  },
  {
    /* FACT-CHECK: drafted from Kartik's brief mention — verify description and features */
    id: "tax-natives",
    name: "Tax Natives",
    category: "web",
    categoryLabel: "Marketplace · FinTech",
    description:
      "International tax-advice marketplace connecting clients with vetted tax advisers across jurisdictions.",
    bullets: [
      "Built adviser directory, enquiry and matching flows.",
      "Implemented content-driven pages with SEO-friendly rendering.",
      "Integrated forms, notifications and admin tooling.",
    ],
    highlights: ["Adviser-client matching", "Multi-jurisdiction directory", "SEO-first content engine"],
  },
  {
    /* FACT-CHECK: drafted from Kartik's brief mention — verify description and features */
    id: "duped",
    name: "Duped.au",
    category: "web",
    categoryLabel: "E-commerce · Product Discovery",
    description:
      "Product-discovery platform for the Australian market that helps shoppers find affordable alternatives.",
    bullets: [
      "Built product catalogue, search and comparison views.",
      "Optimized listing performance with caching and pagination.",
      "Responsive UI across mobile and desktop.",
    ],
    highlights: ["Find-the-dupe comparison views", "Fast cached catalogues", "Built for mobile-first shoppers"],
  },
  {
    /* FACT-CHECK: drafted to showcase Fabric.js skills — verify against the real project */
    id: "canvas-editor",
    name: "Canvas Design Editor",
    category: "web",
    categoryLabel: "Design Tool · Canvas",
    description:
      "Browser-based design editor for templates, cards and logos with layered editing and export.",
    bullets: [
      "Drag-and-drop canvas with text, image and shape layers.",
      "Template system with custom fonts, colors and alignment guides.",
      "High-resolution PNG export and project save/load.",
    ],
    highlights: ["Photoshop-style layers in the browser", "Template & custom-font system", "Hi-res export"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's Socket.IO experience (matches the blog post). Verify everything. */
    id: "realtime-chat",
    name: "Real-time Chat & Notifications",
    category: "web",
    categoryLabel: "Real-time · SaaS",
    description:
      "Production chat system with rooms, presence and notifications serving thousands of concurrent users.",
    bullets: [
      "Rooms, presence, typing indicators and read receipts.",
      "Delivery acknowledgements with offline push notification fallback.",
      "Scaled across instances behind a load balancer.",
    ],
    highlights: ["Presence & read receipts", "Offline push fallback", "Scales across servers"],
  },
  {
    /* FACT-CHECK: NEW — drafted to showcase React Native. Replace with the real app's name/domain or remove. */
    id: "rn-services-app",
    name: "On-Demand Services App",
    category: "mobile",
    categoryLabel: "Mobile · Cross-platform",
    description:
      "Cross-platform service-booking app for iOS and Android with live job tracking and payments.",
    bullets: [
      "Single codebase shipped to both app stores.",
      "Booking flow with live status tracking and push notifications.",
      "Secure payments and provider/customer role separation.",
    ],
    highlights: ["Live job tracking on a map", "Provider & customer modes", "Store-ready builds"],
  },
  {
    /* FACT-CHECK: NEW — drafted to showcase migrations/DevOps. Verify against real work. */
    id: "platform-migration",
    name: "Legacy Platform Migration",
    category: "web",
    categoryLabel: "Migration · DevOps",
    description:
      "Incremental migration of a legacy monolith to modern services with zero business downtime.",
    bullets: [
      "Strangler-pattern migration from a legacy monolith to Node.js services.",
      "Data migration with validation and rollback plans.",
      "Inter-service communication and load balancing on AWS.",
    ],
    highlights: ["Zero-downtime cutover", "Validated data moves with rollback", "Old & new ran side by side"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's AI/LLM integration claims. Verify everything. */
    id: "ai-support-assistant",
    name: "AI Support Assistant",
    category: "ai",
    categoryLabel: "AI · LLM Integration",
    description:
      "LLM-powered support assistant embedded in a product, answering from business content with human handoff.",
    bullets: [
      "Prompt pipelines grounded in the product's own help content.",
      "Intent routing with graceful escalation to human agents.",
      "Streaming responses with usage analytics.",
    ],
    highlights: ["Answers from your own docs", "Human handoff built in", "Streams replies live"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's SEO/marketing/design claims. Verify everything. */
    id: "marketing-sites",
    name: "Marketing Sites & Brand Collateral",
    category: "web",
    categoryLabel: "SEO · Design",
    description:
      "High-converting landing pages plus brochures, templates and logos for client launches.",
    bullets: [
      "Landing pages with technical SEO baked in.",
      "Marketing brochures, social templates and logo design.",
      "Analytics, A/B-ready sections and lead-capture integrations.",
    ],
    highlights: ["95+ Core Web Vitals scores", "Code + brochures + logos in one hand", "Lead-capture funnels"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's e-commerce breadth. Verify everything. */
    id: "multivendor-commerce",
    name: "Multi-vendor E-commerce Platform",
    category: "web",
    categoryLabel: "E-commerce · Marketplace",
    description:
      "Marketplace where independent vendors run their own storefronts under one checkout.",
    bullets: [
      "Vendor onboarding, product approval and storefront management.",
      "Orders split across vendors with commission accounting.",
      "Customer reviews, coupons and inventory alerts.",
    ],
    highlights: ["One cart, many vendors", "Automatic commission splits", "Vendor self-service dashboard"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's SEO + listings experience. Verify everything. */
    id: "realestate-portal",
    name: "Real Estate Listings Portal",
    category: "web",
    categoryLabel: "Listings · Lead Generation",
    description:
      "Property listings portal built to rank — map search, rich filters and agent lead routing.",
    bullets: [
      "Map-based search with saved filters and alerts.",
      "SEO-indexed listing pages with structured data.",
      "Enquiry routing and lead tracking for agents.",
    ],
    highlights: ["Search on a live map", "Listings built to rank on Google", "Leads routed to the right agent"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's Ionic mobile experience. Verify everything. */
    id: "restaurant-app",
    name: "Restaurant Ordering App",
    category: "mobile",
    categoryLabel: "Mobile · Food Ordering",
    description:
      "Ordering app with live kitchen status — browse, customize, pay and track without calling.",
    bullets: [
      "Menu browsing with item customization and cart.",
      "Order placement with live preparation status.",
      "Push notifications for offers and order updates.",
    ],
    highlights: ["Watch your order being prepared", "Two-tap reorder", "Offer push notifications"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's dashboard/reporting experience. Verify everything. */
    id: "analytics-dashboard",
    name: "Analytics & Reporting Dashboard",
    category: "web",
    categoryLabel: "Dashboards · Reporting",
    description:
      "Business intelligence dashboard turning raw operational data into decisions.",
    bullets: [
      "Role-based dashboards — each team sees its own KPIs.",
      "Drill-down charts from company level to single transaction.",
      "Scheduled exports delivered automatically.",
    ],
    highlights: ["Drill from KPI to transaction", "Scheduled PDF/Excel reports", "Each role sees its own view"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's automation/cron claims. Verify everything. */
    id: "workflow-automation",
    name: "Notification & Workflow Automation",
    category: "ai",
    categoryLabel: "Automation · Integrations",
    description:
      "Automation layer that watches business events and triggers the right message on the right channel.",
    bullets: [
      "Event- and cron-driven workflows for routine business processes.",
      "Multi-channel notifications: email, WhatsApp and in-app.",
      "Retry logic and audit trail for every automated action.",
    ],
    highlights: ["Email + WhatsApp + in-app alerts", "Set-and-forget cron workflows", "Every action audited"],
  },
];
