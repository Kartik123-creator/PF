import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Kartik Bosmiya",
  description: "Notes on building web, mobile and AI products in production.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Blog" title="Notes from the field" />
      {posts.length === 0 ? (
        <p className="text-ink-mute">Posts coming soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </main>
  );
}
