"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { matchPrompt } from "@/lib/matchPrompt";
import { CHAT_TOPICS, CHAT_FALLBACK, CHAT_INTRO, CHATBOT_PROMPTS } from "@/data/chatbot";

type Msg = { id: number; kind: "intro" | "user" | "kartik" | "typing"; text: string };

let nextId = 0;
const mid = () => ++nextId;

export default function AskKartik() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [{ id: mid(), kind: "intro", text: CHAT_INTRO }]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
    }
  }, [open]);

  function send(question: string, answer: string) {
    const typing: Msg = { id: mid(), kind: "typing", text: "" };
    setMessages((m) => [...m, { id: mid(), kind: "user", text: question }, typing]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      setMessages((m) => [...m.filter((x) => x.id !== typing.id), { id: mid(), kind: "kartik", text: answer }]);
    }, reduced ? 250 : 800);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    send(q, matchPrompt(q, CHAT_TOPICS, CHAT_FALLBACK));
  }

  if (!open) {
    return (
      <button
        ref={launcherRef}
        type="button"
        aria-label="Ask Kartik"
        aria-haspopup="dialog"
        aria-expanded={false}
        onClick={() => setOpen(true)}
        className="mono-label fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-ink shadow-lg transition-transform hover:scale-105"
      >
        <Sparkles size={14} />
        Ask Kartik
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Ask Kartik chat"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      className="card fixed bottom-4 right-4 z-50 flex max-h-[min(640px,calc(100vh-2rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden shadow-2xl"
      style={{ borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)", borderWidth: 2 }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-ink">
            <MessageCircle size={16} />
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">Ask Kartik</p>
            <p className="mono-label flex items-center gap-1.5 text-ink-mute">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Online · replies quickly
            </p>
          </div>
        </div>
        <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="text-ink-mute hover:text-ink">
          <X size={18} />
        </button>
      </div>

      {/* messages */}
      <div ref={listRef} role="log" aria-live="polite" className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {messages.map((m) =>
          m.kind === "typing" ? (
            <div key={m.id} className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-paper px-3 py-2.5">
              <span className="typing-dot" style={{ animationDelay: "0ms" }} />
              <span className="typing-dot" style={{ animationDelay: "150ms" }} />
              <span className="typing-dot" style={{ animationDelay: "300ms" }} />
            </div>
          ) : m.kind === "user" ? (
            <div key={m.id} className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-ink">
              {m.text}
            </div>
          ) : (
            <div key={m.id} className="max-w-[90%] self-start whitespace-pre-line rounded-2xl rounded-bl-sm bg-paper px-3.5 py-2.5 text-sm">
              {m.text}
            </div>
          )
        )}
      </div>

      {/* chips + input */}
      <div className="border-t border-hairline p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {CHATBOT_PROMPTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => send(p.prompt, p.answer)}
              className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute transition-colors hover:border-primary hover:text-primary"
            >
              {p.prompt}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-hairline px-3 py-2 transition-colors focus-within:border-primary">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask anything…"
            aria-label="Free-form question"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-mute"
          />
          <button type="submit" aria-label="Send" className="rounded-full bg-primary p-1.5 text-primary-ink">
            <ArrowUp size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
