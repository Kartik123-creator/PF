export interface Service {
  id: string;
  title: string;
  /** One-liner for the home page "What I do" grid. */
  summary: string;
  /** Longer intro for the Services page. */
  intro: string;
  items: string[];
}

/** Single source for both the home page grid and the Services page. */
export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Products — SaaS & E-commerce",
    summary:
      "B2B and B2C web apps, SaaS platforms and e-commerce — from schema to checkout, deployed on AWS with CI/CD.",
    intro: "Complete products from schema to UI — built to be maintained, not just launched.",
    items: [
      "Next.js, React and Angular frontends",
      "Node.js, NestJS and Laravel (PHP) backends with REST APIs",
      "MongoDB, MySQL & PostgreSQL schema design",
      "Klarna, Clearpay and card checkout",
      "Deployed on AWS with CI/CD",
    ],
  },
  {
    id: "erp",
    title: "ERP & Enterprise Systems",
    summary: "ERP systems with inventory, HRMS, payroll and role-based pricing — built around a live business.",
    intro: "Systems businesses run on daily — built module by module without stopping operations.",
    items: [
      "Inventory tracking",
      "Role-based pricing",
      "HRMS and payroll modules",
      "Built on top of a live e-commerce site",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    summary: "Android & iOS apps with React Native.",
    intro: "Cross-platform apps for both stores from one codebase.",
    items: [
      "React Native apps for iOS and Android",
      "In-app payments",
      "Multi-role flows (customer, vendor, admin)",
    ],
  },
  {
    id: "realtime",
    title: "Real-time Features",
    summary: "Live chat, presence, notifications and multiplayer game state with Socket.IO.",
    intro: "Chat, presence and live updates that stay in sync for every user.",
    items: [
      "Socket.IO rooms and presence",
      "Live notifications",
      "Multiplayer game state sync",
      "Redis alongside Socket.IO",
    ],
  },
  {
    id: "ai",
    title: "AI Features",
    summary: "LLM API integration and AI-powered features inside real products — e.g. AI image generation and search.",
    intro: "LLM API integration and AI-powered features inside real products — e.g. AI image generation and search.",
    items: [
      "LLM API integration into product features",
      "AI image generation in multiple art styles",
      "Search by prompt or by image",
      "Multi-resolution downloads",
    ],
  },
];

/** "How I work" — the working agreement, shown on Home and Services. */
export const HOW_I_WORK = [
  {
    id: "scope",
    title: "Written scope & milestones",
    desc: "Before any code: what gets built, in what order, and how we'll both know it's done.",
  },
  {
    id: "demos",
    title: "Weekly demos",
    desc: "Working software every week — you see real progress, not status reports.",
  },
  {
    id: "repo",
    title: "Your repo from day one",
    desc: "Code lives in your repository from the first commit. Nothing held back at hand-off.",
  },
  {
    id: "reply",
    title: "Replies within 24 hours",
    desc: "Questions and change requests get an answer within a working day.",
  },
] as const;

export const ENGAGEMENT_MODES = [
  {
    id: "project",
    tag: "FIXED SCOPE",
    title: "Freelance project",
    desc: "A defined feature or product built start to finish against written milestones, with a hand-off your team can run with.",
  },
  {
    id: "contract",
    tag: "ONGOING",
    title: "Contract developer",
    desc: "Ongoing hours on your product over weeks or months — your repo, your tools, weekly demos.",
  },
  {
    id: "consult",
    tag: "ADVICE",
    title: "Consult & audit",
    desc: "Architecture or code review with a prioritized, actionable report — not a slide deck.",
  },
] as const;
