import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEMES } from "@/data/themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AskKartik from "@/components/AskKartik";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kartikbosmiya.vercel.app"), // update after deploy
  title: "Kartik Bosmiya — Software Engineer",
  description:
    "Software Engineer · End-to-End Product Builder. 5+ years building web, mobile and AI products.",
};

const validMap = Object.fromEntries(THEMES.map((t) => [t.id, t.palettes.map((p) => p.id)]));

const themeInit = `(function(){try{var V=${JSON.stringify(validMap)};var t=localStorage.getItem("kb-theme"),p=localStorage.getItem("kb-palette");if(!V[t]){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"paper";p=null}if(V[t].indexOf(p)<0){p=V[t][0]}var d=document.documentElement;d.dataset.theme=t;d.dataset.palette=p}catch(e){}})();`;

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
      <body className="flex min-h-screen flex-col">
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
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <AskKartik />
      </body>
    </html>
  );
}
