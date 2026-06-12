import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .flatMap((file) => {
      const slug = file.replace(/\.mdx$/, "");
      try {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return [
          {
            slug,
            title: String(data.title ?? slug),
            date: String(data.date ?? ""),
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            summary: String(data.summary ?? ""),
            readingTime: readingTimeMinutes(content),
          },
        ];
      } catch (err) {
        console.warn(`Skipping blog post with unparseable frontmatter: ${file}`, err);
        return [];
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: String(data.summary ?? ""),
      readingTime: readingTimeMinutes(content),
    },
    content,
  };
}
