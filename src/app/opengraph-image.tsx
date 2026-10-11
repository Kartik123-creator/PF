import { ImageResponse } from "next/og";
import { AVAILABILITY, PROFILE } from "@/data/profile";
import { SITE_ROLE, SITE_TITLE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_TITLE;

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
        <div style={{ fontSize: 26, color: "#5eead4", letterSpacing: 3 }}>{AVAILABILITY.label.toUpperCase()}</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 40, color: "#94a3b8", marginTop: 12 }}>{SITE_ROLE}</div>
        <div style={{ fontSize: 28, color: "#5eead4", marginTop: 40 }}>React · Next.js · Node.js · since 2020</div>
      </div>
    ),
    size
  );
}
