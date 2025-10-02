export type TaskPriority="LOW"|"MEDIUM"|"HIGH";
export type TaskStatus="pending" | "in-progress"|"completed";

export interface ITask{
  _id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}