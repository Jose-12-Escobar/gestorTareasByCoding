export type TaskId = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: TaskId;
  title: string;
  completed: boolean;
}