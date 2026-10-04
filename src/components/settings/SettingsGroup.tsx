import type { ReactNode } from "react";

export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <h2 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.14em] text-[#8d8a9e] uppercase">
        {title}
      </h2>
      <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-violet-300/15 bg-[#0d0d18]/75 backdrop-blur-md">
        {children}
      </ul>
    </section>
  );
}
