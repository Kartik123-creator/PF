import type { ChatTopic } from "@/lib/matchPrompt";

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
      "Kartik has 5+ years of experience building web, mobile and AI-powered products. Currently a Full Stack Developer at Tec Sense Innovations (since Nov 2023); before that he built SPAs for agency clients at Websture Digital (2020–2022).",
  },
  {
    id: "tecsense",
    keywords: ["tecsense", "tec", "sense", "current", "company", "job"],
    answer:
      "At Tec Sense Innovations (Nov 2023 – present, Ahmedabad) Kartik builds scalable apps with React, Next.js and Angular, backend services in Laravel and Node.js, real-time features with Socket.IO, and deploys on AWS with CI/CD.",
  },
  {
    id: "websture",
    keywords: ["websture", "agency", "previous", "first"],
    answer:
      "At Websture Digital Agency (Jul 2020 – Jan 2022) Kartik built responsive SPAs in Angular and React and worked directly with clients to gather requirements — that's where his client-handling skills come from.",
  },
  {
    id: "projects",
    keywords: ["projects", "portfolio", "work", "built", "showcase", "प्रोजेक्ट", "પ્રોજેક્ટ"],
    answer:
      "Highlights: CASSA Group ERP (e-commerce → full ERP), THAT TIME (UK booking SaaS with payments + mobile apps), an AI Image Gallery, Tax Natives (tax-advice marketplace), Duped.au (product discovery), a Fabric.js canvas design editor, real-time chat at scale, a React Native services app, an AI support assistant, a legacy platform migration and more. Details on the Projects page!",
  },
  {
    id: "cassa",
    keywords: ["cassa", "erp", "payroll", "hrms", "inventory"],
    answer:
      "CASSA Group: Kartik converted a basic e-commerce site into a full ERP — role-based pricing, inventory tracking, HRMS and payroll modules. Stack: React, Node.js, MongoDB, MUI.",
  },
  {
    id: "thattime",
    keywords: ["thattime", "booking", "appointment", "klarna", "uk"],
    answer:
      "THAT TIME is a UK-market appointment booking SaaS: multi-role system (Customer/Vendor/Admin), Klarna/Clearpay/Visa/Mastercard payments, plus Android & iOS apps built with Ionic.",
  },
  {
    id: "aigallery",
    keywords: ["gallery", "image", "generation", "images"],
    answer:
      "The AI Image Gallery is an AI-powered image search & generation platform — multiple styles (anime, 3D, realistic, cartoon), dark/light mode, and multi-resolution downloads. Built with Next.js and Tailwind.",
  },
  {
    id: "taxnatives",
    keywords: ["taxnatives", "tax", "natives", "advisers"],
    answer:
      "Tax Natives is an international tax-advice marketplace connecting clients with vetted advisers across jurisdictions — Kartik built directory, enquiry and matching flows.",
  },
  {
    id: "duped",
    keywords: ["duped", "australia", "australian", "dupes"],
    answer:
      "Duped.au is a product-discovery platform for the Australian market helping shoppers find affordable alternatives — catalogue, search and comparison views built for speed.",
  },
  {
    id: "fabric",
    keywords: ["fabric", "canvas", "editor", "design", "templates"],
    answer:
      "Kartik built a browser-based canvas design editor on Fabric.js — drag-and-drop layers, template system, custom fonts and high-resolution export. Deep canvas/graphics experience.",
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "technologies", "tools", "kaushal", "कौशल", "કૌશલ્ય"],
    answer:
      "Frontend: Next.js, React, Angular, Vue, Fabric.js, Tailwind. Backend: Node.js, Laravel, REST, Socket.IO, gRPC. Mobile: Ionic, Capacitor, React Native. Plus AWS, CI/CD, MongoDB, MySQL, PostgreSQL and AI integrations.",
  },
  {
    id: "frontend",
    keywords: ["frontend", "react", "nextjs", "angular", "vue", "tailwind", "ui"],
    answer:
      "Kartik's frontend toolkit: Next.js, React, Angular and Vue, with Tailwind CSS, MUI and Ant Design — plus specialty canvas work with Fabric.js. Pixel-perfect, responsive and fast.",
  },
  {
    id: "backend",
    keywords: ["backend", "node", "laravel", "api", "socket", "php", "server"],
    answer:
      "On the backend Kartik works with Node.js and Laravel (PHP), designs REST APIs, builds real-time systems with Socket.IO and has exposure to gRPC services.",
  },
  {
    id: "mobile",
    keywords: ["mobile", "ionic", "capacitor", "android", "ios", "app"],
    answer:
      "Kartik ships mobile apps with Ionic + Capacitor (THAT TIME is live on Android & iOS) and also works with React Native.",
  },
  {
    id: "ai",
    keywords: ["ai", "llm", "ml", "intelligence", "gpt", "automation"],
    answer:
      "Kartik integrates AI into real products: an AI image search & generation platform, an LLM-powered support assistant, and prompt pipelines in client apps. His daily toolkit includes Claude, ChatGPT and Copilot — AI is a core part of how he works.",
  },
  {
    id: "devops",
    keywords: ["devops", "aws", "deploy", "cicd", "cloud", "grpc", "balancer", "infrastructure"],
    answer:
      "DevOps: AWS deployments, CI/CD pipelines, cron jobs, load balancing and performance tuning. He owns features from code to production.",
  },
  {
    id: "databases",
    keywords: ["database", "mongodb", "mysql", "postgresql", "postgres", "sql", "schema"],
    answer:
      "Kartik designs schemas in MongoDB, MySQL and PostgreSQL — including optimized schemas for high-performance, real-time systems.",
  },
  {
    id: "availability",
    keywords: ["available", "availability", "hire", "hiring", "join", "opportunity", "upalabdh", "उपलब्ध", "ઉપલબ્ધ"],
    answer:
      "Yes — Kartik is open to work! Full-time roles, remote or hybrid. Email kartikbosmiya2003@gmail.com and you'll hear back within 24 hours.",
  },
  {
    id: "notice",
    keywords: ["notice", "period", "start", "joining", "when"],
    answer:
      "Notice period and start dates are best discussed directly — drop a line at kartikbosmiya2003@gmail.com and Kartik will reply within 24 hours.",
  },
  {
    id: "remote",
    keywords: ["remote", "hybrid", "onsite", "relocate", "wfh"],
    answer:
      "Kartik is open to remote and hybrid roles and has years of experience working with international clients across time zones.",
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "timezone", "kahan", "कहाँ", "ક્યાં"],
    answer:
      "Kartik is based in Ahmedabad, India (UTC+05:30) — and comfortably overlaps with EU and US-East working hours for remote teams.",
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
      "Kartik holds a Diploma in Computer Engineering and is completing his Bachelor of Computer Engineering at L.J. University, Ahmedabad.",
  },
  {
    id: "rates",
    keywords: ["salary", "rate", "rates", "compensation", "ctc", "pay", "pagar", "पगार", "પગાર"],
    answer:
      "Compensation depends on the role and scope — that conversation is best had directly. Email kartikbosmiya2003@gmail.com with the details and you'll get a straight answer within 24 hours.",
  },
  {
    id: "process",
    keywords: ["process", "workflow", "agile", "scrum", "methodology", "approach"],
    answer:
      "Kartik works the full agile cycle: requirement analysis → design → build → test → deploy. Sprints, code reviews, Git/Jira and clear communication throughout.",
  },
  {
    id: "leadership",
    keywords: ["leadership", "team", "mentor", "ownership", "responsibility"],
    answer:
      "Kartik brings a strong ownership mindset — he's individually owned single-page applications end-to-end and collaborates in cross-functional Agile teams, running code reviews along the way.",
  },
  {
    id: "clients",
    keywords: ["clients", "client", "international", "communication", "handling"],
    answer:
      "Client handling is a core strength: years of working directly with international clients — gathering requirements, demoing progress and shipping what was actually asked for.",
  },
  {
    id: "quality",
    keywords: ["quality", "testing", "review", "performance", "optimization", "clean"],
    answer:
      "Code quality matters to Kartik: code reviews, performance optimization (lazy loading, code splitting, caching) and pixel-perfect, accessible UIs are standard practice.",
  },
  {
    id: "languages",
    keywords: ["languages", "speak", "english", "hindi", "gujarati", "भाषा", "ભાષા"],
    answer:
      "Kartik speaks English, Hindi and Gujarati — and ships clean code in all three. 😄",
  },
  {
    id: "hobbies",
    keywords: ["hobbies", "fun", "personal", "interests", "free"],
    answer:
      "Outside work Kartik enjoys exploring new tech and AI tools, and building side projects — this portfolio (with me in it!) is one of them.",
  },
  {
    id: "whyhire",
    keywords: ["why", "should", "best", "different", "unique"],
    answer:
      "Three reasons: (1) end-to-end ownership — UI to AWS, (2) 5+ years of shipped products across web, mobile and AI, (3) direct client experience, so he communicates like a partner, not a ticket-taker.",
  },
  {
    id: "products",
    keywords: ["b2b", "b2c", "saas", "product", "products", "ecommerce", "consumer"],
    answer:
      "Kartik has shipped both B2B and B2C: SaaS booking platforms, e-commerce stores, marketplaces and consumer apps. He's comfortable on either side — enterprise workflows or polished consumer UX.",
  },
  {
    id: "enterprise",
    keywords: ["enterprise", "erp", "hrms", "large", "corporate", "scale"],
    answer:
      "Enterprise work is a Kartik specialty: the CASSA Group ERP (inventory, HRMS, payroll, role-based pricing) is his flagship — large data models, multi-role access and systems businesses run on daily.",
  },
  {
    id: "seo",
    keywords: ["seo", "ranking", "google", "vitals", "lighthouse", "search"],
    answer:
      "Kartik handles technical SEO as part of every build: Core Web Vitals, semantic markup, structured data, lazy loading and code splitting. This portfolio itself targets 95+ Lighthouse scores.",
  },
  {
    id: "migrations",
    keywords: ["migration", "migrations", "migrate", "modernize", "rewrite", "upgrade"],
    answer:
      "Migrations are in his toolkit: platform modernizations, framework upgrades and data migrations — done incrementally so the business keeps running (the CASSA e-commerce → ERP evolution is a good example).",
  },
  {
    id: "branding",
    keywords: ["branding", "brochure", "brochures", "logo", "logos", "marketing", "graphics"],
    answer:
      "Beyond engineering, Kartik delivers design assets too: marketing brochures, logos, templates and cards — plus he's built canvas design tools with Fabric.js, so he understands design from both sides.",
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
