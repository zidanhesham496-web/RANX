import { useEffect, useMemo, useState } from "react";
import { initialTasks } from "../data/todos";
import type { TodoFilter } from "../types/todo";
import { useAuth } from "../context/AuthContext";
import { fetchCompletedTaskIds, setTaskCompleted } from "../services/todoProgress";
import { TodoFilters } from "../components/todo/TodoFilters";
import { TodoList } from "../components/todo/TodoList";

export default function TodoPage() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<TodoFilter>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoading(true);
    fetchCompletedTaskIds(userId)
      .then((ids) => {
        if (!active) return;
        setDoneIds(new Set(ids));
        setError(null);
      })
      .catch(() => active && setError("Couldn't load your progress. Pull to refresh and try again."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [userId]);

  const tasks = useMemo(
    () => initialTasks.map((t) => ({ ...t, completed: doneIds.has(t.id) })),
    [doneIds],
  );

  const visible = useMemo(
    () => (filter === "ALL" ? tasks : tasks.filter((t) => t.type === filter)),
    [tasks, filter],
  );

  const toggleTask = async (id: number) => {
    if (!userId) return;
    const next = !doneIds.has(id);
    const apply = (value: boolean) =>
      setDoneIds((prev) => {
        const copy = new Set(prev);
        if (value) copy.add(id);
        else copy.delete(id);
        return copy;
      });

    apply(next);
    setError(null);
    try {
      await setTaskCompleted(userId, id, next);
    } catch {
      apply(!next);
      setError("Couldn't save your change. Check your connection and try again.");
    }
  };

  const done = tasks.filter((t) => t.completed).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-white">
          To-Do List
        </h1>
        <p className="mt-1 text-sm text-[#8d8a9e]">
          Keep track of your lectures, sections and assignments.
        </p>
      </header>

      <section aria-label="Progress">
        <p className="mb-2 text-sm text-[#c9c5d9]">
          {done} of {tasks.length} completed
        </p>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-300 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      <TodoFilters value={filter} onChange={setFilter} />

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {loading ? (
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[72px] animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
          ))}
        </div>
      ) : (
        <TodoList tasks={visible} filter={filter} onToggle={toggleTask} />
      )}
    </div>
  );
}
