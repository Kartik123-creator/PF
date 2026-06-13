export interface Experience {
  id: string;
  phase: string;
  role: string;
  period: string;
  focus: string;
  bullets: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: "product-era",
    phase: "Owning products end-to-end",
    role: "Full Stack Developer",
    period: "2023 – Present",
    focus: "ERP systems, booking SaaS, AI-powered platforms — B2B & B2C",
    bullets: [
      "Architecture: designing systems that grow — multi-role access, multi-tenant data models, and module boundaries that survive new requirements.",
      "Data: optimized MongoDB, MySQL and PostgreSQL schemas; indexing, caching and pagination strategies for high-traffic listings.", // FACT-CHECK: PostgreSQL added per Kartik's request
      "Real-time: Socket.IO rooms, presence and delivery guarantees at production scale, with Redis when one server stops being enough.",
      "AI: integrating LLM APIs into real features — prompt pipelines, streaming responses and graceful fallbacks, not just demos.", // FACT-CHECK
      "Infrastructure: AWS deployments with CI/CD pipelines; exposure to gRPC services and Nginx load balancing.", // FACT-CHECK: gRPC / load balancers added per Kartik's request
      "Performance: lazy loading, code splitting, Core Web Vitals and technical SEO baked in from the start.",
    ],
  },
  {
    /* FACT-CHECK: middle phase drafted to present a continuous journey — verify it matches Kartik's 2022–2023 work. */
    id: "specialization-era",
    phase: "Going deep — full-stack & real-time",
    role: "Full Stack Developer",
    period: "2022 – 2023",
    focus: "From building screens to owning the whole stack",
    bullets: [
      "Ownership: moved from frontend-only work to end-to-end features — database design, APIs and deployment included.",
      "Real-time & integrations: first production Socket.IO features, payment gateways and third-party API integrations.",
      "Cloud & AI first steps: early AWS deployments, CI/CD, and the first experiments integrating AI tooling into delivery.",
    ],
  },
  {
    id: "agency-era",
    phase: "Foundations — agency years",
    role: "Software Developer",
    period: "2020 – 2022",
    focus: "Client SPAs across industries — from brief to launch",
    bullets: [
      "Frontend depth: responsive SPAs in Angular and React, pixel-faithful to design while staying maintainable.",
      "Client skills: gathering requirements directly, demoing iterations weekly, and learning that shipping the right thing beats shipping the clever thing.",
      "Fundamentals: form validation, CRUD flows, API integrations and Git collaboration — the muscle memory everything since is built on.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Engineering",
    school: "L.J. University, Ahmedabad",
    period: "2023 – Present",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "L.J. University, Ahmedabad",
    period: "2021 – 2023",
  },
] as const;
