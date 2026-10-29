export type ProjectCategory = "web" | "mobile" | "ai";

export interface ProjectLink {
  label: string; // e.g. "Live site", "App Store", "Google Play"
  href: string;
}

/** Glyph drawn faintly on the generated cover (see ProjectCard). */
export type CoverGlyph = "grid" | "calendar" | "cards" | "chat" | "sparkle";

export interface ProjectCover {
  glyph: CoverGlyph;
  /** Hue offset (degrees) applied to the theme's primary colour — gives each project its own colour pair. */
  hue: number;
}

export interface Project {
  id: string;
  /** Real project/client name — shown only when `clientNamed` is true. */
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  bullets: string[];
  /** Short, distinctive feature/module chips shown on the card. */
  highlights: string[];
  /** Featured projects sit at the top of /projects; the rest go in the collapsed "More projects" section. */
  featured?: boolean;
  /** Also shown in the home page "Featured projects" grid. */
  onHome?: boolean;
  /** Kartik's role on the project. */
  role: string;
  /** Tech stack chips. Omitted/empty = no stack row. */
  stack?: string[];
  /** One real, measurable outcome. Omitted = no outcome line. */
  outcome?: string;
  /** Live site / store links. Omitted/empty = no links row. */
  links?: ProjectLink[];
  /** Screenshot paths under /public, e.g. "/img/projects/cassa-1.png". Empty = generated gradient cover. */
  images: string[];
  cover: ProjectCover;
  /** May the client be named publicly? If false, `genericName` is shown instead of `name`. */
  clientNamed: boolean;
  genericName?: string;
}

/** The name safe to show publicly. */
export function projectTitle(p: Project): string {
  return p.clientNamed ? p.name : (p.genericName ?? `${p.categoryLabel.split(" · ")[0]} project`);
}

const ROLE = "Full-stack developer";

export const PROJECTS: Project[] = [
  {
    id: "cassa",
    name: "CASSA Group ERP",
    category: "web",
    categoryLabel: "ERP · E-commerce",
    description:
      "Transformed a basic e-commerce site into a full ERP platform with inventory, HR and payroll.",
    bullets: [
      "Converted basic e-commerce into a complete ERP system.",
      "Implemented role-based pricing and inventory tracking.",
      "Developed HRMS and payroll modules.",
    ],
    highlights: ["Role-based pricing engine", "HRMS + payroll modules", "Rebuilt without stopping the business"],
    featured: true,
    onHome: true,
    role: ROLE,
    stack: ["React", "Node.js", "MongoDB", "MUI"],
    // TODO: outcome — one real, measurable number
    // TODO: links — live link, if any
    cover: { glyph: "grid", hue: 0 },
    images: [], // TODO: add screenshots
    clientNamed: true,
  },
  {
    id: "booksphere",
    name: "Booksphere",
    category: "mobile",
    categoryLabel: "SaaS · Booking · UK Market",
    description:
      "Multi-role appointment booking platform for the UK market with payments and native mobile apps.",
    bullets: [
      "Built a multi-role booking system (Customer, Vendor, Admin).",
      "Integrated Klarna, Clearpay, Visa and Mastercard payments.",
      "Shipped Android & iOS apps in React Native.",
    ],
    highlights: ["Klarna & Clearpay checkout", "Three-role booking flows", "iOS + Android apps in React Native"],
    featured: true,
    onHome: true,
    role: ROLE,
    stack: ["Next.js", "React Native", "NestJS", "PostgreSQL", "Redis"],
    // TODO: outcome — one real, measurable number
    // TODO: links — App Store / Google Play / live site, if any
    cover: { glyph: "calendar", hue: 70 },
    images: [], // TODO: add screenshots
    clientNamed: true,
  },
  {
    id: "poker",
    name: "Real-time Multiplayer Poker",
    category: "web",
    categoryLabel: "Real-time · Gaming",
    description:
      "Real-time multiplayer web poker game — live tables, turn handling and game state synced across players.",
    bullets: [
      "Live tables that players join and play in real time.",
      "Turn handling for every player at the table.",
      "Game state synced across all players with Socket.IO.",
    ],
    highlights: ["Live multiplayer tables", "Turn-by-turn game flow", "State synced for every player"],
    featured: true,
    onHome: true,
    role: ROLE,
    stack: ["Socket.IO"], // TODO: rest of the stack
    // TODO: outcome, links
    cover: { glyph: "cards", hue: 140 },
    images: [], // TODO: add screenshots
    clientNamed: true,
  },
  {
    id: "realtime-chat",
    name: "Real-time Chat & Notifications",
    category: "web",
    categoryLabel: "Real-time · SaaS",
    description: "Real-time chat with rooms, presence and live notifications, built on Socket.IO.",
    bullets: [
      "Chat rooms with live presence.",
      "Live notifications pushed to users as events happen.",
    ],
    highlights: ["Rooms & presence", "Live notifications", "Built on Socket.IO"],
    featured: true,
    role: ROLE,
    stack: ["Socket.IO"], // TODO: rest of the stack
    // TODO: outcome, links
    cover: { glyph: "chat", hue: 210 },
    images: [], // TODO: add screenshots
    clientNamed: true,
  },
  {
    id: "ai-gallery",
    name: "AI Image Gallery",
    category: "ai",
    categoryLabel: "AI · Image Generation",
    description: "AI-powered image search and generation platform with multiple art styles.",
    bullets: [
      "Created AI-powered image search and generation flows.",
      "Multiple styles (anime, 3D, realistic, cartoon) with dark/light mode.",
      "Image preview and multi-resolution downloads.",
    ],
    highlights: ["Generate in 4 art styles", "Multi-resolution downloads", "Search by prompt or image"],
    featured: true,
    onHome: true,
    role: ROLE,
    stack: ["FLUX"], // TODO: rest of the stack
    // TODO: outcome, links
    cover: { glyph: "sparkle", hue: 280 },
    images: [], // TODO: add screenshots
    clientNamed: true,
  },
];
