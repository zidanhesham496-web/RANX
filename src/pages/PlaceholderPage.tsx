export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-[1.75rem] font-semibold tracking-tight text-white">{title}</h1>
      <p className="text-sm text-[#8d8a9e]">Coming soon.</p>
    </div>
  );
}
