# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2023 Bootstrap portfolio with a recruiter-facing Next.js site featuring a 4-theme/12-palette switcher, a fully client-side scripted multilingual chatbot ("Ask Kartik"), an MDX blog, and updated 2026 resume content.

**Architecture:** Next.js 15 App Router, all routes statically generated. All facts live in typed `src/data/*` files; pages render from data. Theme = `data-theme` + `data-palette` attributes on `<html>` driving CSS variables; Tailwind v4 utilities reference the variables. Chatbot is a pure scoring function over keyword-indexed topics — no API, no secrets, no server code.

**Tech Stack:** Next.js ^15.5, React 19, TypeScript, Tailwind CSS v4, next-mdx-remote + gray-matter + rehype-highlight (blog), lucide-react (icons), Vitest (engine tests), Formspree (contact), Vercel (deploy).

**Spec:** `docs/superpowers/specs/2026-06-12-portfolio-redesign-design.md`

**FACT-CHECK markers:** Content drafted beyond the resume (Tax Natives, Duped.au, Fabric editor, stat numbers, blog posts) is marked `FACT-CHECK` in code comments. Task 17 collects them for user review. Do not remove the markers during implementation.

---

## File Structure

```
D:\Desktop\Work\PF\
  legacy/                      # old site parked here in Task 1, deleted in Task 16
  content/blog/                # MDX posts (Task 13)
  public/img/profile.jpg       # migrated photo (Task 16)
  public/resume.pdf            # user's resume (Task 16)
  src/
    app/
      layout.tsx  page.tsx  globals.css  not-found.tsx
      opengraph-image.tsx  sitemap.ts  robots.ts
      about/page.tsx  projects/page.tsx  contact/page.tsx
      blog/page.tsx  blog/[slug]/page.tsx
    components/
      Navbar.tsx  Footer.tsx  ThemeSwitcher.tsx  AskKartik.tsx
      StatCounter.tsx  ProjectCard.tsx  TimelineItem.tsx
      SkillGrid.tsx  BlogCard.tsx  SectionHeading.tsx  ContactForm.tsx
    data/
      profile.ts  experience.ts  projects.ts  skills.ts  chatbot.ts  themes.ts
    lib/
      matchPrompt.ts  blog.ts
  tests/
    matchPrompt.test.ts  chatbot-data.test.ts
```

---

### Task 1: Park the old site in `legacy/`

**Files:**
- Move: `index.html` → `legacy/index.html`, `assets/` → `legacy/assets/`

- [ ] **Step 1: Move old site files**

```bash
cd "D:\Desktop\Work\PF"
mkdir legacy
git mv index.html legacy/index.html
git mv assets legacy/assets
```

- [ ] **Step 2: Verify and commit**

Run: `git status --short`
Expected: only renames (`R`) listed.

```bash
git commit -m "chore: park legacy site in legacy/ before Next.js rebuild"
```

---

### Task 2: Scaffold the Next.js project manually

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore` (modify), `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "kartik-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "highlight.js": "^11.10.0",
    "lucide-react": "^0.469.0",
    "next": "^15.5.4",
    "next-mdx-remote": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "rehype-highlight": "^7.0.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "legacy"]
}
```

- [ ] **Step 3: Write `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Append Next.js entries to `.gitignore`**

Append (create the file if missing):

```
# next.js
/node_modules
/.next/
/out/
next-env.d.ts
*.tsbuildinfo
.vercel
.superpowers/
```

- [ ] **Step 6: Write minimal `src/app/globals.css`** (full theme tokens come in Task 3)

```css
@import "tailwindcss";

:root {
  --paper: #f6eee3;
  --paper-2: #fffdf9;
  --ink: #2a1a14;
  --ink-mute: #6b5448;
  --primary: #1a7a4a;
  --primary-ink: #ffffff;
  --accent-2: #1a7a4a;
  --hairline: #2a1a141f;
  --radius: 0.75rem;
}

body {
  background: var(--paper);
  color: var(--ink);
}
```

- [ ] **Step 7: Write minimal `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kartik Bosmiya — Software Engineer",
  description: "Software Engineer · End-to-End Product Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="paper" data-palette="cream" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Write minimal `src/app/page.tsx`**

```tsx
export default function Home() {
  return <main className="p-10">Kartik Bosmiya — rebuild in progress</main>;
}
```

- [ ] **Step 9: Install and verify build**

```bash
cd "D:\Desktop\Work\PF"
npm install
npm run build
```

Expected: `npm run build` finishes with “✓ Compiled successfully” and a static route table including `/`.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore src
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 project"
```

---

### Task 3: Theme tokens (4 themes × 3 palettes) + theme registry + pre-paint script + switcher

**Files:**
- Create: `src/data/themes.ts`, `src/components/ThemeSwitcher.tsx`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: Write `src/data/themes.ts`**

```ts
export interface Palette {
  id: string;
  label: string;
  swatch: string; // shown as the picker dot
}

export interface Theme {
  id: string;
  label: string;
  palettes: Palette[];
}

export const THEMES: Theme[] = [
  {
    id: "paper",
    label: "Paper",
    palettes: [
      { id: "cream", label: "Cream", swatch: "#1a7a4a" },
      { id: "sage", label: "Sage", swatch: "#4f5b3f" },
      { id: "rose", label: "Rose", swatch: "#8d3b5f" },
    ],
  },
  {
    id: "dark",
    label: "Dark",
    palettes: [
      { id: "teal", label: "Teal", swatch: "#5eead4" },
      { id: "violet", label: "Violet", swatch: "#a78bfa" },
      { id: "amber", label: "Amber", swatch: "#fbbf24" },
    ],
  },
  {
    id: "gradient",
    label: "Gradient",
    palettes: [
      { id: "violetpink", label: "Violet/Pink", swatch: "#ec4899" },
      { id: "bluecyan", label: "Blue/Cyan", swatch: "#22d3ee" },
      { id: "orangerose", label: "Orange/Rose", swatch: "#fb923c" },
    ],
  },
  {
    id: "swiss",
    label: "Swiss",
    palettes: [
      { id: "orange", label: "Orange", swatch: "#f97316" },
      { id: "blue", label: "Blue", swatch: "#2563eb" },
      { id: "red", label: "Red", swatch: "#dc2626" },
    ],
  },
];

export const DEFAULT_THEME = "paper";
export const DEFAULT_PALETTE = "cream";
```

- [ ] **Step 2: Replace `src/app/globals.css` with the full token system**

```css
@import "tailwindcss";

@theme inline {
  --color-paper: var(--paper);
  --color-paper-2: var(--paper-2);
  --color-ink: var(--ink);
  --color-ink-mute: var(--ink-mute);
  --color-primary: var(--primary);
  --color-primary-ink: var(--primary-ink);
  --color-accent-2: var(--accent-2);
  --color-hairline: var(--hairline);
  --font-heading: var(--font-heading);
}

/* ---------- PAPER: serif headings, hairlines, warm surfaces ---------- */
:root,
[data-theme="paper"][data-palette="cream"] {
  --paper: #f6eee3;
  --paper-2: #fffdf9;
  --ink: #2a1a14;
  --ink-mute: #6b5448;
  --primary: #1a7a4a;
  --primary-ink: #ffffff;
  --accent-2: #1a7a4a;
  --hairline: #2a1a141f;
  --radius: 0.75rem;
  --font-heading: var(--font-lora);
}

[data-theme="paper"][data-palette="sage"] {
  --paper: #eef1e7;
  --paper-2: #fbfcf8;
  --ink: #1a2010;
  --ink-mute: #4f5b3f;
  --primary: #54712c;
  --primary-ink: #ffffff;
  --accent-2: #54712c;
  --hairline: #1a20101a;
  --radius: 0.75rem;
  --font-heading: var(--font-lora);
}

[data-theme="paper"][data-palette="rose"] {
  --paper: #f1eaee;
  --paper-2: #fdfafc;
  --ink: #200815;
  --ink-mute: #5c3d4d;
  --primary: #8d3b5f;
  --primary-ink: #ffffff;
  --accent-2: #8d3b5f;
  --hairline: #2008151a;
  --radius: 0.75rem;
  --font-heading: var(--font-lora);
}

/* ---------- DARK: slate surfaces, mono details ---------- */
[data-theme="dark"][data-palette="teal"] {
  --paper: #0f172a;
  --paper-2: #1e293b;
  --ink: #f1f5f9;
  --ink-mute: #94a3b8;
  --primary: #5eead4;
  --primary-ink: #0f172a;
  --accent-2: #5eead4;
  --hairline: #334155;
  --radius: 0.75rem;
  --font-heading: var(--font-inter);
}

[data-theme="dark"][data-palette="violet"] {
  --paper: #13111c;
  --paper-2: #201c2e;
  --ink: #ede9fe;
  --ink-mute: #a094c4;
  --primary: #a78bfa;
  --primary-ink: #13111c;
  --accent-2: #a78bfa;
  --hairline: #353046;
  --radius: 0.75rem;
  --font-heading: var(--font-inter);
}

[data-theme="dark"][data-palette="amber"] {
  --paper: #1a1612;
  --paper-2: #29231c;
  --ink: #faf3e8;
  --ink-mute: #b3a48e;
  --primary: #fbbf24;
  --primary-ink: #1a1612;
  --accent-2: #fbbf24;
  --hairline: #463d30;
  --radius: 0.75rem;
  --font-heading: var(--font-inter);
}

/* ---------- GRADIENT: dark canvas, glass cards, two-color accents ---------- */
[data-theme="gradient"][data-palette="violetpink"] {
  --paper: #0c0a1d;
  --paper-2: #ffffff0d;
  --ink: #ede9fe;
  --ink-mute: #c4b5fd;
  --primary: #a78bfa;
  --primary-ink: #ffffff;
  --accent-2: #ec4899;
  --hairline: #ffffff21;
  --radius: 1rem;
  --font-heading: var(--font-inter);
}

[data-theme="gradient"][data-palette="bluecyan"] {
  --paper: #0a1120;
  --paper-2: #ffffff0d;
  --ink: #e0f2fe;
  --ink-mute: #93c5fd;
  --primary: #60a5fa;
  --primary-ink: #ffffff;
  --accent-2: #22d3ee;
  --hairline: #ffffff21;
  --radius: 1rem;
  --font-heading: var(--font-inter);
}

[data-theme="gradient"][data-palette="orangerose"] {
  --paper: #1c0f0a;
  --paper-2: #ffffff0d;
  --ink: #ffedd5;
  --ink-mute: #fdba74;
  --primary: #fb923c;
  --primary-ink: #ffffff;
  --accent-2: #f43f5e;
  --hairline: #ffffff21;
  --radius: 1rem;
  --font-heading: var(--font-inter);
}

/* ---------- SWISS: white ground, square corners, single accent ---------- */
[data-theme="swiss"][data-palette="orange"] {
  --paper: #fafafa;
  --paper-2: #ffffff;
  --ink: #0a0a0a;
  --ink-mute: #525252;
  --primary: #f97316;
  --primary-ink: #ffffff;
  --accent-2: #f97316;
  --hairline: #d4d4d4;
  --radius: 0;
  --font-heading: var(--font-inter);
}

[data-theme="swiss"][data-palette="blue"] {
  --paper: #fafafa;
  --paper-2: #ffffff;
  --ink: #0a0a0a;
  --ink-mute: #525252;
  --primary: #2563eb;
  --primary-ink: #ffffff;
  --accent-2: #2563eb;
  --hairline: #d4d4d4;
  --radius: 0;
  --font-heading: var(--font-inter);
}

[data-theme="swiss"][data-palette="red"] {
  --paper: #fafafa;
  --paper-2: #ffffff;
  --ink: #0a0a0a;
  --ink-mute: #525252;
  --primary: #dc2626;
  --primary-ink: #ffffff;
  --accent-2: #dc2626;
  --hairline: #d4d4d4;
  --radius: 0;
  --font-heading: var(--font-inter);
}

/* ---------- base ---------- */
body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-inter), system-ui, sans-serif;
  transition: background-color 200ms ease, color 200ms ease;
}

h1, h2, h3 {
  font-family: var(--font-heading), Georgia, serif;
}

[data-theme="swiss"] h1,
[data-theme="swiss"] h2,
[data-theme="swiss"] h3 {
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* shared card treatment — themes reshape it via the variables */
.card {
  background: var(--paper-2);
  border: 1px solid var(--hairline);
  border-radius: var(--radius);
}

[data-theme="gradient"] .card {
  backdrop-filter: blur(10px);
}

/* gradient text helper (accent → accent-2) */
.text-gradient {
  background: linear-gradient(90deg, var(--primary), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.mono-label {
  font-family: var(--font-jbmono), monospace;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
}

/* tech marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

/* chat typing dots */
@keyframes bounce-dot {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-4px); opacity: 1; }
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--primary);
  display: inline-block;
  animation: bounce-dot 0.9s ease-in-out infinite;
}
```

- [ ] **Step 3: Add fonts and the pre-paint script to `src/app/layout.tsx`**

Replace the file with:

```tsx
import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Kartik Bosmiya — Software Engineer",
  description:
    "Software Engineer · End-to-End Product Builder. 5+ years building web, mobile and AI products.",
};

const themeInit = `(function(){try{var V={paper:["cream","sage","rose"],dark:["teal","violet","amber"],gradient:["violetpink","bluecyan","orangerose"],swiss:["orange","blue","red"]};var t=localStorage.getItem("kb-theme"),p=localStorage.getItem("kb-palette");if(!V[t]){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"paper";p=null}if(V[t].indexOf(p)<0){p=V[t][0]}var d=document.documentElement;d.dataset.theme=t;d.dataset.palette=p}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="paper"
      data-palette="cream"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} ${jbmono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Write `src/components/ThemeSwitcher.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Palette as PaletteIcon } from "lucide-react";
import { THEMES, DEFAULT_THEME, DEFAULT_PALETTE } from "@/data/themes";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = document.documentElement;
    setTheme(d.dataset.theme ?? DEFAULT_THEME);
    setPalette(d.dataset.palette ?? DEFAULT_PALETTE);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function apply(themeId: string, paletteId: string) {
    const d = document.documentElement;
    d.dataset.theme = themeId;
    d.dataset.palette = paletteId;
    localStorage.setItem("kb-theme", themeId);
    localStorage.setItem("kb-palette", paletteId);
    setTheme(themeId);
    setPalette(paletteId);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Switch theme"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-ink-mute hover:text-primary hover:border-primary transition-colors"
      >
        <PaletteIcon size={14} />
        <span className="mono-label">{theme}</span>
      </button>

      {open && (
        <div className="card absolute right-0 top-full z-50 mt-2 w-56 p-3 shadow-xl">
          {THEMES.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-1.5">
              <button
                type="button"
                onClick={() => apply(t.id, t.palettes[0].id)}
                className={`mono-label transition-colors ${
                  theme === t.id ? "text-primary" : "text-ink-mute hover:text-ink"
                }`}
              >
                {t.label}
              </button>
              <div className="flex gap-1.5">
                {t.palettes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`${t.label} ${p.label}`}
                    onClick={() => apply(t.id, p.id)}
                    className="h-4 w-4 rounded-full border"
                    style={{
                      backgroundColor: p.swatch,
                      borderColor:
                        theme === t.id && palette === p.id ? "var(--ink)" : "var(--hairline)",
                      outline:
                        theme === t.id && palette === p.id ? "2px solid var(--primary)" : "none",
                      outlineOffset: "1px",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: compiles green. (ThemeSwitcher is not yet mounted — that happens with the Navbar in Task 4.)

- [ ] **Step 6: Commit**

```bash
git add src/data/themes.ts src/components/ThemeSwitcher.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat: 4-theme x 3-palette token system with pre-paint script and switcher"
```

---

### Task 4: Profile data, Navbar, Footer, layout wiring

**Files:**
- Create: `src/data/profile.ts`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write `src/data/profile.ts`**

```ts
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
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 2: Write `src/components/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/profile";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="mono-label font-bold text-ink hover:text-primary transition-colors">
          KB<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mono-label rounded-full px-3 py-1.5 transition-colors ${
                  active ? "text-primary" : "text-ink-mute hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write `src/components/Footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold">{PROFILE.name}</p>
          <p className="mono-label mt-1 text-ink-mute">
            {PROFILE.location} · {PROFILE.timezone}
          </p>
        </div>
        <div className="flex items-center gap-4 text-ink-mute">
          <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a aria-label="Email" href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
        <p className="mono-label text-ink-mute">© {new Date().getFullYear()} · built with Next.js</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Mount Navbar/Footer in `src/app/layout.tsx`**

Change only the `<body>` line:

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
```

```tsx
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
```

- [ ] **Step 5: Verify in dev**

Run: `npm run build`
Expected: green build. Then `npm run dev`, open http://localhost:3000 — navbar with links + working theme switcher (cycle a few palettes; colors change instantly and persist on refresh).

- [ ] **Step 6: Commit**

```bash
git add src/data/profile.ts src/components/Navbar.tsx src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: profile data, navbar with theme switcher, footer"
```

---

### Task 5: Experience, projects, skills data

**Files:**
- Create: `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`

- [ ] **Step 1: Write `src/data/experience.ts`**

```ts
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
```

- [ ] **Step 2: Write `src/data/projects.ts`**

```ts
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
```

- [ ] **Step 3: Write `src/data/skills.ts`**

```ts
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
```

- [ ] **Step 4: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: no errors.

```bash
git add src/data/experience.ts src/data/projects.ts src/data/skills.ts
git commit -m "feat: experience, projects and skills data from 2026 resume"
```

---

### Task 6: Chatbot matching engine (TDD)

**Files:**
- Create: `vitest.config.ts`, `tests/matchPrompt.test.ts`, `src/lib/matchPrompt.ts`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Write the failing tests `tests/matchPrompt.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { matchPrompt, type ChatTopic } from "@/lib/matchPrompt";

const FALLBACK = "fallback-answer";

const topics: ChatTopic[] = [
  { id: "experience", keywords: ["experience", "years", "anubhav", "अनुभव", "અનુભવ"], answer: "exp-answer" },
  { id: "skills", keywords: ["skills", "stack", "tech"], answer: "skills-answer" },
  { id: "contact", keywords: ["contact", "email", "sampark", "संपर्क", "સંપર્ક"], answer: "contact-answer" },
];

describe("matchPrompt", () => {
  it("returns fallback for empty input", () => {
    expect(matchPrompt("", topics, FALLBACK)).toBe(FALLBACK);
    expect(matchPrompt("   ", topics, FALLBACK)).toBe(FALLBACK);
  });

  it("returns fallback when nothing matches", () => {
    expect(matchPrompt("zzz qqq", topics, FALLBACK)).toBe(FALLBACK);
  });

  it("matches an exact keyword token", () => {
    expect(matchPrompt("What is his experience?", topics, FALLBACK)).toBe("exp-answer");
  });

  it("is case-insensitive and ignores punctuation", () => {
    expect(matchPrompt("SKILLS!!!", topics, FALLBACK)).toBe("skills-answer");
  });

  it("scores multiple exact hits higher than a single hit", () => {
    // "skills" (1 hit) vs "experience"+"years" (2 hits) → experience wins
    expect(matchPrompt("skills experience years", topics, FALLBACK)).toBe("exp-answer");
  });

  it("falls back to substring matching only when no exact token hits", () => {
    // "emails" is not an exact token match for "email", substring pass catches it
    expect(matchPrompt("emails?", topics, FALLBACK)).toBe("contact-answer");
  });

  it("matches Hindi and Gujarati keywords", () => {
    expect(matchPrompt("आपका अनुभव कितना है", topics, FALLBACK)).toBe("exp-answer");
    expect(matchPrompt("સંપર્ક કેવી રીતે કરવો", topics, FALLBACK)).toBe("contact-answer");
  });

  it("breaks ties by topic order", () => {
    const tied: ChatTopic[] = [
      { id: "a", keywords: ["shared"], answer: "first" },
      { id: "b", keywords: ["shared"], answer: "second" },
    ];
    expect(matchPrompt("shared", tied, FALLBACK)).toBe("first");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run`
Expected: FAIL — cannot resolve `@/lib/matchPrompt`.

- [ ] **Step 4: Write `src/lib/matchPrompt.ts`**

```ts
export interface ChatTopic {
  id: string;
  keywords: string[];
  answer: string;
}

const SPLIT_RE = /[\s,.!?'"()\/\-_:;।]+/;

/**
 * Scores topics against the input: exact token match = +2 per keyword.
 * If no exact hits at all, falls back to substring matching (+1, keywords ≥ 4 chars).
 * Highest score wins; ties resolve to the earliest topic. No match → fallback.
 */
export function matchPrompt(input: string, topics: ChatTopic[], fallback: string): string {
  const text = input.toLowerCase().trim();
  if (!text) return fallback;

  const tokens = new Set(text.split(SPLIT_RE).filter(Boolean));
  const scores = new Map<string, number>();

  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (tokens.has(kw.toLowerCase())) score += 2;
    }
    if (score > 0) scores.set(topic.id, score);
  }

  if (scores.size === 0) {
    for (const topic of topics) {
      let score = 0;
      for (const kw of topic.keywords) {
        const k = kw.toLowerCase();
        if (k.length >= 4 && text.includes(k)) score += 1;
      }
      if (score > 0) scores.set(topic.id, score);
    }
  }

  let bestId: string | null = null;
  let bestScore = 0;
  for (const topic of topics) {
    const s = scores.get(topic.id) ?? 0;
    if (s > bestScore) {
      bestId = topic.id;
      bestScore = s;
    }
  }

  if (!bestId) return fallback;
  return topics.find((t) => t.id === bestId)!.answer;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run`
Expected: all 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts tests/matchPrompt.test.ts src/lib/matchPrompt.ts
git commit -m "feat: chatbot keyword-scoring engine with multilingual support (TDD)"
```

---

### Task 7: Chatbot data — 30+ topics, chips, fallback

**Files:**
- Create: `src/data/chatbot.ts`, `tests/chatbot-data.test.ts`

- [ ] **Step 1: Write `src/data/chatbot.ts`**

Note: first keyword of every topic must stay **unique across topics** — the smoke test depends on it. English + Hindi (Devanagari & transliterated) + Gujarati keywords.

```ts
import type { ChatTopic } from "@/lib/matchPrompt";

export const CHAT_FALLBACK =
  "Hmm, I don't have that one in my notes. Email kartikbosmiya2003@gmail.com — Kartik personally replies within 24 hours.";

export const CHAT_INTRO =
  "Hi there 👋 I'm Kartik's assistant. Pick a question below or type your own — English, हिन्दी or ગુજરાતી all work. For anything specific, kartikbosmiya2003@gmail.com gets a personal reply within 24 hours.";

export interface ChatPrompt {
  id: string;
  prompt: string;
  answer: string;
}

export const CHAT_TOPICS: ChatTopic[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "namaste", "नमस्ते", "નમસ્તે", "kemcho", "કેમછો"],
    answer:
      "Hello! 👋 I'm here to answer anything about Kartik — his experience, projects, skills, availability. What would you like to know?",
  },
  {
    id: "experience",
    keywords: ["experience", "years", "background", "career", "anubhav", "अनुभव", "અનુભવ"],
    answer:
      "Kartik has 5+ years of experience building web, mobile and AI-powered products. Currently a Full Stack Developer at Tec Sense Innovations (since Nov 2023); before that he built SPAs for agency clients at Websture Digital (2020–2022).",
  },
  {
    id: "tecsense",
    keywords: ["tecsense", "tec", "sense", "current", "company", "job"],
    answer:
      "At Tec Sense Innovations (Nov 2023 – present, Ahmedabad) Kartik builds scalable apps with React, Next.js and Angular, backend services in Laravel and Node.js, real-time features with Socket.IO, and deploys on AWS with CI/CD.",
  },
  {
    id: "websture",
    keywords: ["websture", "agency", "previous", "first"],
    answer:
      "At Websture Digital Agency (Jul 2020 – Jan 2022) Kartik built responsive SPAs in Angular and React and worked directly with clients to gather requirements — that's where his client-handling skills come from.",
  },
  {
    id: "projects",
    keywords: ["projects", "portfolio", "work", "built", "showcase", "प्रोजेक्ट", "પ્રોજેક્ટ"],
    answer:
      "Highlights: CASSA Group ERP (e-commerce → full ERP), THAT TIME (UK booking SaaS with payments + mobile apps), an AI Image Gallery, Tax Natives (tax-advice marketplace), Duped.au (product discovery) and a Fabric.js canvas design editor. Details on the Projects page!",
  },
  {
    id: "cassa",
    keywords: ["cassa", "erp", "payroll", "hrms", "inventory"],
    answer:
      "CASSA Group: Kartik converted a basic e-commerce site into a full ERP — role-based pricing, inventory tracking, HRMS and payroll modules. Stack: React, Node.js, MongoDB, MUI.",
  },
  {
    id: "thattime",
    keywords: ["thattime", "booking", "appointment", "klarna", "uk"],
    answer:
      "THAT TIME is a UK-market appointment booking SaaS: multi-role system (Customer/Vendor/Admin), Klarna/Clearpay/Visa/Mastercard payments, plus Android & iOS apps built with Ionic.",
  },
  {
    id: "aigallery",
    keywords: ["gallery", "image", "generation", "images"],
    answer:
      "The AI Image Gallery is an AI-powered image search & generation platform — multiple styles (anime, 3D, realistic, cartoon), dark/light mode, and multi-resolution downloads. Built with Next.js and Tailwind.",
  },
  {
    id: "taxnatives",
    keywords: ["taxnatives", "tax", "natives", "advisers"],
    answer:
      "Tax Natives is an international tax-advice marketplace connecting clients with vetted advisers across jurisdictions — Kartik built directory, enquiry and matching flows.",
  },
  {
    id: "duped",
    keywords: ["duped", "australia", "australian", "dupes"],
    answer:
      "Duped.au is a product-discovery platform for the Australian market helping shoppers find affordable alternatives — catalogue, search and comparison views built for speed.",
  },
  {
    id: "fabric",
    keywords: ["fabric", "canvas", "editor", "design", "templates"],
    answer:
      "Kartik built a browser-based canvas design editor on Fabric.js — drag-and-drop layers, template system, custom fonts and high-resolution export. Deep canvas/graphics experience.",
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "technologies", "tools", "kaushal", "कौशल", "કૌશલ્ય"],
    answer:
      "Frontend: Next.js, React, Angular, Vue, Fabric.js, Tailwind. Backend: Node.js, Laravel, REST, Socket.IO, gRPC. Mobile: Ionic, Capacitor, React Native. Plus AWS, CI/CD, MongoDB, MySQL, PostgreSQL and AI integrations.",
  },
  {
    id: "frontend",
    keywords: ["frontend", "react", "nextjs", "angular", "vue", "tailwind", "ui"],
    answer:
      "Kartik's frontend toolkit: Next.js, React, Angular and Vue, with Tailwind CSS, MUI and Ant Design — plus specialty canvas work with Fabric.js. Pixel-perfect, responsive and fast.",
  },
  {
    id: "backend",
    keywords: ["backend", "node", "laravel", "api", "socket", "php", "server"],
    answer:
      "On the backend Kartik works with Node.js and Laravel (PHP), designs REST APIs, builds real-time systems with Socket.IO and has exposure to gRPC services.",
  },
  {
    id: "mobile",
    keywords: ["mobile", "ionic", "capacitor", "android", "ios", "app"],
    answer:
      "Kartik ships mobile apps with Ionic + Capacitor (THAT TIME is live on Android & iOS) and also works with React Native.",
  },
  {
    id: "ai",
    keywords: ["ai", "llm", "ml", "intelligence", "gpt", "automation"],
    answer:
      "Kartik integrates AI into real products: an AI image search & generation platform, LLM API integrations and AI-assisted workflows. He builds with AI tooling daily — it's a core part of how he works.",
  },
  {
    id: "devops",
    keywords: ["devops", "aws", "deploy", "cicd", "cloud", "grpc", "balancer", "infrastructure"],
    answer:
      "DevOps: AWS deployments, CI/CD pipelines, cron jobs, load balancing and performance tuning. He owns features from code to production.",
  },
  {
    id: "databases",
    keywords: ["database", "mongodb", "mysql", "postgresql", "postgres", "sql", "schema"],
    answer:
      "Kartik designs schemas in MongoDB, MySQL and PostgreSQL — including optimized schemas for high-performance, real-time systems.",
  },
  {
    id: "availability",
    keywords: ["available", "availability", "hire", "hiring", "join", "opportunity", "upalabdh", "उपलब्ध", "ઉપલબ્ધ"],
    answer:
      "Yes — Kartik is open to work! Full-time roles, remote or hybrid. Email kartikbosmiya2003@gmail.com and you'll hear back within 24 hours.",
  },
  {
    id: "notice",
    keywords: ["notice", "period", "start", "joining", "when"],
    answer:
      "Notice period and start dates are best discussed directly — drop a line at kartikbosmiya2003@gmail.com and Kartik will reply within 24 hours.",
  },
  {
    id: "remote",
    keywords: ["remote", "hybrid", "onsite", "relocate", "wfh"],
    answer:
      "Kartik is open to remote and hybrid roles and has years of experience working with international clients across time zones.",
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "timezone", "kahan", "कहाँ", "ક્યાં"],
    answer:
      "Kartik is based in Ahmedabad, India (UTC+05:30) — and comfortably overlaps with EU and US-East working hours for remote teams.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "reach", "linkedin", "github", "sampark", "संपर्क", "સંપર્ક"],
    answer:
      "📧 kartikbosmiya2003@gmail.com · 📞 +91 93287 17164 · LinkedIn: linkedin.com/in/kartik-bosmiya-1277a8212 · GitHub: github.com/Kartik123-creator. Replies within 24 hours.",
  },
  {
    id: "education",
    keywords: ["education", "degree", "university", "college", "study", "shiksha", "शिक्षा", "ભણતર"],
    answer:
      "Kartik holds a Diploma in Computer Engineering and is completing his Bachelor of Computer Engineering at L.J. University, Ahmedabad.",
  },
  {
    id: "rates",
    keywords: ["salary", "rate", "rates", "compensation", "ctc", "pay", "pagar", "पगार", "પગાર"],
    answer:
      "Compensation depends on the role and scope — that conversation is best had directly. Email kartikbosmiya2003@gmail.com with the details and you'll get a straight answer within 24 hours.",
  },
  {
    id: "process",
    keywords: ["process", "workflow", "agile", "scrum", "methodology", "approach"],
    answer:
      "Kartik works the full agile cycle: requirement analysis → design → build → test → deploy. Sprints, code reviews, Git/Jira and clear communication throughout.",
  },
  {
    id: "leadership",
    keywords: ["leadership", "team", "mentor", "ownership", "responsibility"],
    answer:
      "Kartik brings a strong ownership mindset — he's individually owned single-page applications end-to-end and collaborates in cross-functional Agile teams, running code reviews along the way.",
  },
  {
    id: "clients",
    keywords: ["clients", "client", "international", "communication", "handling"],
    answer:
      "Client handling is a core strength: years of working directly with international clients — gathering requirements, demoing progress and shipping what was actually asked for.",
  },
  {
    id: "quality",
    keywords: ["quality", "testing", "review", "performance", "optimization", "clean"],
    answer:
      "Code quality matters to Kartik: code reviews, performance optimization (lazy loading, code splitting, caching) and pixel-perfect, accessible UIs are standard practice.",
  },
  {
    id: "languages",
    keywords: ["languages", "speak", "english", "hindi", "gujarati", "भाषा", "ભાષા"],
    answer:
      "Kartik speaks English, Hindi and Gujarati — and ships clean code in all three. 😄",
  },
  {
    id: "hobbies",
    keywords: ["hobbies", "fun", "personal", "interests", "free"],
    answer:
      "Outside work Kartik enjoys exploring new tech and AI tools, and building side projects — this portfolio (with me in it!) is one of them.",
  },
  {
    id: "whyhire",
    keywords: ["why", "should", "best", "different", "unique"],
    answer:
      "Three reasons: (1) end-to-end ownership — UI to AWS, (2) 5+ years of shipped products across web, mobile and AI, (3) direct client experience, so he communicates like a partner, not a ticket-taker.",
  },
  {
    id: "products",
    keywords: ["b2b", "b2c", "saas", "product", "products", "ecommerce", "consumer"],
    answer:
      "Kartik has shipped both B2B and B2C: SaaS booking platforms, e-commerce stores, marketplaces and consumer apps. He's comfortable on either side — enterprise workflows or polished consumer UX.",
  },
  {
    id: "enterprise",
    keywords: ["enterprise", "erp", "hrms", "large", "corporate", "scale"],
    answer:
      "Enterprise work is a Kartik specialty: the CASSA Group ERP (inventory, HRMS, payroll, role-based pricing) is his flagship — large data models, multi-role access and systems businesses run on daily.",
  },
  {
    id: "seo",
    keywords: ["seo", "ranking", "google", "vitals", "lighthouse", "search"],
    answer:
      "Kartik handles technical SEO as part of every build: Core Web Vitals, semantic markup, structured data, lazy loading and code splitting. This portfolio itself targets 95+ Lighthouse scores.",
  },
  {
    id: "migrations",
    keywords: ["migration", "migrations", "migrate", "modernize", "rewrite", "upgrade"],
    answer:
      "Migrations are in his toolkit: platform modernizations, framework upgrades and data migrations — done incrementally so the business keeps running (the CASSA e-commerce → ERP evolution is a good example).",
  },
  {
    id: "branding",
    keywords: ["branding", "brochure", "brochures", "logo", "logos", "marketing", "graphics"],
    answer:
      "Beyond engineering, Kartik delivers design assets too: marketing brochures, logos, templates and cards — plus he's built canvas design tools with Fabric.js, so he understands design from both sides.",
  },
  {
    id: "areyoureal",
    keywords: ["real", "robot", "bot", "human", "alive", "chatgpt"],
    answer:
      "I'm a hand-crafted bot living entirely in your browser — no servers, no API calls, just smart keyword matching. Kartik built me himself. The real Kartik is at kartikbosmiya2003@gmail.com. 🤖",
  },
];

export const CHATBOT_PROMPTS: ChatPrompt[] = [
  { id: "p-exp", prompt: "Experience?", answer: CHAT_TOPICS.find((t) => t.id === "experience")!.answer },
  { id: "p-skills", prompt: "Tech stack?", answer: CHAT_TOPICS.find((t) => t.id === "skills")!.answer },
  { id: "p-projects", prompt: "Projects?", answer: CHAT_TOPICS.find((t) => t.id === "projects")!.answer },
  { id: "p-ai", prompt: "AI work?", answer: CHAT_TOPICS.find((t) => t.id === "ai")!.answer },
  { id: "p-avail", prompt: "Available?", answer: CHAT_TOPICS.find((t) => t.id === "availability")!.answer },
  { id: "p-contact", prompt: "Contact?", answer: CHAT_TOPICS.find((t) => t.id === "contact")!.answer },
];
```

- [ ] **Step 2: Write `tests/chatbot-data.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { matchPrompt } from "@/lib/matchPrompt";
import { CHAT_TOPICS, CHAT_FALLBACK, CHATBOT_PROMPTS } from "@/data/chatbot";

describe("chatbot data", () => {
  it("has 30+ topics", () => {
    expect(CHAT_TOPICS.length).toBeGreaterThanOrEqual(30);
  });

  it("every topic is reachable via its first keyword", () => {
    for (const topic of CHAT_TOPICS) {
      const result = matchPrompt(topic.keywords[0], CHAT_TOPICS, CHAT_FALLBACK);
      expect(result, `topic "${topic.id}" unreachable via "${topic.keywords[0]}"`).toBe(topic.answer);
    }
  });

  it("first keywords are unique across topics", () => {
    const firsts = CHAT_TOPICS.map((t) => t.keywords[0]);
    expect(new Set(firsts).size).toBe(firsts.length);
  });

  it("answers realistic recruiter questions", () => {
    expect(matchPrompt("How many years of experience does he have?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("5+");
    expect(matchPrompt("Is Kartik available for hire?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("open to work");
    expect(matchPrompt("क्या आप उपलब्ध हैं?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("open to work");
  });

  it("unmatched input falls back", () => {
    expect(matchPrompt("xyzzy plugh", CHAT_TOPICS, CHAT_FALLBACK)).toBe(CHAT_FALLBACK);
  });

  it("every chip has a non-empty answer", () => {
    for (const p of CHATBOT_PROMPTS) {
      expect(p.answer.length).toBeGreaterThan(20);
    }
  });
});
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run`
Expected: all tests PASS (matchPrompt suite + chatbot data suite). If "every topic is reachable" fails, the failing topic's first keyword collides with an earlier topic — make it unique.

- [ ] **Step 4: Commit**

```bash
git add src/data/chatbot.ts tests/chatbot-data.test.ts
git commit -m "feat: chatbot knowledge base - 37 topics, multilingual keywords, chips"
```

---

### Task 8: AskKartik widget

**Files:**
- Create: `src/components/AskKartik.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write `src/components/AskKartik.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { matchPrompt } from "@/lib/matchPrompt";
import { CHAT_TOPICS, CHAT_FALLBACK, CHAT_INTRO, CHATBOT_PROMPTS } from "@/data/chatbot";

type Msg = { id: number; kind: "intro" | "user" | "kartik" | "typing"; text: string };

let nextId = 0;
const mid = () => ++nextId;

export default function AskKartik() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: mid(), kind: "intro", text: CHAT_INTRO }]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  function send(question: string, answer: string) {
    const typing: Msg = { id: mid(), kind: "typing", text: "" };
    setMessages((m) => [...m, { id: mid(), kind: "user", text: question }, typing]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      setMessages((m) => [...m.filter((x) => x.id !== typing.id), { id: mid(), kind: "kartik", text: answer }]);
    }, reduced ? 250 : 800);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    send(q, matchPrompt(q, CHAT_TOPICS, CHAT_FALLBACK));
  }

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Ask Kartik"
        onClick={() => setOpen(true)}
        className="mono-label fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-ink shadow-lg transition-transform hover:scale-105"
      >
        <Sparkles size={14} />
        Ask Kartik
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Ask Kartik chat"
      className="card fixed bottom-4 right-4 z-50 flex max-h-[min(640px,calc(100vh-2rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden shadow-2xl"
      style={{ borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)", borderWidth: 2 }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-ink">
            <MessageCircle size={16} />
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">Ask Kartik</p>
            <p className="mono-label flex items-center gap-1.5 text-ink-mute">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Online · replies quickly
            </p>
          </div>
        </div>
        <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="text-ink-mute hover:text-ink">
          <X size={18} />
        </button>
      </div>

      {/* messages */}
      <div ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {messages.map((m) =>
          m.kind === "typing" ? (
            <div key={m.id} className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-paper px-3 py-2.5">
              <span className="typing-dot" style={{ animationDelay: "0ms" }} />
              <span className="typing-dot" style={{ animationDelay: "150ms" }} />
              <span className="typing-dot" style={{ animationDelay: "300ms" }} />
            </div>
          ) : m.kind === "user" ? (
            <div key={m.id} className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-ink">
              {m.text}
            </div>
          ) : (
            <div key={m.id} className="max-w-[90%] self-start whitespace-pre-line rounded-2xl rounded-bl-sm bg-paper px-3.5 py-2.5 text-sm">
              {m.text}
            </div>
          )
        )}
      </div>

      {/* chips + input */}
      <div className="border-t border-hairline p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {CHATBOT_PROMPTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => send(p.prompt, p.answer)}
              className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute transition-colors hover:border-primary hover:text-primary"
            >
              {p.prompt}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-hairline px-3 py-2 transition-colors focus-within:border-primary">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask anything…"
            aria-label="Free-form question"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-mute"
          />
          <button type="submit" aria-label="Send" className="rounded-full bg-primary p-1.5 text-primary-ink">
            <ArrowUp size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Mount in `src/app/layout.tsx`**

```tsx
import AskKartik from "@/components/AskKartik";
```

Inside `<body>`, after `<Footer />`:

```tsx
        <AskKartik />
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev` → open http://localhost:3000
- Pill button bottom-right → opens panel with intro message
- Click "Experience?" chip → typing dots ~800ms → answer
- Type "salary?" → rates answer; type "xyzzy" → fallback
- Switch themes — the widget re-skins

- [ ] **Step 4: Commit**

```bash
git add src/components/AskKartik.tsx src/app/layout.tsx
git commit -m "feat: Ask Kartik floating chat widget"
```

---

### Task 9: Shared UI components

**Files:**
- Create: `src/components/SectionHeading.tsx`, `src/components/StatCounter.tsx`, `src/components/ProjectCard.tsx`, `src/components/TimelineItem.tsx`, `src/components/SkillGrid.tsx`, `src/components/BlogCard.tsx`

- [ ] **Step 1: Write `src/components/SectionHeading.tsx`**

```tsx
export default function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="mono-label text-primary">{label}</p>
      <h2 className="mt-1 text-3xl font-bold">{title}</h2>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/StatCounter.tsx`** (counts up when scrolled into view)

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="card p-5 text-center">
      <p className="text-3xl font-bold text-primary">
        {display}
        {suffix}
      </p>
      <p className="mono-label mt-1 text-ink-mute">{label}</p>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/ProjectCard.tsx`**

```tsx
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-shadow hover:shadow-lg">
      <p className="mono-label text-primary">{project.categoryLabel}</p>
      <h3 className="mt-1.5 text-lg font-semibold">{project.name}</h3>
      <p className="mono-label mt-0.5 text-ink-mute">{project.role}</p>
      <p className="mt-2 text-sm text-ink-mute">{project.description}</p>
      <ul className="mt-3 flex-1 space-y-1.5 text-sm">
        {project.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-primary">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Write `src/components/TimelineItem.tsx`**

```tsx
import type { Experience } from "@/data/experience";

export default function TimelineItem({ exp, detailed = false }: { exp: Experience; detailed?: boolean }) {
  return (
    <div className="relative border-l-2 border-hairline pl-6 pb-8 last:pb-0">
      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-paper bg-primary" />
      <p className="mono-label text-primary">{exp.period}</p>
      <h3 className="mt-1 text-lg font-semibold">{exp.role}</h3>
      <p className="text-sm text-ink-mute">
        {exp.company} · {exp.location} · {exp.type}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {(detailed ? exp.bullets : exp.bullets.slice(0, 3)).map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-primary">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 5: Write `src/components/SkillGrid.tsx`**

```tsx
import { SKILL_GROUPS } from "@/data/skills";

export default function SkillGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label} className="card p-5">
          <p className="mono-label text-primary">{g.label}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <span key={s} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Write `src/components/BlogCard.tsx`**

```tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card block p-5 transition-shadow hover:shadow-lg">
      <p className="mono-label text-ink-mute">
        {post.date} · {post.readingTime} min read
      </p>
      <h3 className="mt-1.5 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-ink-mute">{post.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-primary">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

Note: `@/lib/blog` (`PostMeta`) arrives in Task 13 — until then this file fails type-check, which is fine because nothing imports it yet. If you prefer a green `tsc` after this task, create `src/lib/blog.ts` with just the interface now (Task 13 Step 1 contents).

- [ ] **Step 7: Build check and commit**

Run: `npx tsc --noEmit`
Expected: only the `@/lib/blog` import may error if you skipped the note above; otherwise clean.

```bash
git add src/components
git commit -m "feat: shared UI components (stats, project, timeline, skills, blog cards)"
```

---

### Task 10: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight, Bot, Building2, Cloud, Download, Globe, PenTool, Search, Smartphone, Users, Zap } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import BlogCard from "@/components/BlogCard";

const CAPABILITIES = [
  { icon: Globe, title: "B2B & B2C Products", desc: "SaaS platforms, e-commerce and consumer apps — from marketplace flows to checkout." },
  { icon: Building2, title: "Enterprise & ERP", desc: "Large-scale systems: ERP, HRMS, payroll, role-based access and multi-tenant architectures." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Android & iOS apps with Ionic, Capacitor and React Native." },
  { icon: Bot, title: "AI Integrations", desc: "LLM APIs, AI-powered features and automation woven into real products." },
  { icon: Cloud, title: "DevOps, AWS & Migrations", desc: "CI/CD pipelines, cloud deployments, load balancing, and platform/data migrations." },
  { icon: Zap, title: "Real-time Systems", desc: "Live chat, notifications and presence with Socket.IO at scale." },
  { icon: Search, title: "SEO & Performance", desc: "Technical SEO, Core Web Vitals, lazy loading and code splitting that move rankings." },
  { icon: PenTool, title: "Design & Branding", desc: "Marketing brochures, templates, logos and canvas design tools built on Fabric.js." },
  { icon: Users, title: "Client Consulting", desc: "Direct client collaboration — requirements to demos to delivery." },
];

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const posts = getAllPosts().slice(0, 2);
  const marqueeItems = SKILL_GROUPS.flatMap((g) => g.items);

  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* hero */}
      <section className="py-20 text-center sm:py-28">
        <p className="mono-label inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 text-ink-mute">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Open to work · {PROFILE.location} · {PROFILE.timezone}
        </p>
        <h1 className="mt-6 text-5xl font-bold sm:text-6xl">{PROFILE.name}</h1>
        <p className="text-gradient mt-3 text-xl font-semibold sm:text-2xl">{PROFILE.headline}</p>
        <p className="mx-auto mt-4 max-w-xl text-ink-mute">{PROFILE.tagline}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
          >
            View projects <ArrowRight size={14} />
          </Link>
          <a
            href={PROFILE.resumeUrl}
            className="mono-label inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PROFILE.stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </section>

      {/* capabilities */}
      <section className="py-20">
        <SectionHeading label="What I do" title="End-to-end product engineering" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="card p-5">
              <c.icon className="text-primary" size={22} />
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-ink-mute">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* featured projects */}
      <section className="pb-20">
        <SectionHeading label="Selected work" title="Featured projects" />
        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <Link href="/projects" className="mono-label mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          All projects <ArrowRight size={14} />
        </Link>
      </section>

      {/* experience */}
      <section className="pb-20">
        <SectionHeading label="Experience" title="Where I've worked" />
        <div>
          {EXPERIENCE.map((e) => (
            <TimelineItem key={e.id} exp={e} />
          ))}
        </div>
      </section>

      {/* tech marquee */}
      <section className="overflow-hidden border-y border-hairline py-6" aria-hidden>
        <div className="marquee-track gap-8">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={`${t}-${i}`} className="mono-label whitespace-nowrap text-ink-mute">
              {t} <span className="text-primary">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* blog teaser */}
      {posts.length > 0 && (
        <section className="py-20">
          <SectionHeading label="Writing" title="Latest from the blog" />
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="card mb-4 p-10 text-center">
        <h2 className="text-2xl font-bold">Let&apos;s build something together</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-mute">
          Open to full-time roles — remote or hybrid. I reply within 24 hours.
        </p>
        <Link
          href="/contact"
          className="mono-label mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
        >
          Get in touch <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
```

Note: this imports `getAllPosts` from `@/lib/blog` (Task 13). To keep the build green **now**, create `src/lib/blog.ts` with the Task 13 Step 1 content in this task (it has no other dependencies), or temporarily stub `const posts: PostMeta[] = []`. Preferred: jump ahead and write `src/lib/blog.ts` exactly as given in Task 13 Step 1 — then Task 13 only adds posts and pages.

- [ ] **Step 2: Write `src/lib/blog.ts`** (Task 13 Step 1 content, pulled forward)

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        summary: String(data.summary ?? ""),
        readingTime: readingTimeMinutes(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: String(data.summary ?? ""),
      readingTime: readingTimeMinutes(content),
    },
    content,
  };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: green; `/` listed as static. `content/blog/` doesn't exist yet → `getAllPosts()` returns `[]` → blog teaser hidden. Dev-check the page: hero, counting stats, capabilities, 3 featured projects, timeline, marquee, CTA.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/lib/blog.ts
git commit -m "feat: home page with hero, stats, capabilities, projects, timeline"
```

---

### Task 11: About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Write `src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";
import TimelineItem from "@/components/TimelineItem";
import SkillGrid from "@/components/SkillGrid";

export const metadata: Metadata = {
  title: "About — Kartik Bosmiya",
  description: "Software engineer with 5+ years building web, mobile and AI products end-to-end.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="About" title="The story so far" />

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <Image
            src="/img/profile.jpg"
            alt={PROFILE.name}
            width={280}
            height={280}
            className="card w-full object-cover"
            priority
          />
          <div className="card mt-4 space-y-2 p-4 text-sm">
            <p><span className="mono-label text-ink-mute">Location · </span>{PROFILE.location}</p>
            <p><span className="mono-label text-ink-mute">Timezone · </span>{PROFILE.timezone}</p>
            <p><span className="mono-label text-ink-mute">Email · </span>
              <a className="text-primary hover:underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </p>
            <p><span className="mono-label text-ink-mute">Responds · </span>{PROFILE.responseSla}</p>
          </div>
        </div>

        <div className="space-y-5 text-[0.95rem] leading-relaxed">
          <p>
            I&apos;m Kartik — a software engineer from Ahmedabad who has spent the last 5+ years
            building products end-to-end: web apps, mobile apps and, increasingly, AI-powered
            features that make software feel alive.
          </p>
          <p>
            I started at a digital agency, working directly with clients and learning that
            shipping the <em>right</em> thing matters more than shipping the clever thing. Since
            then I&apos;ve converted an e-commerce site into a full ERP (CASSA Group), launched a
            UK booking SaaS with payments and native mobile apps (THAT TIME), and built AI-driven
            platforms with Next.js.
          </p>
          <p>
            My sweet spot is owning a feature from first wireframe to AWS deployment — frontend,
            backend, database, pipeline. I&apos;ve worked across B2B and B2C products, enterprise
            systems and platform migrations, and I handle the surrounding work too: technical SEO,
            marketing brochures and design assets when a project needs them. I work in agile teams,
            run code reviews, and communicate with clients like a partner, not a ticket-taker.
          </p>
          <p>
            Beyond code: exploring new AI tooling, building side projects (this portfolio and its
            chatbot are one), and keeping up with where software is heading next.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading label="Experience" title="Full history" />
        {EXPERIENCE.map((e) => (
          <TimelineItem key={e.id} exp={e} detailed />
        ))}
      </section>

      <section className="mt-20">
        <SectionHeading label="Education" title="Where I studied" />
        <div className="grid gap-4 sm:grid-cols-2">
          {EDUCATION.map((ed) => (
            <div key={ed.degree} className="card p-5">
              <p className="mono-label text-primary">{ed.period}</p>
              <h3 className="mt-1 text-base font-semibold">{ed.degree}</h3>
              <p className="text-sm text-ink-mute">{ed.school}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading label="Skills" title="The toolkit" />
        <SkillGrid />
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Temporary image placeholder**

`public/img/profile.jpg` arrives in Task 16. For now:

```bash
mkdir -p public/img
cp "legacy/assets/img/profile-img-1.jpg" "public/img/profile.jpg"
```

- [ ] **Step 3: Verify and commit**

Run: `npm run build` → green, `/about` static. Dev-check the page renders with photo.

```bash
git add src/app/about public/img/profile.jpg
git commit -m "feat: about page with story, experience, education, skills"
```

---

### Task 12: Projects page (filterable)

**Files:**
- Create: `src/app/projects/page.tsx`, `src/app/projects/ProjectsGrid.tsx`

- [ ] **Step 1: Write `src/app/projects/ProjectsGrid.tsx`** (client component for the filter)

```tsx
"use client";

import { useState } from "react";
import { PROJECTS, type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`mono-label rounded-full border px-4 py-2 transition-colors ${
              filter === f.id
                ? "border-primary bg-primary text-primary-ink"
                : "border-hairline text-ink-mute hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Write `src/app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — Kartik Bosmiya",
  description: "ERP systems, booking SaaS, AI platforms and design tools — selected work by Kartik Bosmiya.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Projects" title="Things I've shipped" />
      <ProjectsGrid />
    </main>
  );
}
```

- [ ] **Step 3: Verify and commit**

Run: `npm run build` → green. Dev-check: filters switch between All/Web/Mobile/AI correctly (Web shows 4, Mobile 1, AI 1).

```bash
git add src/app/projects
git commit -m "feat: filterable projects page"
```

---

### Task 13: Blog — MDX pipeline, two starter posts, list + article pages

**Files:**
- Create: `content/blog/realtime-socketio-lessons.mdx`, `content/blog/ecommerce-to-erp.mdx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Already created in Task 10: `src/lib/blog.ts`

- [ ] **Step 1: Write `content/blog/realtime-socketio-lessons.mdx`**

```mdx
---
title: "Real-time features with Socket.IO: lessons from production"
date: "2026-05-20"
tags: ["Socket.IO", "Node.js", "Real-time"]
summary: "What actually matters when your chat, notifications and presence features meet real users — rooms, reconnects, and the bugs nobody warns you about."
---

<!-- FACT-CHECK: draft post written for Kartik's review — verify anecdotes match his real experience -->

Real-time features look easy in the demo and humbling in production. I've shipped
Socket.IO-powered chat, notifications and live updates in production apps, and the
gap between "works on my machine" and "works for users on hotel Wi-Fi" taught me more
than any tutorial.

## Rooms are your unit of scale

The first instinct is to broadcast everything and filter on the client. It works until
it doesn't. Model your domain as rooms early — a conversation, an order, a dashboard —
and join/leave deliberately:

```js
io.on("connection", (socket) => {
  socket.on("conversation:join", (conversationId) => {
    socket.join(`conversation:${conversationId}`);
  });
});

// emitting to exactly the right people
io.to(`conversation:${id}`).emit("message:new", message);
```

## Design for the reconnect, not the connect

Mobile users change networks constantly. Every real-time feature needs an answer to
"what happens when the socket comes back?" Two rules that saved me:

1. **Server is the source of truth.** On reconnect, the client asks for everything it
   missed (`since: lastMessageId`) instead of trusting its local state.
2. **Make events idempotent.** Receiving `message:new` twice must not show the message
   twice. Deduplicate by ID at the boundary.

## Don't send what you can't afford

Socket payloads bypass most of the caching you rely on for REST. Sending a full object
graph on every keystroke melts both your server and your user's data plan. Send deltas,
debounce aggressively, and measure payload sizes like you measure bundle sizes.

## The checklist I use now

- Rooms mapped to domain objects, never "one big channel"
- Reconnect flow tested by literally toggling Wi-Fi
- Idempotent event handlers with IDs on every event
- Heartbeat/presence timeouts tuned for mobile (generous, not aggressive)
- A REST fallback for anything that must not be lost

Real-time is a feature multiplier — chat, live dashboards, presence all feel magical
when they work. The magic is in the failure handling.
```

- [ ] **Step 2: Write `content/blog/ecommerce-to-erp.mdx`**

```mdx
---
title: "From e-commerce to ERP: lessons from rebuilding CASSA"
date: "2026-04-12"
tags: ["Architecture", "React", "MongoDB"]
summary: "Turning a working e-commerce site into a full ERP without stopping the business — role-based pricing, inventory and payroll, one careful module at a time."
---

<!-- FACT-CHECK: draft post written for Kartik's review — verify details match the real CASSA project -->

CASSA Group started as a straightforward e-commerce build. Then the requirements grew:
role-based pricing for wholesale buyers, inventory tracking across locations, then HR
and payroll. We weren't building a shop anymore — we were building an ERP, and the shop
had to keep selling while we did it.

## Strangle, don't rewrite

The tempting move was a rewrite. Instead we grew the system module by module around the
working core. Each new domain (pricing, inventory, HR) shipped as its own module with
its own collections and routes, integrated through well-defined seams. The store never
went down; the ERP grew around it.

## Role-based pricing is a data-model problem

Wholesale vs retail pricing sounds like an `if` statement. It isn't — it's a pricing
resolution pipeline. We modeled price rules as documents:

```js
{
  productId,
  audience: "wholesale",   // or "retail", "vip"
  minQty: 50,
  price: 410,
  validFrom, validTo
}
```

Resolution picks the most specific matching rule. New pricing scenarios became new
rows, not new code — the difference between a feature and a fire drill.

## Inventory taught me to love idempotency

Stock updates arrive from sales, returns, manual corrections and imports — sometimes
twice. Every mutation got an operation ID and the handlers became idempotent. The same
discipline that saves real-time systems saves inventory counts.

## Payroll: boring tech, careful code

For HRMS and payroll we deliberately chose the most boring possible implementations.
Money code should be dull, heavily validated and easy to audit. Excitement belongs in
the UI, not the salary calculation.

## What I'd tell past me

- Module boundaries are cheaper on day one than day three hundred
- Pricing, inventory and payroll are data-model problems before they're code problems
- Keep the business running; ship the platform in slices

The best part? Watching a client's daily operations move into software we grew around
their existing store — without a single "big bang" migration weekend.
```

- [ ] **Step 3: Write `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Kartik Bosmiya",
  description: "Notes on building web, mobile and AI products in production.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Blog" title="Notes from the field" />
      {posts.length === 0 ? (
        <p className="text-ink-mute">Posts coming soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Write `src/app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { getAllPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — Kartik Bosmiya`, description: post.meta.summary };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="mono-label text-ink-mute">
        {post.meta.date} · {post.meta.readingTime} min read
      </p>
      <h1 className="mt-2 text-4xl font-bold">{post.meta.title}</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.meta.tags.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-primary">
            {t}
          </span>
        ))}
      </div>
      <article className="prose-blog mt-10">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
      </article>
    </main>
  );
}
```

- [ ] **Step 5: Add article typography to `src/app/globals.css`** (append at the end)

```css
/* blog article typography */
.prose-blog {
  line-height: 1.75;
}

.prose-blog h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2rem 0 0.75rem;
}

.prose-blog p {
  margin: 0.9rem 0;
}

.prose-blog ul,
.prose-blog ol {
  margin: 0.9rem 0;
  padding-left: 1.4rem;
  list-style: disc;
}

.prose-blog li {
  margin: 0.35rem 0;
}

.prose-blog code {
  font-family: var(--font-jbmono), monospace;
  font-size: 0.85em;
}

.prose-blog :not(pre) > code {
  background: var(--paper-2);
  border: 1px solid var(--hairline);
  border-radius: 4px;
  padding: 0.1em 0.35em;
}

.prose-blog pre {
  background: #0d1117;
  border: 1px solid var(--hairline);
  border-radius: var(--radius);
  padding: 1rem;
  overflow-x: auto;
  margin: 1.2rem 0;
}
```

- [ ] **Step 6: Verify and commit**

Run: `npm run build`
Expected: green; route table shows `/blog` and `/blog/[slug]` with 2 static paths. Dev-check both articles render with highlighted code; blog teaser now appears on the home page.

```bash
git add content src/app/blog src/app/globals.css
git commit -m "feat: MDX blog with two starter posts and code highlighting"
```

---

### Task 14: Contact page + form

**Files:**
- Create: `src/components/ContactForm.tsx`, `src/app/contact/page.tsx`

- [ ] **Step 1: Write `src/components/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PROFILE } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree configured → graceful mailto fallback
    if (!PROFILE.formspreeId) {
      const subject = encodeURIComponent(String(data.get("subject") ?? "Portfolio contact"));
      const body = encodeURIComponent(
        `From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`
      );
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${PROFILE.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mono-label text-ink-mute">Your name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label htmlFor="email" className="mono-label text-ink-mute">Your email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mono-label text-ink-mute">Subject</label>
        <input id="subject" name="subject" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
      </div>
      <div>
        <label htmlFor="message" className="mono-label text-ink-mute">Message</label>
        <textarea id="message" name="message" rows={6} required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
      </div>

      {status === "sent" && (
        <p className="text-sm text-green-600">Message sent — Kartik replies within 24 hours. ✓</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Email directly:{" "}
          <a className="text-primary underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105 disabled:opacity-60"
      >
        <Send size={14} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Write `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Kartik Bosmiya",
  description: "Get in touch — replies within 24 hours.",
};

const CARDS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phoneHref}` },
  { icon: MapPin, label: "Location", value: `${PROFILE.location} (${PROFILE.timezone})` },
  { icon: Clock, label: "Response time", value: PROFILE.responseSla },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Contact" title="Let's talk" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {CARDS.map((c) => (
            <div key={c.label} className="card flex items-center gap-4 p-4">
              <c.icon className="shrink-0 text-primary" size={20} />
              <div>
                <p className="mono-label text-ink-mute">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="text-sm font-medium text-primary hover:underline">{c.value}</a>
                ) : (
                  <p className="text-sm font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify and commit**

Run: `npm run build` → green. Dev-check: with `formspreeId: ""` the submit opens the mail client (mailto fallback).

```bash
git add src/components/ContactForm.tsx src/app/contact
git commit -m "feat: contact page with Formspree form and mailto fallback"
```

- [ ] **Step 4 (USER, post-launch):** create a free form at https://formspree.io, paste its id into `PROFILE.formspreeId` in `src/data/profile.ts`, commit.

---

### Task 15: 404, sitemap, robots, OG image, JSON-LD

**Files:**
- Create: `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center px-4 py-32 text-center">
      <p className="mono-label text-primary">404</p>
      <h1 className="mt-2 text-4xl font-bold">This page shipped without a route</h1>
      <p className="mt-3 max-w-md text-ink-mute">
        It happens to the best of us. Try the navigation above — or ask the chat bubble in the
        corner, it knows everything about Kartik.
      </p>
      <Link
        href="/"
        className="mono-label mt-8 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
      >
        Back home
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Write `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://kartikbosmiya.vercel.app"; // update after deploy / custom domain

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/blog", "/contact"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...pages, ...posts];
}
```

- [ ] **Step 3: Write `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kartikbosmiya.vercel.app/sitemap.xml", // update after deploy
  };
}
```

- [ ] **Step 4: Write `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kartik Bosmiya — Software Engineer · End-to-End Product Builder";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0f172a",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#5eead4", letterSpacing: 4 }}>OPEN TO WORK</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>Kartik Bosmiya</div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 12 }}>
          Software Engineer · End-to-End Product Builder
        </div>
        <div style={{ fontSize: 24, color: "#5eead4", marginTop: 40 }}>
          30+ clients · 5+ years · 50+ projects · 20+ technologies
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 5: Add JSON-LD + metadataBase to `src/app/layout.tsx`**

Extend `metadata`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://kartikbosmiya.vercel.app"), // update after deploy
  title: "Kartik Bosmiya — Software Engineer",
  description:
    "Software Engineer · End-to-End Product Builder. 5+ years building web, mobile and AI products.",
};
```

Add inside `<body>` (top, before `<Navbar />`):

```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kartik Bosmiya",
              jobTitle: "Software Engineer",
              email: "mailto:kartikbosmiya2003@gmail.com",
              url: "https://kartikbosmiya.vercel.app",
              address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
              sameAs: [
                "https://linkedin.com/in/kartik-bosmiya-1277a8212",
                "https://github.com/Kartik123-creator",
              ],
            }),
          }}
        />
```

- [ ] **Step 6: Verify and commit**

Run: `npm run build`
Expected: green; route table includes `/sitemap.xml`, `/robots.txt`, `/opengraph-image`. Visit a bogus URL in dev → themed 404.

```bash
git add src/app/not-found.tsx src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx src/app/layout.tsx
git commit -m "feat: 404, sitemap, robots, OG image, JSON-LD person schema"
```

---

### Task 16: Assets + remove legacy site

**Files:**
- Create: `public/resume.pdf`
- Delete: `legacy/`

- [ ] **Step 1: Copy the resume PDF**

```bash
cp "C:\Users\KARTIK\Downloads\Kartik_Bosmiya (2).pdf" "public/resume.pdf"
```

If the file has moved, ask the user for the current path. Verify: `ls -la public/resume.pdf` shows ~75 KB.

- [ ] **Step 2: Delete the legacy site** (profile photo was already copied in Task 11)

```bash
git rm -r legacy
```

- [ ] **Step 3: Verify nothing references legacy**

Run: `grep -ri "legacy" src/ --include="*.ts*"` → no results.
Run: `npm run build` → green.

- [ ] **Step 4: Commit**

```bash
git add public/resume.pdf
git commit -m "chore: add resume.pdf, remove legacy Bootstrap site"
```

---

### Task 17: Full verification + content fact-check + deploy

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: all matchPrompt + chatbot-data tests pass.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: green; all routes static (`○` or `●`), no warnings about dynamic rendering.

- [ ] **Step 3: Manual pass (dev server)**

Checklist — verify each:
- [ ] All 5 pages render: `/`, `/about`, `/projects`, `/blog`, `/contact` + one blog article
- [ ] Theme switcher: all 4 themes; spot-check each palette (12 total); choice survives refresh
- [ ] Stats count up when scrolled into view
- [ ] Project filters: All=6, Web=4, Mobile=1, AI=1
- [ ] Ask Kartik: chips work, free-form works ("experience?", "salary?", "क्या आप उपलब्ध हैं?"), gibberish → fallback
- [ ] Contact form: mailto fallback opens mail client
- [ ] Mobile viewport (DevTools, 375px): navbar, hero, cards, chat widget all usable
- [ ] 404 page on a bogus route

- [ ] **Step 4: Collect FACT-CHECK items for the user**

Run: `grep -rn "FACT-CHECK" src/ content/`
Present every hit to the user as a checklist (Tax Natives, Duped.au, Canvas Editor, stat numbers, AI/gRPC/PostgreSQL/React Native claims, both blog posts). Get explicit confirmation or corrections, apply corrections, commit as `fix: content corrections from fact-check`.

- [ ] **Step 5: Push and deploy to Vercel (USER assists)**

```bash
git push origin main
```

User steps (guide them):
1. Go to https://vercel.com/new → import the GitHub repo → framework auto-detects Next.js → Deploy.
2. After deploy, note the production URL. If it differs from `kartikbosmiya.vercel.app`, update the three hardcoded URLs (layout.tsx `metadataBase`, sitemap.ts `BASE`, robots.ts) and the JSON-LD `url`, then push again.

- [ ] **Step 6: Post-deploy checks**

- Lighthouse (Chrome DevTools, deployed URL): expect ≥ 95 on Performance / Accessibility / Best Practices / SEO; investigate anything lower.
- `https://<url>/sitemap.xml` and `/robots.txt` resolve.
- Share the URL in a chat app — OG card shows name + headline.

- [ ] **Step 7: Final commit if anything changed**

```bash
git add -A
git commit -m "chore: post-deploy URL updates"
git push
```

---

## Self-Review (completed)

- **Spec coverage:** all spec sections map to tasks — themes/palettes (T3), chatbot engine+data+UI (T6–8), pages (T10–14), blog (T13), contact (T14), SEO/404/sitemap (T15), migration (T1, T16), testing/deploy (T17). Services page correctly absent (out of scope); capabilities live on Home.
- **Placeholder scan:** no TBDs. The only intentionally-deferred values are user-owned: Formspree id (explicit fallback behavior implemented) and the final deploy URL (explicit update step in T17).
- **Type consistency:** `ChatTopic {id, keywords, answer}` used identically in T6/T7/T8; `PostMeta` defined in T10 (lib/blog.ts) and consumed in T9/T13; `Project`/`Experience` types match across data and components; palette ids in `themes.ts`, `globals.css` and the pre-paint script all use the same 12 ids.
