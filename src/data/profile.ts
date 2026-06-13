export const PROFILE = {
  name: "Kartik Bosmiya",
  headline: "Software Engineer · End-to-End Product Builder",
  tagline:
    "6+ years building web, mobile and AI-powered products for clients worldwide — from first wireframe to AWS deployment.",
  location: "Ahmedabad, India",
  timezone: "UTC+05:30",
  email: "kartikbosmiya2003@gmail.com",
  phone: "+91 93287 17164",
  phoneHref: "+919328717164",
  linkedin: "https://linkedin.com/in/kartik-bosmiya-1277a8212",
  github: "https://github.com/Kartik123-creator",
  resumeUrl: "/resume.pdf",
  status: "OPEN_TO_WORK",
  responseSla: "≤ 24 hours",
  /** Formspree form id, e.g. "mqkrbyzw". Empty string = form falls back to mailto. */
  formspreeId: "",
} as const;

/**
 * Live stats. Each value = base + whole years elapsed since `since` × perYear,
 * so the counters grow over real time without a redeploy.
 * FACT-CHECK: base numbers chosen by Kartik (aggressive set); growth rates are estimates.
 */
export interface StatSpec {
  base: number;
  perYear: number;
  since: string; // ISO date the base value was true
  suffix: string;
  label: string;
}

export const STATS: StatSpec[] = [
  { base: 30, perYear: 8, since: "2026-06-01", suffix: "+", label: "Happy clients" },
  { base: 6, perYear: 1, since: "2026-06-01", suffix: "+", label: "Years experience" },
  { base: 80, perYear: 12, since: "2026-06-01", suffix: "+", label: "Projects shipped" },
  { base: 20, perYear: 2, since: "2026-06-01", suffix: "+", label: "Technologies" },
];

export function statTarget(s: StatSpec, now: Date = new Date()): number {
  const years = (now.getTime() - new Date(s.since).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return s.base + Math.max(0, Math.floor(years * s.perYear));
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
