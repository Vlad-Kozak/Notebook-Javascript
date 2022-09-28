import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

import { notes, categories } from "./index.js";
import { refs } from "./refs.js";
import { renderAll } from "./render.js";

export function toggleArchiveNote(id) {
  const newNotes = notes.map((el) => {
    if (el.id === id) {
      el.archived = !el.archived;
    }
    return el;
  });
  return newNotes;
}

export function deleteNote(id) {
  const newNotes = notes.filter((el) => el.id !== id);
  return newNotes;
}

export function createNote({ name, categoryId, content }) {
  const dates = getDatesFromText(content);
  notes.push({
    id: nanoid(),
    name,
    created: Date.now(),
    categoryId,
    content,
    dates,
    archived: false,
  });
  renderAll(notes, categories);
}

export function editNote({ id, name, categoryId, content }) {
  const dates = getDatesFromText(content);
  const newNotes = notes.map((el) => {
    if (el.id === id) {
      return {
        id,
        name,
        created: el.created,
        categoryId,
        content,
        dates,
        archived: el.archived,
      };
    }
    return el;
  });
  return newNotes;
}

export function toggleNote(id) {
  console.log(id);
}

export function toggleModal() {
  document.body.classList.toggle("modal-open");
  refs.modalBackdrop.classList.toggle("is-hidden");
}

export function closeModalByEsc(e) {
  if (e.code === "Escape") {
    toggleModal();
    window.removeEventListener("keydown", closeModalByEsc);
  }
}

export function closeModalByClickOnBackdrop(e) {
  if (e.target === e.currentTarget) {
    toggleModal();
    refs.modalBackdrop.removeEventListener(
      "click",
      closeModalByClickOnBackdrop
    );
  }
}

function getDatesFromText(text) {
  let dates = [];

  const regexp1 = /\d\.\d\.\d{4}/g;
  const regexp2 = /\d{2}\.\d{2}\.\d{4}/g;
  const regexp3 = /\d\/\d\/\d{4}/g;
  const regexp4 = /\d{2}\/\d{2}\/\d{4}/g;

  const result1 = text.match(regexp1);
  const result2 = text.match(regexp2);
  const result3 = text.match(regexp3);
  const result4 = text.match(regexp4);

  if (result1) {
    dates = [...dates, ...result1];
  }
  if (result2) {
    dates = [...dates, ...result2];
  }
  if (result3) {
    dates = [...dates, ...result3];
  }
  if (result4) {
    dates = [...dates, ...result4];
  }

  return dates.join(", ");
}
