import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card block p-5 transition-shadow hover:shadow-lg">
      <p className="mono-label text-ink-mute">
        {post.date} · {post.readingTime} min read
      </p>
      <h3 className="mt-1.5 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-ink-mute">{post.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-primary">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
