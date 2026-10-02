import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Infinity as InfinityIcon, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { RanxWordmark } from "../RanxWordmark";

const PAGE_LABELS: Record<string, string> = {
  "/home": "Home",
  "/todo": "To-Do",
  "/tables": "Tables",
  "/source": "Source",
  "/profile": "Profile",
};

export function AppHeader() {
  const { profile, signOut } = useAuth();
  const { pathname } = useLocation();
  const [signingOut, setSigningOut] = useState(false);

  const label = PAGE_LABELS[pathname] ?? "";
  const initial = profile?.name?.slice(0, 1).toUpperCase() || "R";

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 border-b border-white/5 bg-[#09090f]/70 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="relative mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative grid size-8 sm:size-9 place-items-center rounded-xl border border-purple-500/40 bg-gradient-to-b from-[#1a1033] to-[#0d071a] shadow-[0_0_14px_rgba(168,85,247,0.3)]">
            <InfinityIcon className="size-4 sm:size-5 text-purple-300 drop-shadow-[0_2px_8px_rgba(192,132,252,0.9)]" />
          </div>
          <RanxWordmark className="h-[18px] sm:h-6" />
        </div>

        {label && (
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xs font-medium text-[#c9c5d9] sm:text-sm">
            {label}
          </span>
        )}

        <div className="flex items-center gap-1">
          <div
            aria-label={profile?.username ?? "Account"}
            className="grid size-9 place-items-center rounded-full border border-violet-400/30 bg-violet-500/15 text-sm font-semibold text-violet-200"
          >
            {initial}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-label="Sign out"
            className="grid size-11 place-items-center rounded-full text-[#8d8a9e] transition hover:bg-white/5 hover:text-white active:scale-95 disabled:opacity-50"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
