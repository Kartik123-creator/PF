import { AVAILABILITY, PROFILE } from "@/data/profile";

const PRODUCTION_URL = "https://kartik-bosmiya.vercel.app";

/**
 * Base URL for metadataBase, canonical links, og:image, sitemap and robots.
 * - NEXT_PUBLIC_SITE_URL wins when set (e.g. a custom domain).
 * - Production deploys always use PRODUCTION_URL — never the per-deployment VERCEL_URL.
 * - Preview deploys use their own URL, so their og:image resolves.
 * - Local dev / other builds fall back to PRODUCTION_URL.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

export const SITE_TITLE = "Kartik Bosmiya — Full-Stack SaaS & ERP Developer (React, Next.js, Node.js)";
export const SITE_ROLE = PROFILE.headline;
export const SITE_DESCRIPTION = `Full-stack developer building SaaS products, ERP systems and mobile apps with React, Next.js and Node.js — shipping production software since 2020. ${AVAILABILITY.label}.`;
