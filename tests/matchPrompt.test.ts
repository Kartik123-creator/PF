import { describe, it, expect } from "vitest";
import { matchPrompt, type ChatTopic } from "@/lib/matchPrompt";

const FALLBACK = "fallback-answer";

const topics: ChatTopic[] = [
  { id: "experience", keywords: ["experience", "years", "anubhav", "अनुभव", "અનુભવ"], answer: "exp-answer" },
  { id: "skills", keywords: ["skills", "stack", "tech"], answer: "skills-answer" },
  { id: "contact", keywords: ["contact", "email", "sampark", "संपर्क", "સંપર્ક"], answer: "contact-answer" },
];

describe("matchPrompt", () => {
  it("returns fallback for empty input", () => {
    expect(matchPrompt("", topics, FALLBACK)).toBe(FALLBACK);
    expect(matchPrompt("   ", topics, FALLBACK)).toBe(FALLBACK);
  });

  it("returns fallback when nothing matches", () => {
    expect(matchPrompt("zzz qqq", topics, FALLBACK)).toBe(FALLBACK);
  });

  it("matches an exact keyword token", () => {
    expect(matchPrompt("What is his experience?", topics, FALLBACK)).toBe("exp-answer");
  });

  it("is case-insensitive and ignores punctuation", () => {
    expect(matchPrompt("SKILLS!!!", topics, FALLBACK)).toBe("skills-answer");
  });

  it("scores multiple exact hits higher than a single hit", () => {
    // "skills" (1 hit) vs "experience"+"years" (2 hits) → experience wins
    expect(matchPrompt("skills experience years", topics, FALLBACK)).toBe("exp-answer");
  });

  it("falls back to substring matching only when no exact token hits", () => {
    // "emails" is not an exact token match for "email", substring pass catches it
    expect(matchPrompt("emails?", topics, FALLBACK)).toBe("contact-answer");
  });

  it("matches Hindi and Gujarati keywords", () => {
    expect(matchPrompt("आपका अनुभव कितना है", topics, FALLBACK)).toBe("exp-answer");
    expect(matchPrompt("સંપર્ક કેવી રીતે કરવો", topics, FALLBACK)).toBe("contact-answer");
  });

  it("breaks ties by topic order", () => {
    const tied: ChatTopic[] = [
      { id: "a", keywords: ["shared"], answer: "first" },
      { id: "b", keywords: ["shared"], answer: "second" },
    ];
    expect(matchPrompt("shared", tied, FALLBACK)).toBe("first");
  });
});
