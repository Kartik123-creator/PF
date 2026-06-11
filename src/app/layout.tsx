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
