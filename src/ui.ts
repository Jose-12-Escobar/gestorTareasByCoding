import type { Task, TaskId } from '../types';

export function createTaskElement(
  task: Task,
  onToggle: (id: TaskId) => void,
  onDelete: (id: TaskId) => void
): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (task.completed) {
    li.classList.add('is-completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('task-item__checkbox');
  checkbox.addEventListener('change', () => onToggle(task.id));

  const span = document.createElement('span');
  span.textContent = task.title;
  span.classList.add('task-item__text');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  // Usamos clases para que sea más fácil de mantener y aplicar estilos responsivos
  deleteBtn.classList.add('btn', 'task-item__delete-btn');
  deleteBtn.addEventListener('click', () => onDelete(task.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}