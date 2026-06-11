export interface ChatTopic {
  id: string;
  keywords: string[];
  answer: string;
}

const SPLIT_RE = /[\s,.!?'"()\/\-_:;।]+/;

/**
 * Scores topics against the input: exact token match = +2 per keyword.
 * If no exact hits at all, falls back to substring matching (+1, keywords ≥ 4 chars).
 * Highest score wins; ties resolve to the earliest topic. No match → fallback.
 */
export function matchPrompt(input: string, topics: ChatTopic[], fallback: string): string {
  const text = input.toLowerCase().trim();
  if (!text) return fallback;

  const tokens = new Set(text.split(SPLIT_RE).filter(Boolean));
  const scores = new Map<string, number>();

  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (tokens.has(kw.toLowerCase())) score += 2;
    }
    if (score > 0) scores.set(topic.id, score);
  }

  if (scores.size === 0) {
    for (const topic of topics) {
      let score = 0;
      for (const kw of topic.keywords) {
        const k = kw.toLowerCase();
        if (k.length >= 4 && text.includes(k)) score += 1;
      }
      if (score > 0) scores.set(topic.id, score);
    }
  }

  let bestId: string | null = null;
  let bestScore = 0;
  for (const topic of topics) {
    const s = scores.get(topic.id) ?? 0;
    if (s > bestScore) {
      bestId = topic.id;
      bestScore = s;
    }
  }

  if (!bestId) return fallback;
  return topics.find((t) => t.id === bestId)!.answer;
}
