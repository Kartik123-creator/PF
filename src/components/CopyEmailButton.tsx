"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mono-label inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-ink transition-colors hover:border-primary hover:text-primary"
    >
      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
