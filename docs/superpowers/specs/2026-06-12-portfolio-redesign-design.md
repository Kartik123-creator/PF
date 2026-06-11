# Portfolio Redesign — Design Spec

**Date:** 2026-06-12
**Owner:** Kartik Bosmiya
**Status:** Approved sections §1–§4 (brainstormed interactively; visual mockups in `.superpowers/brainstorm/244-1781203707/content/`)

## 1. Goal

Replace the current static Bootstrap portfolio (`index.html`, 2023-era content) with a modern, recruiter-facing portfolio modeled on https://jagadmitul.com/ — including its signature scripted AI-style chatbot — using updated content from Kartik's 2026 resume.

**Primary audience:** recruiters and hiring managers (job hunting, full-time roles).

## 2. Decisions (locked during brainstorming)

| Decision | Choice |
|---|---|
| Stack | Next.js (App Router) + Tailwind CSS, static-first (SSG) |
| Hosting | Vercel free tier, auto-deploy from GitHub `main` |
| Structure | Multi-page: `/`, `/about`, `/projects`, `/blog`, `/blog/[slug]`, `/contact` |
| Headline | "Software Engineer · End-to-End Product Builder" |
| Chatbot | "Ask Kartik" — fully client-side scripted keyword-matching bot (same architecture as reference, verified by reverse-engineering) |
| Themes | 4 switchable themes: Paper (default) / Dark / Gradient / Swiss |
| Stats | 30+ clients · 5+ yrs · 50+ projects · 20+ technologies |
| Projects shown | CASSA ERP, THAT TIME, AI Image Gallery, Tax Natives, Duped.au, Fabric.js canvas editor (6). Sugar Elite and Escorts JP excluded. |
| Contact form | Formspree free tier (no backend) |
| Blog | MDX files in repo; ships with 2 starter posts |
| No server code | No API routes, no secrets, no running costs (Approach 1 of 3 considered; CMS and API-route approaches rejected as YAGNI) |

## 3. Architecture

### 3.1 Project layout

```
src/
  app/
    layout.tsx            # html[data-theme], Navbar, Footer, AskKartik, fonts
    page.tsx              # Home
    about/page.tsx
    projects/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx  # MDX rendering, generateStaticParams
    contact/page.tsx
    not-found.tsx         # themed 404 with chatbot nudge
    sitemap.ts            # sitemap.xml
  components/
    Navbar.tsx  Footer.tsx  ThemeSwitcher.tsx  AskKartik.tsx
    StatCounter.tsx  ProjectCard.tsx  TimelineItem.tsx
    SkillGrid.tsx  BlogCard.tsx  SectionHeading.tsx
  data/
    profile.ts  experience.ts  projects.ts  skills.ts  chatbot.ts
  lib/
    matchPrompt.ts        # chatbot matching engine (pure function, unit-tested)
content/
  blog/*.mdx
```

All content edits happen in `src/data/*` and `content/blog/*` — pages render from data, never hardcode facts.

### 3.2 Pages

- **Home (`/`):** sticky navbar (links + theme switcher) → hero (OPEN_TO_WORK badge with location/timezone, name, headline, CTAs: View Projects / Download Resume) → animated stat counters (count up on scroll into view) → "What I do" 6 capability cards (Web Apps · Mobile · AI Integrations · DevOps & AWS · Real-time Systems · Client Consulting) → featured projects (top 3 → /projects) → experience timeline → scrolling tech marquee → latest 2 blog posts → CTA banner → footer.
- **About:** story/intro, photo, detailed experience (per-company bullets), education (B.E. Computer Engineering, L.J. University; Diploma, L.J. University), grouped skills grid, beyond-code section.
- **Projects:** filterable grid (All / Web / Mobile / AI); each card: category label, name, role, description, outcome bullets, tech chips.
- **Blog:** post list (title, date, tags, reading time) → article page with code syntax highlighting.
- **Contact:** info cards (email, phone, location, "replies ≤ 24 hours") + Formspree form (name, email, subject, message) + social links.
- **Global:** Navbar, Footer, floating "Ask Kartik" button on every page.

### 3.3 Theme system

- `data-theme` attribute on `<html>` selects one of 4 CSS-variable sets using the token names `--paper`, `--paper-2`, `--ink`, `--ink-mute`, `--primary`, `--primary-ink`, `--hairline`.
- Themes:
  - **Paper (default):** cream `#f6eee3` paper, espresso `#2a1a14` ink, forest-green `#1a7a4a` primary; serif headings (e.g., Lora/Georgia) + monospace labels.
  - **Dark:** navy slate `#0f172a` / `#1e293b`, ink `#f1f5f9`, teal `#5eead4` primary; sans (Inter) + mono details.
  - **Gradient:** deep violet `#0c0a1d`→`#1a1040`, glassmorphism cards (`bg-white/5`, blur, hairline borders), violet→pink gradient accents (`#a78bfa`→`#ec4899`).
  - **Swiss:** `#fafafa` ground, black `#0a0a0a` 900-weight type, square corners, orange `#f97316` accent.
- ThemeSwitcher in navbar cycles themes; choice persisted in `localStorage`; first visit respects `prefers-color-scheme` (dark OS → Dark theme). Inline script in `<head>` applies the stored theme before paint (no flash).
- Tailwind utilities reference the CSS variables so every component themes automatically; per-theme font switching via variables too.

### 3.4 "Ask Kartik" chatbot

Architecture verified against the reference implementation (its bot is 100% client-side: `CHATBOT_PROMPTS` chips + `matchPrompt()` keyword scorer + fake typing delay; no API calls).

- **UI:** floating pill button (bottom-right, sparkles icon, "Ask Kartik") → opens a panel (Radix Dialog or equivalent, non-modal): header with avatar + "🟢 Online · replies quickly", message list, suggested-question chips, free-form input. Spring animations; respects `prefers-reduced-motion`.
- **Engine (`lib/matchPrompt.ts`):**
  1. **Topics (25+)** — each `{ id, answer, keywords[] }`, plus chip prompts `{ id, prompt, answer }`. Coverage: greeting, experience (overall + per company), each of the 6 projects individually, skills overall, frontend, backend, mobile/React Native, AI, DevOps/AWS/gRPC/load balancers, databases (MongoDB/MySQL/PostgreSQL), availability/hiring, notice period, remote/hybrid, location/timezone, contact, education, rates/salary, work process, team/leadership, client handling, code quality, languages spoken, hobbies/personal, why-hire-him, are-you-real easter egg.
  2. **Scoring** — tokenize on whitespace/punctuation; exact keyword match +2; if zero exact hits, substring match +1; highest score wins; tie → first.
  3. **Multilingual** — keyword lists include English, Hindi (transliterated + Devanagari), Gujarati words; where a topic has a translated answer it replies in kind, else English.
  4. **Typing illusion** — bouncing-dots message, ~800ms delay (250ms under reduced motion).
  5. **Fallback** — no match: "I don't have that one — email kartikbosmiya2003@gmail.com and Kartik replies within 24 hours."
- **Data:** all topics/answers in `src/data/chatbot.ts`. Adding a topic = adding one object.

### 3.5 Content data

- **profile.ts:** name Kartik Bosmiya; headline "Software Engineer · End-to-End Product Builder"; tagline highlighting 5+ years, web + mobile + AI, international clients; Ahmedabad, India, UTC+05:30; email kartikbosmiya2003@gmail.com; phone +91 93287 17164; linkedin.com/in/kartik-bosmiya-1277a8212; github.com/Kartik123-creator; status OPEN_TO_WORK; SLA ≤ 24h; stats `{clients: "30+", years: "5+", projects: "50+", technologies: "20+"}`; resumeUrl `/resume.pdf`.
- **experience.ts:** Tec Sense Innovations Pvt. Ltd. (Full Stack Developer, 11/2023–present, Ahmedabad) — resume bullets enriched with AI integrations, PostgreSQL, DevOps/CI-CD, gRPC/load-balancer exposure; Websture Digital Agency (Software Developer, 07/2020–01/2022) — SPA work + direct client handling.
- **projects.ts:** six projects, each `{ id, name, category, role, description, bullets[], tech[] }`:
  1. CASSA Group — ERP & E-commerce (React, Node, MongoDB, MUI)
  2. THAT TIME — SaaS appointment booking, UK market (multi-role, Klarna/Clearpay payments, Ionic mobile apps)
  3. AI Image Gallery — AI search/generation platform (Next.js, Tailwind)
  4. Tax Natives — *draft from user's brief mention; user fact-checks*
  5. Duped.au — *draft from user's brief mention; user fact-checks*
  6. Fabric.js canvas editor — *draft showcasing Fabric.js design-tool work; user fact-checks*
- **skills.ts:** grouped — Frontend (Next.js, React, Angular, Vue, Fabric.js, Tailwind, MUI, Ant Design); Backend (Node, Laravel, REST, Socket.IO, gRPC); Mobile (Ionic, Capacitor, React Native); AI & Automation (LLM API integration, AI-assisted workflows); DevOps & Cloud (AWS, CI/CD, load balancers, cron); Databases (MongoDB, MySQL, PostgreSQL).
- **Draft-content rule:** anything not in the resume (Tax Natives, Duped.au, Fabric.js editor details, React Native, gRPC, load balancers, PostgreSQL, stat numbers) is marked for user fact-check before launch; nothing fabricated beyond what the user supplied or approves.

### 3.6 Blog

- MDX files in `content/blog/` with frontmatter (title, date, tags, summary). Static params at build time; syntax highlighting (rehype-pretty-code or equivalent); reading-time calculation.
- Ships with 2 starter posts drafted for user review, grounded in his real work, e.g. "Real-time features with Socket.IO at scale" and "From e-commerce to ERP: lessons from CASSA".

### 3.7 Contact form

Formspree free tier (50 submissions/month): client-side POST to the form endpoint; inline validation; explicit loading / success / error states. Direct-contact cards beside the form. No backend.

## 4. Error handling

- Chatbot: every input path returns an answer (fallback guarantees no dead end); engine is a pure function — no network, nothing to fail.
- Contact form: client validation + Formspree error state with mailto fallback link.
- 404: themed `not-found.tsx` suggesting the chatbot/nav.
- Theme: unknown/missing localStorage value falls back to Paper; pre-paint script avoids theme flash.

## 5. SEO & performance

- Per-page `metadata` (title, description), OpenGraph image, `sitemap.ts`, robots, JSON-LD `Person` schema.
- Targets: Lighthouse ≥ 95 across categories; static generation for all routes; next/image for images; fonts via `next/font` (no layout shift).

## 6. Testing & verification

- **Unit tests (Vitest):** `matchPrompt` — exact match beats substring, multilingual keywords, tie-break, fallback, empty input; ~25-topic coverage smoke test (every topic reachable by at least one of its keywords).
- **Manual pass:** all 4 themes × mobile + desktop; bot conversation flows; form submit; blog rendering; 404.
- **Build check:** `next build` green; Lighthouse run on deployed preview.

## 7. Deployment & migration

- New code replaces the old site in this repo (old `index.html` + `assets/` removed after the new site is verified; git history preserves them).
- GitHub → Vercel: auto-deploy on push to `main`; preview deploys on branches.
- `resume.pdf` placed in `public/` (user supplies the export).
- Profile photo reused from `assets/img/profile-img-1.jpg` (moved to `public/`), replaceable later.

## 8. Out of scope

- Real LLM chatbot (documented upgrade path: swap `matchPrompt` call for an API route later)
- CMS, analytics, newsletter, i18n of page content (bot keywords only), Services page
