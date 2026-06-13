/* FACT-CHECK: service items restate the claims in skills.ts/experience.ts — confirm them there. */

export interface Service {
  id: string;
  title: string;
  intro: string;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Applications",
    intro: "Complete products from schema to UI — built to be maintained, not just launched.",
    items: [
      "Next.js, React and Angular frontends",
      "Node.js and Laravel REST APIs",
      "MongoDB, MySQL & PostgreSQL schema design",
      "Auth, roles and multi-tenant data models",
    ],
  },
  {
    id: "erp",
    title: "ERP & Enterprise Systems",
    intro: "Systems businesses run on daily — built module by module without stopping operations.",
    items: [
      "Inventory, HRMS and payroll modules",
      "Role-based access and pricing",
      "Approval workflows and audit trails",
      "Incremental e-commerce → ERP evolution",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & Marketplaces",
    intro: "From single storefronts to multi-vendor platforms with real payment flows.",
    items: [
      "Multi-vendor catalogues and commission splits",
      "Klarna, Clearpay, Visa & Mastercard checkout",
      "Search, filters, caching and pagination at scale",
      "Order tracking and notification flows",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    intro: "Cross-platform apps shipped to both stores from one codebase.",
    items: [
      "Ionic + Capacitor and React Native",
      "Push notifications and offline handling",
      "Payments and role-based app modes",
      "Store submission and release management",
    ],
  },
  {
    id: "realtime",
    title: "Real-time Features",
    intro: "Chat, presence and live updates that survive real users and flaky networks.",
    items: [
      "Socket.IO rooms, presence and read receipts",
      "Delivery guarantees with offline fallback",
      "Redis-backed scaling across instances",
      "Live dashboards and notifications",
    ],
  },
  {
    id: "ai",
    title: "AI & LLM Integration",
    intro: "AI features grounded in your own content — honest about limits, fast in feel.",
    items: [
      "LLM API integration and prompt pipelines",
      "Streaming responses with human handoff",
      "Retrieval from your own docs and data",
      "AI-assisted workflows and automation",
    ],
  },
  {
    id: "devops",
    title: "DevOps, Cloud & Migrations",
    intro: "Deployment pipelines and platform moves with rollback plans, not heroics.",
    items: [
      "AWS deployments with CI/CD",
      "Nginx load balancing and gRPC services",
      "Zero-downtime platform & data migrations",
      "Cron jobs, monitoring and alerting",
    ],
  },
  {
    id: "seo-design",
    title: "SEO, Performance & Design",
    intro: "The surrounding work that makes a product findable, fast and presentable.",
    items: [
      "Technical SEO and structured data",
      "Core Web Vitals and code-splitting",
      "Landing pages and lead-capture funnels",
      "Marketing brochures, templates and logos",
    ],
  },
];

export const ENGAGEMENT_MODES = [
  {
    id: "fulltime",
    tag: "PRIMARY",
    title: "Full-time role",
    desc: "Product engineering, end to end — remote or hybrid. Available now, replies within 24 hours.",
  },
  {
    id: "contract",
    tag: "PROJECT",
    title: "Contract build",
    desc: "A defined feature or product built start to finish, with a written hand-off your team can run with.",
  },
  {
    id: "consult",
    tag: "ADVICE",
    title: "Consult & audit",
    desc: "Performance, SEO or architecture review with a prioritized, actionable report — not a slide deck.",
  },
] as const;
