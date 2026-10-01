export type TaskType = "LEC" | "SEC" | "ASS";
export type TodoFilter = "ALL" | TaskType;

export interface Task {
  id: number;
  type: TaskType;
  subject: string;
  title: string;
  number?: number;
  completed: boolean;
}
