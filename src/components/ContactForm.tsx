"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PROFILE } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree configured → graceful mailto fallback
    if (!PROFILE.formspreeId) {
      const subject = encodeURIComponent(String(data.get("subject") ?? "Portfolio contact"));
      const body = encodeURIComponent(
        `From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`
      );
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
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
          <label htmlFor="name" className="mono-label text-ink-mute">Your name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label htmlFor="email" className="mono-label text-ink-mute">Your email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mono-label text-ink-mute">Subject</label>
        <input id="subject" name="subject" required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
      </div>
      <div>
        <label htmlFor="message" className="mono-label text-ink-mute">Message</label>
        <textarea id="message" name="message" rows={6} required className="mt-1 w-full rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
      </div>

      {status === "sent" && (
        <p className="text-sm text-green-600">Message sent — Kartik replies within 24 hours. ✓</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Email directly:{" "}
          <a className="text-primary underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105 disabled:opacity-60"
      >
        <Send size={14} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
