import { RanxWordmark } from "../RanxWordmark";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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
      className="sticky top-0 z-30 border-b border-white/5 bg-[#09090f]/70 backdrop-blur-xl"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <RanxWordmark className="h-6" />
          {label && <span className="text-sm text-[#8d8a9e]">{label}</span>}
        </div>
        <div className="flex items-center gap-2">
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
