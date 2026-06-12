import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { getAllPosts, getPost } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — Kartik Bosmiya`, description: post.meta.summary };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="mono-label text-ink-mute">
        {post.meta.date} · {post.meta.readingTime} min read
      </p>
      <h1 className="mt-2 text-4xl font-bold">{post.meta.title}</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.meta.tags.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-primary">
            {t}
          </span>
        ))}
      </div>
      <article className="prose-blog mt-10">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
      </article>
    </main>
  );
}
