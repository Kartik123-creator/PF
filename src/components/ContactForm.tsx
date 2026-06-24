"use client";

import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { PROFILE } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const NEEDS = ["Full-time hire", "Contract project", "Consultation / audit", "Something else"];

const fieldCls =
  "w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const inputCls = `mt-1 ${fieldCls}`;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function mailtoFallback(data: FormData) {
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
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    // 1) Try the SMTP API route (active once SMTP_* env vars are set on the server).
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      // 503 = SMTP not configured yet → fall through to the next option.
      if (res.status !== 503) throw new Error(String(res.status));
    } catch {
      // network/route error → fall through to mailto
    }

    // 2) Formspree, if an id is configured.
    if (PROFILE.formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${PROFILE.formspreeId}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("sent");
        return;
      } catch {
        setStatus("error");
        return;
      }
    }

    // 3) Graceful mailto fallback.
    mailtoFallback(data);
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
          <div className="relative mt-1">
            <select id="need" name="need" required defaultValue="" className={`${fieldCls} appearance-none pr-9`}>
              <option value="" disabled>Select one</option>
              {NEEDS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute"
            />
          </div>
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
        className="btn-press btn-shine mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink disabled:opacity-60"
      >
        <Send size={14} />
        {status === "sending" ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}
