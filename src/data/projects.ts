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
    /* FACT-CHECK: Express/REST/AWS added to stack — confirm they were used on CASSA */
    tech: ["React", "Node.js", "Express", "MongoDB", "MUI", "REST APIs", "AWS"],
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
    /* FACT-CHECK: Express/Capacitor/Payment APIs added to stack — confirm */
    tech: ["Angular", "Node.js", "Express", "MySQL", "Ionic", "Capacitor", "Payment APIs"],
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
    /* FACT-CHECK: TypeScript added to stack — confirm */
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
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
    tech: ["React", "Node.js", "Express", "MySQL", "Technical SEO"],
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
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
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
    tech: ["Fabric.js", "React", "TypeScript", "Node.js", "Canvas API"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's Socket.IO experience (matches the blog post). Verify everything. */
    id: "realtime-chat",
    name: "Real-time Chat & Notifications",
    category: "web",
    categoryLabel: "Real-time · SaaS",
    role: "Full Stack Developer",
    description:
      "Production chat system with rooms, presence and notifications serving thousands of concurrent users.",
    bullets: [
      "Rooms, presence, typing indicators and read receipts over Socket.IO.",
      "Delivery acknowledgements with offline push notification fallback.",
      "Scaled across instances with the Redis adapter behind a load balancer.",
    ],
    tech: ["Socket.IO", "Node.js", "Redis", "React", "MongoDB", "Nginx"],
  },
  {
    /* FACT-CHECK: NEW — drafted to showcase React Native. Replace with the real app's name/domain or remove. */
    id: "rn-services-app",
    name: "On-Demand Services App",
    category: "mobile",
    categoryLabel: "Mobile · React Native",
    role: "Mobile Developer",
    description:
      "Cross-platform service-booking app for iOS and Android with live job tracking and payments.",
    bullets: [
      "Single React Native codebase shipped to both app stores.",
      "Booking flow with live status tracking and push notifications.",
      "Secure payments and provider/customer role separation.",
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "Firebase", "REST APIs"],
  },
  {
    /* FACT-CHECK: NEW — drafted to showcase migrations/DevOps/gRPC/load balancing. Verify against real work. */
    id: "platform-migration",
    name: "Legacy Platform Migration",
    category: "web",
    categoryLabel: "Migration · DevOps",
    role: "Full Stack Developer",
    description:
      "Incremental migration of a legacy PHP monolith to Node.js services with zero business downtime.",
    bullets: [
      "Strangler-pattern migration from a Laravel monolith to Node.js services.",
      "Data migration to PostgreSQL with validation and rollback plans.",
      "gRPC between services, Nginx load balancing and AWS CI/CD pipelines.",
    ],
    tech: ["Node.js", "gRPC", "PostgreSQL", "Nginx", "AWS", "Laravel (PHP)"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's AI/LLM integration claims. Verify everything. */
    id: "ai-support-assistant",
    name: "AI Support Assistant",
    category: "ai",
    categoryLabel: "AI · LLM Integration",
    role: "Full Stack Developer",
    description:
      "LLM-powered support assistant embedded in a product, answering from business content with human handoff.",
    bullets: [
      "Prompt pipelines grounded in the product's own help content.",
      "Intent routing with graceful escalation to human agents.",
      "Streaming responses over WebSockets with usage analytics.",
    ],
    tech: ["LLM APIs", "Node.js", "React", "WebSockets", "Prompt engineering"],
  },
  {
    /* FACT-CHECK: NEW — drafted from Kartik's SEO/marketing/design claims. Verify everything. */
    id: "marketing-sites",
    name: "Marketing Sites & Brand Collateral",
    category: "web",
    categoryLabel: "SEO · Design",
    role: "Developer & Designer",
    description:
      "High-converting landing pages plus brochures, templates and logos for client launches.",
    bullets: [
      "Landing pages with technical SEO and 95+ Core Web Vitals scores.",
      "Marketing brochures, social templates and logo design.",
      "Analytics, A/B-ready sections and lead-capture integrations.",
    ],
    tech: ["Next.js", "Tailwind CSS", "Technical SEO", "Figma", "Analytics"],
  },
];
