import { Infinity as InfinityIcon } from "lucide-react";
import { RanxWordmark } from "../RanxWordmark";

export function AppHeader() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-white/5 bg-[#09090f]/70 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center px-3 sm:px-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative grid size-8 place-items-center rounded-xl border border-purple-500/40 bg-gradient-to-b from-[#1a1033] to-[#0d071a] shadow-[0_0_14px_rgba(168,85,247,0.3)] sm:size-9">
            <InfinityIcon className="size-4 text-purple-300 drop-shadow-[0_2px_8px_rgba(192,132,252,0.9)] sm:size-5" />
          </div>
          <RanxWordmark className="h-[18px] sm:h-6" />
        </div>
      </div>
    </header>
  );
}
