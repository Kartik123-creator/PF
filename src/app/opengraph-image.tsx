import { ImageResponse } from "next/og";
import { PROFILE, STATS, statTarget } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${PROFILE.name} — ${PROFILE.headline}`;

const statsLine = STATS
  .map((s) => `${statTarget(s)}${s.suffix} ${s.label.toLowerCase()}`)
  .join(" · ");

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
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 12 }}>{PROFILE.headline}</div>
        <div style={{ fontSize: 24, color: "#5eead4", marginTop: 40 }}>{statsLine}</div>
      </div>
    ),
    size
  );
}
