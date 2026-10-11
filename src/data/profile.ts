export const PROFILE = {
  name: "Kartik Bosmiya",
  headline: "Full-Stack SaaS & ERP Developer",
  tagline:
    "Building production software since 2020 — web, mobile and AI-powered products, from first wireframe to AWS deployment.",
  location: "Ahmedabad, India",
  timezone: "UTC+05:30",
  email: "kartikbosmiya2003@gmail.com",
  phone: "+91 93287 17164",
  phoneHref: "+919328717164",
  linkedin: "https://linkedin.com/in/kartik-bosmiya-1277a8212",
  github: "https://github.com/Kartik123-creator",
  /** Upwork profile URL. Empty string = the link is hidden everywhere. */
  upwork: "" as string,
  resumeUrl: "/resume",
  responseSla: "≤ 24 hours",
  /** Formspree form id, e.g. "mqkrbyzw". Empty string = form falls back to mailto. */
  formspreeId: "",
} as const;

/** Countries Kartik's clients are in. */
export const COUNTRIES = ["UK", "US", "UAE", "Australia", "India"] as const;

/**
 * Availability — switch this ONE value to change the hero pill, CTAs, resume,
 * contact card, OG image, meta description and chatbot answer together.
 */
export type AvailabilityMode = "freelance" | "fulltime";
export const AVAILABILITY_MODE: AvailabilityMode = "freelance";

interface AvailabilityCopy {
  /** Status text (resume, contact, OG image, meta description). */
  label: string;
  /** Short version for the hero pill — fits one line on a 360px phone. */
  pill: string;
  /** One-liner under the closing CTA. */
  cta: string;
  /** "Now" card on the home page. */
  nowTitle: string;
  nowDesc: string;
  /** Chatbot answer to "are you available?". */
  chat: string;
}

const AVAILABILITY_COPY = {
  freelance: {
    label: "Available for freelance & contract projects",
    pill: "Available for freelance work",
    cta: "Available for freelance & contract projects. I reply within 24 hours.",
    nowTitle: "Freelance & contract projects",
    nowDesc: "Taking on fixed-scope builds and ongoing contract work — replies within 24 hours.",
    chat: "Yes — Kartik is available for freelance & contract projects. Email kartikbosmiya2003@gmail.com with a short brief and you'll hear back within 24 hours.",
  },
  fulltime: {
    label: "Open to full-time remote or hybrid roles",
    pill: "Open to full-time roles",
    cta: "Open to full-time roles — remote or hybrid. I reply within 24 hours.",
    nowTitle: "Full-time roles",
    nowDesc: "Open to remote or hybrid software engineering roles — replies within 24 hours.",
    chat: "Yes — Kartik is open to full-time roles, remote or hybrid. Email kartikbosmiya2003@gmail.com and you'll hear back within 24 hours.",
  },
} satisfies Record<AvailabilityMode, AvailabilityCopy>;

export const AVAILABILITY: AvailabilityCopy = AVAILABILITY_COPY[AVAILABILITY_MODE];

/**
 * Stats row. Static values only — every number here must be one Kartik can back up.
 * Numeric values get a client-side count-up; the final value is always in the server HTML.
 */
export interface Stat {
  value: number | string;
  suffix?: string;
  label: string;
  /** Long text values (e.g. a tech list) render smaller and never wrap. */
  compact?: boolean;
}

export const STATS: Stat[] = [
  { value: "2020", label: "In production since" },
  { value: "React · Node · RN", label: "Core stack", compact: true },
  { value: COUNTRIES.length, label: "Countries served" },
  { value: "< 24h", label: "Reply time" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
