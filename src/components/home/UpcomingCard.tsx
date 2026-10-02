export interface UpcomingItem {
  label: string;
  title: string;
  meta?: string;
}

export function UpcomingCard({ item }: { item: UpcomingItem }) {
  return (
    <section aria-label="Up next">
      <h2 className="mb-3 text-base font-semibold text-white">Up next</h2>
      <div className="rounded-2xl border border-violet-300/15 bg-[#0d0d18]/75 p-4 backdrop-blur-md">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-violet-300/80 uppercase">
          {item.label}
        </p>
        <p className="mt-1.5 text-[15px] font-medium text-white">{item.title}</p>
        {item.meta && <p className="mt-1 text-[13px] text-[#8d8a9e]">{item.meta}</p>}
      </div>
    </section>
  );
}
