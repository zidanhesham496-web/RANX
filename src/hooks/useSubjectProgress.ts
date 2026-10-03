import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initialTasks } from "../data/todos";
import { fetchCompletedTaskIds } from "../services/todoProgress";

export function useSubjectProgress(enabled: boolean): Record<string, number> | null {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [doneIds, setDoneIds] = useState<Set<number> | null>(null);

  useEffect(() => {
    if (!enabled || !userId || doneIds) return;
    let active = true;
    fetchCompletedTaskIds(userId)
      .then((ids) => {
        if (active) setDoneIds(new Set(ids));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [enabled, userId, doneIds]);

  return useMemo(() => {
    if (!doneIds) return null;
    const acc: Record<string, { done: number; total: number }> = {};
    for (const t of initialTasks) {
      const key = t.subject.trim().toUpperCase();
      const row = (acc[key] ??= { done: 0, total: 0 });
      row.total += 1;
      if (doneIds.has(t.id)) row.done += 1;
    }
    const out: Record<string, number> = {};
    for (const [key, r] of Object.entries(acc)) {
      out[key] = Math.round((r.done / r.total) * 100);
    }
    return out;
  }, [doneIds]);
}
