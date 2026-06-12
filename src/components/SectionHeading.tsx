export default function SectionHeading({
  label,
  title,
  as: Tag = "h2",
}: {
  label: string;
  title: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-8">
      <p className="mono-label text-primary">{label}</p>
      <Tag className="mt-1 text-3xl font-bold">{title}</Tag>
    </div>
  );
}
