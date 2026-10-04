import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initialTasks } from "../data/todos";
import { fetchCompletedTaskIds } from "../services/todoProgress";

export interface Tally {
  done: number;
  total: number;
  percent: number;
}

export interface TodoProgress {
  loading: boolean;
  error: boolean;
  overall: Tally;
  bySubject: Record<string, Tally>;
}

const tally = (done: number, total: number): Tally => ({
  done,
  total,
  percent: total ? Math.round((done / total) * 100) : 0,
});

export function useTodoProgress(): TodoProgress {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [doneIds, setDoneIds] = useState<Set<number> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setDoneIds(null);
    setError(false);
    fetchCompletedTaskIds(userId)
      .then((ids) => active && setDoneIds(new Set(ids)))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [userId]);

  return useMemo(() => {
    const ids = doneIds ?? new Set<number>();
    const counts: Record<string, { done: number; total: number }> = {};
    let done = 0;
    for (const t of initialTasks) {
      const key = t.subject.trim().toUpperCase();
      counts[key] ??= { done: 0, total: 0 };
      counts[key].total += 1;
      if (ids.has(t.id)) {
        counts[key].done += 1;
        done += 1;
      }
    }
    const bySubject: Record<string, Tally> = {};
    for (const [key, c] of Object.entries(counts)) bySubject[key] = tally(c.done, c.total);
    return {
      loading: doneIds === null && !error,
      error,
      overall: tally(done, initialTasks.length),
      bySubject,
    };
  }, [doneIds, error]);
}
