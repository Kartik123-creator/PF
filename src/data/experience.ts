export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: "tecsense",
    company: "Tec Sense Innovations Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Nov 2023 – Present",
    location: "Ahmedabad, India",
    type: "Full-time",
    bullets: [
      "Developed scalable applications using React.js, Next.js and Angular.",
      "Built backend services with Laravel and Node.js REST APIs; real-time features with Socket.IO.",
      "Designed optimized MongoDB and PostgreSQL schemas for high-performance systems.", // FACT-CHECK: PostgreSQL added per Kartik's request
      "Integrated AI capabilities (LLM APIs, AI-assisted features) into production products.", // FACT-CHECK
      "Deployed on AWS with CI/CD pipelines; exposure to gRPC services and load balancing.", // FACT-CHECK: gRPC / load balancers added per Kartik's request
      "Improved performance via lazy loading, code splitting and caching.",
      "Collaborated in cross-functional Agile teams; ran code reviews.",
    ],
  },
  {
    id: "websture",
    company: "Websture Digital Agency",
    role: "Software Developer",
    period: "Jul 2020 – Jan 2022",
    location: "Ahmedabad, India",
    type: "Full-time",
    bullets: [
      "Built responsive SPAs using Angular and React for agency clients.",
      "Worked directly with clients to gather requirements and ship iterations — end-to-end ownership.",
      "Implemented form validation, CRUD flows and API integrations.",
      "Used Git for version control and team collaboration.",
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
