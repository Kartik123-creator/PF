import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center px-4 py-32 text-center">
      <p className="mono-label text-primary">404</p>
      <h1 className="mt-2 text-4xl font-bold">This page shipped without a route</h1>
      <p className="mt-3 max-w-md text-ink-mute">
        It happens to the best of us. Try the navigation above — or ask the chat bubble in the
        corner, it knows everything about Kartik.
      </p>
      <Link
        href="/"
        className="mono-label mt-8 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
      >
        Back home
      </Link>
    </main>
  );
}
