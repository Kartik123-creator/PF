export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Nuxt.js", "Angular", "Vue.js", "Fabric.js", "Tailwind CSS", "MUI", "Ant Design"],
  },
  {
    label: "Backend",
    items: ["TypeScript", "Node.js", "Express.js", "NestJS", "Laravel (PHP)", "REST APIs", "Socket.IO", "Firebase", "Stripe"],
  },
  {
    label: "Mobile",
    items: ["React Native"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    label: "DevOps & Cloud",
    items: ["AWS", "Docker", "CI/CD pipelines"],
  },
  {
    label: "AI",
    items: ["LLM API integration", "FLUX (image generation)"],
  },
  {
    label: "Blockchain",
    items: ["Web3", "Solidity"],
  },
  {
    label: "Ways of working",
    items: ["Agile/Scrum", "Client handling"],
  },
];
