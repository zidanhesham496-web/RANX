import { LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function LogoutButton() {
  const { signOut } = useAuth();
  const [busy, setBusy] = useState(false);

  const handle = async () => {
    setBusy(true);
    try {
      await signOut();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={busy}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-rose-400/25 bg-rose-500/5 text-[14px] font-medium text-rose-300 transition hover:bg-rose-500/10 active:scale-[0.98] disabled:opacity-60 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
    >
      <LogOut size={18} strokeWidth={1.8} />
      {busy ? "Logging out…" : "Log Out"}
    </button>
  );
}
