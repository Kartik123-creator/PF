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
