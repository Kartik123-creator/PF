import type { ChatTopic } from "@/lib/matchPrompt";
import { AVAILABILITY, COUNTRIES } from "@/data/profile";
import { ENGAGEMENT_MODES, SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";

/*
 * Every answer here must restate something that's on the site. Lists that already
 * live in data files (projects, services, skills, countries, availability) are
 * derived from them so the bot can't drift from the pages.
 */

const COUNTRY_LIST = `${COUNTRIES.slice(0, -1).join(", ")} and ${COUNTRIES.at(-1)}`;
const skills = (label: string) => SKILL_GROUPS.find((g) => g.label === label)?.items.join(", ") ?? "";

export const CHAT_FALLBACK =
  "Hmm, I don't have that one in my notes. Email kartikbosmiya2003@gmail.com — Kartik personally replies within 24 hours.";

export const CHAT_INTRO =
  "Hi there 👋 I'm Kartik's assistant. Pick a question below or type your own — English, हिन्दी or ગુજરાતી all work. For anything specific, kartikbosmiya2003@gmail.com gets a personal reply within 24 hours.";

export interface ChatPrompt {
  id: string;
  prompt: string;
  answer: string;
}

export const CHAT_TOPICS: ChatTopic[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "namaste", "नमस्ते", "નમસ્તે", "kemcho", "કેમછો"],
    answer:
      "Hello! 👋 I'm here to answer anything about Kartik — his experience, projects, skills, availability. What would you like to know?",
  },
  {
    id: "experience",
    keywords: ["experience", "years", "background", "career", "anubhav", "अनुभव", "અનુભવ"],
    answer:
      "Kartik has been building production software since 2020, full-time throughout, at software agencies (names under NDA): React and Angular SPAs for agency clients (2020–2022), then full-stack with databases, REST APIs, payments, Socket.IO and CI/CD (2022–2023), and since 2023 a Full Stack Developer who built the CASSA Group ERP and the Booksphere booking SaaS.",
  },
  {
    id: "currentrole",
    keywords: ["currently", "role", "current", "company", "job"],
    answer:
      "Since 2023 Kartik has worked full-time as a Full Stack Developer at a software agency (name under NDA). There he built CASSA Group's ERP on top of a live e-commerce site, Booksphere (a UK booking SaaS with React Native apps), and real-time features with Socket.IO and Redis.",
  },
  {
    id: "agencyyears",
    keywords: ["agency", "previous", "first", "started"],
    answer:
      "Kartik's first years (2020–2022, full-time at a software agency under NDA) were responsive React and Angular SPAs for agency clients — gathering requirements directly and demoing progress weekly.",
  },
  {
    id: "projects",
    keywords: ["projects", "portfolio", "work", "built", "showcase", "प्रोजेक्ट", "પ્રોજેક્ટ"],
    answer: `Featured work: ${PROJECTS.map((p) => p.name).join(", ")}. Details on the Projects page!`,
  },
  {
    id: "cassa",
    keywords: ["cassa", "erp", "payroll", "hrms", "inventory"],
    answer:
      "CASSA Group: Kartik turned a live e-commerce site into a full ERP — inventory, role-based pricing, HRMS and payroll — without stopping the business. Stack: React, Node.js, MongoDB and MUI.",
  },
  {
    id: "booksphere",
    keywords: ["booksphere", "booking", "appointment", "klarna", "uk", "thattime"],
    answer:
      "Booksphere is a UK booking SaaS: multi-role system (Customer/Vendor/Admin), Klarna, Clearpay and card payments, plus iOS & Android apps in React Native. Stack: Next.js, React Native, NestJS, PostgreSQL and Redis.",
  },
  {
    id: "poker",
    keywords: ["poker", "game", "games", "gaming", "multiplayer", "cards"],
    answer:
      "Kartik built a real-time multiplayer web poker game: live tables, turn handling, and game state synced across every player with Socket.IO.",
  },
  {
    id: "chat",
    keywords: ["chat", "notifications", "notification", "presence", "rooms", "messaging"],
    answer:
      "Kartik's Real-time Chat & Notifications project: chat rooms, live presence and notifications pushed to users as events happen, built on Socket.IO.",
  },
  {
    id: "aigallery",
    keywords: ["gallery", "image", "generation", "images"],
    answer:
      "The AI Image Gallery is an AI-powered image search & generation platform — four styles (anime, 3D, realistic, cartoon), search by prompt or image, dark/light mode, and multi-resolution downloads.",
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "technologies", "tools", "kaushal", "कौशल", "કૌશલ્ય"],
    answer: `Core stack: React, Node.js and React Native. ${SKILL_GROUPS.map((g) => `${g.label}: ${g.items.join(", ")}.`).join(" ")}`,
  },
  {
    id: "frontend",
    keywords: ["frontend", "react", "nextjs", "angular", "vue", "tailwind", "ui"],
    answer: `Kartik's frontend toolkit: ${skills("Frontend")}.`,
  },
  {
    id: "backend",
    keywords: ["backend", "node", "nestjs", "api", "socket", "typescript", "laravel", "php", "rest", "server"],
    answer: `On the backend Kartik works with ${skills("Backend")} — including payment gateways and real-time features with Socket.IO and Redis.`,
  },
  {
    id: "mobile",
    keywords: ["mobile", "native", "android", "ios", "app"],
    answer: "Kartik builds Android & iOS apps with React Native — Booksphere's apps are one example.",
  },
  {
    id: "services",
    keywords: ["services", "offer", "modes", "engagement", "provide"],
    answer: `Kartik covers ${SERVICES.length} areas end-to-end: ${SERVICES.map((s) => s.title).join("; ")}. Ways to engage: ${ENGAGEMENT_MODES.map((m) => m.title.toLowerCase()).join(", ")}. Full details on the Services page!`,
  },
  {
    id: "ai",
    keywords: ["ai", "llm", "ml", "intelligence", "gpt", "automation"],
    answer:
      "Kartik does LLM API integration and builds AI-powered features inside real products — e.g. the AI Image Gallery: AI image generation in four art styles, search by prompt or image, and multi-resolution downloads.",
  },
  {
    id: "devops",
    keywords: ["devops", "aws", "deploy", "cicd", "cloud", "infrastructure"],
    answer: `DevOps & cloud: ${skills("DevOps & Cloud")}. Kartik deploys web products on AWS with CI/CD pipelines, owning features from code to production.`,
  },
  {
    id: "databases",
    keywords: ["database", "mongodb", "mysql", "postgresql", "postgres", "redis", "sql", "schema"],
    answer: `Kartik designs data models in ${skills("Databases")} — MongoDB for the CASSA ERP, PostgreSQL and Redis for Booksphere.`,
  },
  {
    id: "availability",
    keywords: ["available", "availability", "hire", "hiring", "join", "opportunity", "upalabdh", "उपलब्ध", "ઉપલબ્ધ"],
    answer: AVAILABILITY.chat,
  },
  {
    id: "notice",
    keywords: ["notice", "period", "start", "joining", "when"],
    answer:
      "Start dates depend on scope — send a short brief to kartikbosmiya2003@gmail.com and Kartik will reply within 24 hours with when he can start.",
  },
  {
    id: "remote",
    keywords: ["remote", "hybrid", "onsite", "relocate", "wfh"],
    answer: `Kartik works remotely from Ahmedabad, India (UTC+05:30), with clients in the ${COUNTRY_LIST} — written scope, weekly demos and code in your repo from day one.`,
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "timezone", "kahan", "कहाँ", "ક્યાં"],
    answer: `Kartik is based in Ahmedabad, India (UTC+05:30) and works with clients in the ${COUNTRY_LIST}.`,
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "reach", "linkedin", "github", "sampark", "संपर्क", "સંપર્ક"],
    answer:
      "📧 kartikbosmiya2003@gmail.com · 📞 +91 93287 17164 · LinkedIn: linkedin.com/in/kartik-bosmiya-1277a8212 · GitHub: github.com/Kartik123-creator. Replies within 24 hours.",
  },
  {
    id: "education",
    keywords: ["education", "degree", "university", "college", "study", "shiksha", "शिक्षा", "ભણતર"],
    answer:
      "Kartik holds a Diploma in Computer Engineering (2021–2023) and a Bachelor of Computer Engineering (2023–2025) from L.J. University, Ahmedabad — both completed while working full-time.",
  },
  {
    id: "rates",
    keywords: ["salary", "rate", "rates", "compensation", "ctc", "pay", "pagar", "पगार", "પગાર"],
    answer:
      "Rates depend on scope and how we work together — fixed-scope project, ongoing contract, or consult & audit. Email kartikbosmiya2003@gmail.com with the details and you'll get a straight answer within 24 hours.",
  },
  {
    id: "process",
    keywords: ["process", "workflow", "agile", "scrum", "methodology", "approach"],
    answer:
      "Agile/Scrum, with written scope and milestones before any code, weekly demos of working software, code in your repository from day one, and replies within 24 hours.",
  },
  {
    id: "leadership",
    keywords: ["leadership", "team", "mentor", "ownership", "responsibility"],
    answer:
      "Kartik owns features end-to-end — frontend, backend, database and deployment — and works directly with clients from requirements to weekly demos.",
  },
  {
    id: "clients",
    keywords: ["clients", "client", "international", "communication", "handling", "countries"],
    answer: `Kartik has clients in the ${COUNTRY_LIST}, and has worked directly with clients since his agency years — gathering requirements, demoing progress weekly and shipping what was actually asked for.`,
  },
  {
    id: "quality",
    keywords: ["quality", "testing", "review", "performance", "optimization", "clean"],
    answer:
      "Code quality matters to Kartik: performance optimization (lazy loading, code splitting, caching) and responsive, accessible UIs are standard practice.",
  },
  {
    id: "languages",
    keywords: ["languages", "speak", "english", "hindi", "gujarati", "भाषा", "ભાષા"],
    answer: "Kartik speaks English, Hindi and Gujarati — and ships clean code in all three. 😄",
  },
  {
    id: "hobbies",
    keywords: ["hobbies", "fun", "personal", "interests", "free"],
    answer:
      "Outside work Kartik enjoys exploring new tech and building side projects — this portfolio (with me in it!) is one of them.",
  },
  {
    id: "whyhire",
    keywords: ["why", "should", "best", "different", "unique"],
    answer:
      "Three reasons: (1) end-to-end ownership — UI to AWS, (2) production software shipped since 2020: an ERP, a booking SaaS with mobile apps, real-time systems and AI features, (3) direct client experience, so he communicates like a partner, not a ticket-taker.",
  },
  {
    id: "products",
    keywords: ["b2b", "b2c", "saas", "product", "products", "ecommerce", "consumer"],
    answer:
      "Kartik has shipped both B2B and B2C: an ERP platform (CASSA Group) and a booking SaaS with React Native apps (Booksphere). He's comfortable on either side — enterprise workflows or polished consumer UX.",
  },
  {
    id: "enterprise",
    keywords: ["enterprise", "erp", "hrms", "large", "corporate", "scale"],
    answer:
      "Enterprise work is a Kartik specialty: the CASSA Group ERP (inventory, HRMS, payroll, role-based pricing) is his flagship — built on top of a live e-commerce site.",
  },
  {
    id: "seo",
    keywords: ["seo", "ranking", "google", "vitals", "lighthouse", "search"],
    answer:
      "SEO isn't one of the services Kartik lists. His web work is Next.js and React frontends with Node.js backends — email kartikbosmiya2003@gmail.com to talk through what your project needs.",
  },
  {
    id: "migrations",
    keywords: ["migration", "migrations", "migrate", "modernize", "rewrite", "upgrade"],
    answer:
      "The CASSA ERP is a good example: it was built on top of a live e-commerce site, module by module, so the business kept running the whole time.",
  },
  {
    id: "areyoureal",
    keywords: ["real", "robot", "bot", "human", "alive", "chatgpt"],
    answer:
      "I'm a hand-crafted bot living entirely in your browser — no servers, no API calls, just smart keyword matching. Kartik built me himself. The real Kartik is at kartikbosmiya2003@gmail.com. 🤖",
  },
];

export const CHATBOT_PROMPTS: ChatPrompt[] = [
  { id: "p-exp", prompt: "Experience?", answer: CHAT_TOPICS.find((t) => t.id === "experience")!.answer },
  { id: "p-skills", prompt: "Tech stack?", answer: CHAT_TOPICS.find((t) => t.id === "skills")!.answer },
  { id: "p-projects", prompt: "Projects?", answer: CHAT_TOPICS.find((t) => t.id === "projects")!.answer },
  { id: "p-ai", prompt: "AI work?", answer: CHAT_TOPICS.find((t) => t.id === "ai")!.answer },
  { id: "p-avail", prompt: "Available?", answer: CHAT_TOPICS.find((t) => t.id === "availability")!.answer },
  { id: "p-contact", prompt: "Contact?", answer: CHAT_TOPICS.find((t) => t.id === "contact")!.answer },
];
