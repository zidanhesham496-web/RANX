import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-violet-300/15 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mb-4 grid size-14 place-items-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-200">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 max-w-[16rem] text-sm text-[#8d8a9e]">{description}</p>
    </div>
  );
}
