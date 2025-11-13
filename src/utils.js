// utils.js — helper utilities

// Generates a unique ID using current timestamp and random part
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Escapes HTML special characters to prevent injection
export function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
