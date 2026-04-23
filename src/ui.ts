import type { Task, TaskId } from '../types';

export function createTaskElement(
  task: Task,
  onToggle: (id: TaskId) => void,
  onDelete: (id: TaskId) => void
): HTMLLIElement {
  const li = document.createElement('li');
  li.style.padding = '0.5rem 0';
  li.style.borderBottom = '1px solid var(--color-border)';
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.gap = '0.5rem';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => onToggle(task.id));

  const span = document.createElement('span');
  span.textContent = task.title;
  span.style.flexGrow = '1';
  span.style.textDecoration = task.completed ? 'line-through' : 'none';
  span.style.color = task.completed ? 'var(--color-border)' : 'inherit';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.style.padding = '0.25rem 0.5rem';
  deleteBtn.style.fontSize = '0.875rem';
  deleteBtn.style.backgroundColor = '#dc3545';
  deleteBtn.addEventListener('click', () => onDelete(task.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}