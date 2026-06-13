"use client";

import { Download } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-primary-ink transition-transform hover:scale-105 print:hidden"
    >
      <Download size={14} /> Download PDF
    </button>
  );
}
