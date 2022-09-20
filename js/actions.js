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
  const dates = [];

  function searchDatesFromText(text) {
    const index = text.indexOf("/");

    if (index === -1) return;

    if (text[index + 2] === "/") {
      const date = text.slice(index - 1, index + 7);
      dates.push(date);
      searchDatesFromText(text.slice(index + 8, text.length));
    } else searchDatesFromText(text.slice(index + 1, text.length));
  }
  searchDatesFromText(text);
  console.log(dates);
  if (dates.length === 0) return "";
  return dates.join(", ");
}
