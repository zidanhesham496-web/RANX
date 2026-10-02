import { LogOut } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { initialTasks } from "../data/todos";

export default function SourcePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const task = initialTasks.find((t) => t.id === Number(params.get("task")));

  return (
    <section
      aria-label="Source"
      className="flex h-[calc(100dvh-15rem)] min-h-[24rem] flex-col rounded-3xl border border-violet-300/15 bg-[#0b0b16]/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_40px_-20px_rgba(139,92,246,0.35)] backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {task && (
            <>
              <p className="text-xs font-semibold tracking-wider text-violet-300/90">{task.subject}</p>
              <h1 className="mt-0.5 text-lg font-medium leading-snug text-white">{task.title}</h1>
            </>
          )}
        </div>
        <button
          type="button"
          aria-label="Back to To-Do list"
          onClick={() => navigate("/todo")}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-300/25 bg-violet-500/10 text-violet-200 transition hover:bg-violet-500/20 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
        >
          <LogOut size={18} />
        </button>
      </div>
    </section>
  );
}
