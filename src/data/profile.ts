export const PROFILE = {
  name: "Kartik Bosmiya",
  headline: "Software Engineer · End-to-End Product Builder",
  tagline:
    "5+ years building web, mobile and AI-powered products for clients worldwide — from first wireframe to AWS deployment.",
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
  /** FACT-CHECK: stat numbers chosen by Kartik during brainstorming (aggressive set). */
  stats: [
    { value: 30, suffix: "+", label: "Happy clients" },
    { value: 5, suffix: "+", label: "Years experience" },
    { value: 50, suffix: "+", label: "Projects shipped" },
    { value: 20, suffix: "+", label: "Technologies" },
  ],
  /** Formspree form id, e.g. "mqkrbyzw". Empty string = form falls back to mailto. */
  formspreeId: "",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
