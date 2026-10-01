import { ListChecks } from "lucide-react";
import type { Task, TodoFilter } from "../../types/todo";
import { EmptyState } from "../EmptyState";
import { TodoCard } from "./TodoCard";

const EMPTY_COPY: Record<TodoFilter, string> = {
  ALL: "Add your first lecture, section or assignment to start tracking.",
  LEC: "No lectures to track right now.",
  SEC: "No sections to track right now.",
  ASS: "No assignments to track right now.",
};

export function TodoList({
  tasks,
  filter,
  onToggle,
}: {
  tasks: Task[];
  filter: TodoFilter;
  onToggle: (id: number) => void;
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ListChecks size={26} strokeWidth={1.6} />}
        title="Nothing here yet"
        description={EMPTY_COPY[filter]}
      />
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TodoCard key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}
