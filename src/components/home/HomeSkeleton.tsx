function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-violet-300/10 motion-reduce:animate-none ${className}`}
    />
  );
}

export function HomeSkeleton() {
  return (
    <div dir="ltr" aria-busy="true" aria-label="Loading" className="space-y-7 pt-3">
      <div className="space-y-3">
        <Bar className="h-3 w-24 rounded-md" />
        <Bar className="h-9 w-56 rounded-lg" />
        <Bar className="h-3 w-32 rounded-md" />
      </div>
      <div className="flex items-center gap-5 rounded-3xl border border-violet-300/10 bg-[#0d0d18]/60 p-5">
        <div className="h-[132px] w-[132px] shrink-0 animate-pulse rounded-full border-[9px] border-violet-300/10 motion-reduce:animate-none" />
        <div className="space-y-2.5">
          <Bar className="h-4 w-36 rounded-md" />
          <Bar className="h-3 w-24 rounded-md" />
        </div>
      </div>
      <div>
        <Bar className="mb-3 h-4 w-24 rounded-md" />
        <div className="-mx-5 flex gap-3 overflow-hidden px-5">
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} className="h-[104px] w-32 shrink-0 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
