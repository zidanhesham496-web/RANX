import { useState, type FormEvent } from "react";
import { getSupabaseClient } from "../../services/supabase";

const INPUT =
  "h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-[14px] text-white outline-none transition placeholder:text-[#5e5b6b] focus:border-violet-300/50";

export function ChangePasswordForm({ username, onDone }: { username: string; onDone: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (next.length < 8) return setError("New password must be at least 8 characters.");
    if (next !== confirm) return setError("Passwords don't match.");
    if (next === current) return setError("New password must be different from the current one.");

    setBusy(true);
    try {
      const client = getSupabaseClient();
      const email = `${username.trim().toLowerCase()}@ranx.app`;
      const { error: verifyError } = await client.auth.signInWithPassword({ email, password: current });
      if (verifyError) {
        setError("Current password is incorrect.");
        return;
      }
      const { error: updateError } = await client.auth.updateUser({ password: next });
      if (updateError) {
        setError("Couldn't update the password. Try again.");
        return;
      }
      setCurrent("");
      setNext("");
      setConfirm("");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[14px] text-emerald-300">Password updated.</p>
        <button
          type="button"
          onClick={onDone}
          className="h-11 w-full rounded-xl border border-violet-300/20 bg-violet-500/15 text-[14px] font-medium text-white transition active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="password" autoComplete="current-password" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} className={INPUT} />
      <input type="password" autoComplete="new-password" placeholder="New password" value={next} onChange={(e) => setNext(e.target.value)} className={INPUT} />
      <input type="password" autoComplete="new-password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={INPUT} />
      {error && (
        <p role="alert" className="text-[13px] text-rose-300">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !current || !next || !confirm}
        className="h-12 w-full rounded-xl border border-violet-300/30 bg-violet-500/30 text-[14px] font-medium text-white transition active:scale-[0.98] disabled:opacity-50"
      >
        {busy ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
