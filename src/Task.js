// Task.js — defines Task entity and invariants

export class Task {
  constructor(title) {
    if (!title || !title.trim()) {
      throw new Error("Task title cannot be empty");
    }
    this.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    this.title = title.trim();
    this.done = false;
  }

  toggle() {
    this.done = !this.done;
  }
}
