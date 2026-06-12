import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kartikbosmiya.vercel.app/sitemap.xml", // update after deploy
  };
}
