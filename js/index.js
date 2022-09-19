import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

import data from "./data.js";
import { refs } from "./refs.js";
import { renderAll } from "./render.js";

let notes = data.notes;
let categories = data.categories;

renderAll(notes, categories);

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn-js")) {
    deleteNote(e.target.dataset.id);
  }
  if (e.target.classList.contains("archive-btn-js")) {
    toggleArchiveNote(e.target.dataset.id);
  }
});

function toggleArchiveNote(id) {
  notes = notes.map((el) => {
    if (el.id === id) {
      el.archived = !el.archived;
    }
    return el;
  });
  console.log(notes);
  renderAll(notes, categories);
}

function deleteNote(id) {
  notes = notes.filter((el) => el.id !== id);
  renderAll(notes, categories);
}

function createNote({ name, categoryId, content }) {
  notes.push({
    id: nanoid(),
    name,
    created: Date.now,
    categoryId,
    content,
    dates: "",
    archived: false,
  });
}
