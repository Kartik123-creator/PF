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
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  return [...pages, ...posts];
}
