"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PROFILE } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const NEEDS = ["Full-time hire", "Contract project", "Consultation / audit", "Something else"];

const inputCls =
  "mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree configured → graceful mailto fallback
    if (!PROFILE.formspreeId) {
      const subject = encodeURIComponent(String(data.get("subject") || "Portfolio contact"));
      const lines = [
        `From: ${data.get("name")} <${data.get("email")}>`,
        data.get("whatsapp") ? `WhatsApp: ${data.get("whatsapp")}` : null,
        `Looking for: ${data.get("need")}`,
        "",
        String(data.get("message")),
      ].filter((l) => l !== null);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${PROFILE.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mono-label text-ink-mute">Your name *</label>
          <input id="name" name="name" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mono-label text-ink-mute">Your email *</label>
          <input id="email" name="email" type="email" required className={inputCls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="mono-label text-ink-mute">WhatsApp (optional)</label>
          <input id="whatsapp" name="whatsapp" type="tel" placeholder="+91 …" className={inputCls} />
        </div>
        <div>
          <label htmlFor="need" className="mono-label text-ink-mute">Looking for *</label>
          <select id="need" name="need" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select one</option>
            {NEEDS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mono-label text-ink-mute">Subject *</label>
        <input id="subject" name="subject" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className="mono-label text-ink-mute">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you building? What's the timeline? What's the immediate need?"
          className={inputCls}
        />
      </div>

      <div aria-live="polite">
        {status === "mailto" && (
          <p className="text-sm text-ink-mute">
            Your email app should have opened with the message ready. If nothing happened, write to{" "}
            <a className="text-primary underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>{" "}
            directly.
          </p>
        )}
        {status === "sent" && (
          <p className="text-sm text-success">Message sent — Kartik replies within 24 hours. ✓</p>
        )}
        {status === "error" && (
          <p className="text-sm text-danger">
            Something went wrong. Email directly:{" "}
            <a className="text-primary underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105 disabled:opacity-60"
      >
        <Send size={14} />
        {status === "sending" ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}
