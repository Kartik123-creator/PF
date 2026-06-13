import { describe, it, expect } from "vitest";
import { matchPrompt } from "@/lib/matchPrompt";
import { CHAT_TOPICS, CHAT_FALLBACK, CHATBOT_PROMPTS } from "@/data/chatbot";

describe("chatbot data", () => {
  it("has 30+ topics", () => {
    expect(CHAT_TOPICS.length).toBeGreaterThanOrEqual(30);
  });

  it("every topic is reachable via its first keyword", () => {
    for (const topic of CHAT_TOPICS) {
      const result = matchPrompt(topic.keywords[0], CHAT_TOPICS, CHAT_FALLBACK);
      expect(result, `topic "${topic.id}" unreachable via "${topic.keywords[0]}"`).toBe(topic.answer);
    }
  });

  it("first keywords are unique across topics", () => {
    const firsts = CHAT_TOPICS.map((t) => t.keywords[0]);
    expect(new Set(firsts).size).toBe(firsts.length);
  });

  it("no keyword mixes Devanagari and Gujarati scripts", () => {
    for (const topic of CHAT_TOPICS) {
      for (const kw of topic.keywords) {
        const mixed = /[઀-૿]/.test(kw) && /[ऀ-ॿ]/.test(kw);
        expect(mixed, `topic "${topic.id}" keyword "${kw}" mixes scripts`).toBe(false);
      }
    }
  });

  it("answers realistic recruiter questions", () => {
    expect(matchPrompt("How many years of experience does he have?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("6+");
    expect(matchPrompt("Is Kartik available for hire?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("open to work");
    expect(matchPrompt("क्या आप उपलब्ध हैं?", CHAT_TOPICS, CHAT_FALLBACK)).toContain("open to work");
  });

  it("unmatched input falls back", () => {
    expect(matchPrompt("xyzzy plugh", CHAT_TOPICS, CHAT_FALLBACK)).toBe(CHAT_FALLBACK);
  });

  it("every chip has a non-empty answer", () => {
    for (const p of CHATBOT_PROMPTS) {
      expect(p.answer.length).toBeGreaterThan(20);
    }
  });

  it("topic ids are unique", () => {
    const ids = CHAT_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
