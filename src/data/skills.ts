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
    items: ["TypeScript", "Node.js", "NestJS", "Laravel (PHP)", "REST APIs", "Socket.IO"],
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
    items: ["AWS", "CI/CD pipelines"],
  },
  {
    label: "AI",
    items: ["LLM API integration"],
  },
  {
    label: "Ways of working",
    items: ["Agile/Scrum", "Client handling"],
  },
];
