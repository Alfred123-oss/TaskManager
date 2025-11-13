// app.js — ties UI events to state updates and rendering
// Event delegation improves memory stability because only one listener is used
// on the parent container, even as children change. The target is identified
// via dataset.id or classList (toggle/delete buttons).

import { Task } from "./Task.js";
import { saveTasks, loadTasks } from "./store.js";
import { render } from "./view.js";

let tasks = loadTasks();
let filter = "all";

const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-task");
const list = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filters button");

function update() {
  saveTasks(tasks);
  render(tasks, filter);
}

// Add new task
addBtn.addEventListener("click", () => {
  const title = input.value.trim();
  if (!title) {
    alert("Please enter a task title!");
    return;
  }
  tasks.push(new Task(title));
  input.value = "";
  update();
});

// Event delegation for toggling and deleting
list.addEventListener("click", e => {
  const id = e.target.closest(".task")?.dataset.id;
  if (!id) return;

  const task = tasks.find(t => t.id === id);
  if (!task) return;

  if (e.target.classList.contains("toggle")) {
    task.toggle();
  } else if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(t => t.id !== id);
  }

  update();
});

// Filter handling
filterBtns.forEach(btn =>
  btn.addEventListener("click", e => {
    filterBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    filter = e.target.dataset.filter;
    update();
  })
);

// Initial render
update();
