// view.js — renders the task list and counts safely
import { escapeHTML } from "./utils.js";

export function render(tasks, filter) {
  const list = document.getElementById("task-list");
  const count = document.getElementById("task-count");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  count.textContent = `(${filteredTasks.length} tasks)`;

  list.innerHTML = filteredTasks
    .map(
      task => `
      <div class="task ${task.done ? "done" : ""}" data-id="${task.id}">
        <span>${escapeHTML(task.title)}</span>
        <div>
          <button class="toggle">${task.done ? "Undo" : "Done"}</button>
          <button class="delete">🗑️</button>
        </div>
      </div>`
    )
    .join("");
}
