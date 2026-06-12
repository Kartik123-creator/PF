export default function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="mono-label text-primary">{label}</p>
      <h2 className="mt-1 text-3xl font-bold">{title}</h2>
    </div>
  );
}
