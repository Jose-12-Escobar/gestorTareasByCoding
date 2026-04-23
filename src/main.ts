import './style.css';
import type { Task, TaskId } from '../types';
import { getTasks, saveTasks } from './storage';
import { createTaskElement } from './ui';

const taskFormElement = document.querySelector<HTMLFormElement>('#task-form')!;
const taskInputElement = document.querySelector<HTMLInputElement>('#task-title')!;
const taskListElement = document.querySelector<HTMLUListElement>('#task-list')!;
const searchInput = document.querySelector<HTMLInputElement>('#search-input')!;
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filters button');

type FilterType = 'all' | 'pending' | 'completed';
let currentFilter: FilterType = 'all';
let searchQuery = '';

function toggleTask(id: TaskId) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
  }
}

function deleteTask(id: TaskId) {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);
  saveTasks(filteredTasks);
  renderTasks();
}

function renderTasks() {
  let tasks = getTasks();
  taskListElement.innerHTML = '';

  if (searchQuery) {
    tasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (currentFilter === 'pending') {
    tasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    tasks = tasks.filter(t => t.completed);
  }

  tasks.forEach(task => {
    const taskElement = createTaskElement(task, toggleTask, deleteTask);
    taskListElement.appendChild(taskElement);
  });
}

taskFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInputElement.value.trim();
  if (!title) return;

  const newTask: Task = { id: crypto.randomUUID() as TaskId, title, completed: false };
  const tasks = getTasks();
  saveTasks([...tasks, newTask]);
 
  taskInputElement.value = '';
  renderTasks();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = (e.target as HTMLInputElement).value;
  renderTasks();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter as FilterType;
    renderTasks();
  });
});

renderTasks();
console.log('App de Tareas inicializada.');
