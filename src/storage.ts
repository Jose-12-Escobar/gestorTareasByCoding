import type { Task } from '../types';

const STORAGE_KEY = 'mi_primera_app_tasks';

export function getTasks(): Task[] {
  const tasksJson = localStorage.getItem(STORAGE_KEY);
  if (!tasksJson) return [];
  try {
    return JSON.parse(tasksJson);
  } catch (e) {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}