export type ProjectCategory = "web" | "mobile" | "ai";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  role: string;
  description: string;
  bullets: string[];
  tech: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "cassa",
    name: "CASSA Group ERP",
    category: "web",
    categoryLabel: "ERP · E-commerce",
    role: "Full Stack Developer",
    description:
      "Transformed a basic e-commerce site into a full ERP platform with inventory, HR and payroll.",
    bullets: [
      "Converted basic e-commerce into a complete ERP system.",
      "Implemented role-based pricing and inventory tracking.",
      "Developed HRMS and payroll modules.",
    ],
    tech: ["React", "Node.js", "MongoDB", "MUI"],
    featured: true,
  },
  {
    id: "thattime",
    name: "THAT TIME",
    category: "mobile",
    categoryLabel: "SaaS · Booking · UK Market",
    role: "Full Stack & Mobile Developer",
    description:
      "Multi-role appointment booking SaaS for the UK market with payments and native mobile apps.",
    bullets: [
      "Built a multi-role booking system (Customer, Vendor, Admin).",
      "Integrated Klarna, Clearpay, Visa and Mastercard payments.",
      "Shipped Android & iOS apps using Ionic.",
    ],
    tech: ["Angular", "Node.js", "Ionic", "MySQL"],
    featured: true,
  },
  {
    id: "ai-gallery",
    name: "AI Image Gallery",
    category: "ai",
    categoryLabel: "AI · Image Generation",
    role: "Frontend Developer",
    description:
      "AI-powered image search and generation platform with multiple art styles.",
    bullets: [
      "Created AI-powered image search and generation flows.",
      "Multiple styles (anime, 3D, realistic, cartoon) with dark/light mode.",
      "Image preview and multi-resolution downloads.",
    ],
    tech: ["Next.js", "Tailwind CSS", "REST API"],
    featured: true,
  },
  {
    /* FACT-CHECK: drafted from Kartik's brief mention — verify description, role and tech */
    id: "tax-natives",
    name: "Tax Natives",
    category: "web",
    categoryLabel: "Marketplace · FinTech",
    role: "Full Stack Developer",
    description:
      "International tax-advice marketplace connecting clients with vetted tax advisers across jurisdictions.",
    bullets: [
      "Built adviser directory, enquiry and matching flows.",
      "Implemented content-driven pages with SEO-friendly rendering.",
      "Integrated forms, notifications and admin tooling.",
    ],
    tech: ["React", "Node.js", "MySQL"],
  },
  {
    /* FACT-CHECK: drafted from Kartik's brief mention — verify description, role and tech */
    id: "duped",
    name: "Duped.au",
    category: "web",
    categoryLabel: "E-commerce · Product Discovery",
    role: "Full Stack Developer",
    description:
      "Product-discovery platform for the Australian market that helps shoppers find affordable alternatives.",
    bullets: [
      "Built product catalogue, search and comparison views.",
      "Optimized listing performance with caching and pagination.",
      "Responsive UI across mobile and desktop.",
    ],
    tech: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    /* FACT-CHECK: drafted to showcase Fabric.js skills — verify against the real project */
    id: "canvas-editor",
    name: "Canvas Design Editor",
    category: "web",
    categoryLabel: "Design Tool · Canvas",
    role: "Frontend Developer",
    description:
      "Browser-based design editor for templates, cards and logos with layered editing and export.",
    bullets: [
      "Drag-and-drop canvas with text, image and shape layers built on Fabric.js.",
      "Template system with custom fonts, colors and alignment guides.",
      "High-resolution PNG export and project save/load.",
    ],
    tech: ["Fabric.js", "React", "Node.js"],
  },
];
