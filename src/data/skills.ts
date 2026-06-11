export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Angular", "Vue.js", "Fabric.js", "Tailwind CSS", "MUI", "Ant Design"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Laravel (PHP)", "REST APIs", "Socket.IO", "gRPC"], // FACT-CHECK: gRPC added per Kartik's request
  },
  {
    label: "Mobile",
    items: ["Ionic", "Capacitor", "React Native"], // FACT-CHECK: React Native added per Kartik's request
  },
  {
    label: "AI & Automation",
    items: ["LLM API integration", "AI-assisted workflows", "Prompt engineering"], // FACT-CHECK
  },
  {
    label: "DevOps & Cloud",
    items: ["AWS", "CI/CD pipelines", "Load balancers", "Cron jobs"], // FACT-CHECK: load balancers added per Kartik's request
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL"], // FACT-CHECK: PostgreSQL added per Kartik's request
  },
  {
    label: "SEO & Marketing",
    items: ["Technical SEO", "Core Web Vitals", "Marketing brochures", "Landing pages"], // FACT-CHECK: per Kartik's request
  },
  {
    label: "Delivery & Practices",
    items: ["B2B & B2C products", "Enterprise systems", "Platform migrations", "Agile/Scrum", "Client handling"], // FACT-CHECK: per Kartik's request
  },
];
