// A template re-mounts on every navigation (unlike layout), so this gentle
// fade-up runs each time the route changes. Motion + reduced-motion guard live
// in globals.css under `.page-transition`.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
