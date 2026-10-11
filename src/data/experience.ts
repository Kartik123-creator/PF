export interface Experience {
  id: string;
  company: string;
  employmentType: "Full-time" | "Contract" | "Freelance";
  phase: string;
  role: string;
  period: string;
  focus: string;
  bullets: string[];
}

/** Employer names are under NDA — shown as a generic description. */
const CONFIDENTIAL_AGENCY = "Confidential (NDA) — software agency";

export const EXPERIENCE: Experience[] = [
  {
    id: "product-era",
    company: CONFIDENTIAL_AGENCY,
    employmentType: "Full-time",
    phase: "Owning products end-to-end",
    role: "Full Stack Developer",
    period: "2023 – Present",
    focus: "ERP systems, booking SaaS, AI-powered platforms — B2B & B2C",
    bullets: [
      "ERP: built CASSA Group's ERP — inventory, role-based pricing, HRMS and payroll — on top of a live e-commerce site.",
      "SaaS: built Booksphere, a UK booking SaaS with Klarna, Clearpay and card payments, plus React Native apps.",
      "Real-time: shipped real-time features with Socket.IO and Redis.",
    ],
  },
  {
    id: "specialization-era",
    company: CONFIDENTIAL_AGENCY,
    employmentType: "Full-time",
    phase: "Going deep — full-stack & real-time",
    role: "Full Stack Developer",
    period: "2022 – 2023",
    focus: "From building screens to owning the whole stack",
    bullets: [
      "Full-stack: moved from front-end to full-stack — database design, REST APIs and payment gateways.",
      "Real-time & cloud: first production Socket.IO features, cloud deployments and CI/CD.",
    ],
  },
  {
    id: "agency-era",
    company: CONFIDENTIAL_AGENCY,
    employmentType: "Full-time",
    phase: "Foundations — agency years",
    role: "Software Developer",
    period: "2020 – 2022",
    focus: "Client SPAs across industries — from brief to launch",
    bullets: [
      "Frontend: responsive React and Angular SPAs for agency clients.",
      "Client work: gathered requirements directly and demoed progress weekly.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Engineering",
    school: "L.J. University, Ahmedabad",
    period: "2023 – 2025",
    note: "Completed while working full-time",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "L.J. University, Ahmedabad",
    period: "2021 – 2023",
    note: "Completed while working full-time",
  },
] as const;
