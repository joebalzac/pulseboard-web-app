export type TaskStatus = "backlog" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

const TASK_KEY = "puleboard-tasks";

export const loadTasks = () => {
  const raw = localStorage.getItem(TASK_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveTasks = (tasks: any[]) => {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};
