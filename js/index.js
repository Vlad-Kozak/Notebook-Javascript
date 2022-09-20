import data from "./data.js";
import { refs } from "./refs.js";
import { renderAddForm, renderAll, renderEditForm } from "./render.js";
import {
  closeModalByClickOnBackdrop,
  closeModalByEsc,
  createNote,
  deleteNote,
  editNote,
  toggleArchiveNote,
  toggleModal,
} from "./actions.js";

export let notes = data.notes;
export let categories = data.categories;

renderAll(notes, categories);

document.body.addEventListener("click", (e) => {
  handleDeleteNoteBtn(e);
  handleArchiveNoteBtn(e);
  handleEditNoteBtn(e);
  handleToggleNotes(e);
});

refs.addNoteBtn.addEventListener("click", handleAddNoteBtn);
refs.showArchiveBtn.addEventListener("click", handleShowArchiveBtn);

function handleDeleteNoteBtn(e) {
  if (e.target.classList.contains("delete-btn-js")) {
    notes = deleteNote(e.target.dataset.id);
    renderAll(notes, categories);
  }
}

function handleArchiveNoteBtn(e) {
  if (e.target.classList.contains("archive-btn-js")) {
    notes = toggleArchiveNote(e.target.dataset.id);
    renderAll(notes, categories);
  }
}

function handleAddNoteBtn() {
  renderAddForm(categories);
  toggleModal();
  window.addEventListener("keydown", closeModalByEsc);
  refs.closeNoteModalBtn.addEventListener("click", toggleModal);
  refs.modalBackdrop.addEventListener("click", closeModalByClickOnBackdrop);
  refs.noteForm.removeEventListener("submit", handleEditSubmitNoteBtn);
  refs.noteForm.addEventListener("submit", handleAddSubmitNoteBtn);
}

function handleEditNoteBtn(e) {
  if (e.target.classList.contains("edit-btn-js")) {
    renderEditForm(notes, categories, e.target.dataset.id);
    toggleModal();
    window.addEventListener("keydown", closeModalByEsc);
    refs.closeNoteModalBtn.addEventListener("click", toggleModal);
    refs.modalBackdrop.addEventListener("click", closeModalByClickOnBackdrop);
    refs.noteForm.removeEventListener("submit", handleAddSubmitNoteBtn);
    refs.noteForm.addEventListener("submit", handleEditSubmitNoteBtn);
  }
}

function handleAddSubmitNoteBtn(e) {
  e.preventDefault();

  const { name, category, content } = e.target;

  if (
    name.value.trim().length === 0 ||
    category.value.length === 0 ||
    content.value.trim().length === 0
  ) {
    return alert("error");
  }

  createNote({
    name: name.value,
    categoryId: category.value,
    content: content.value,
  });

  e.target.reset();
  toggleModal();
}

function handleEditSubmitNoteBtn(e) {
  e.preventDefault();

  const { name, category, content } = e.target;

  if (
    name.value.trim().length === 0 ||
    category.value.length === 0 ||
    content.value.trim().length === 0
  ) {
    return alert("error");
  }

  notes = editNote({
    id: e.target.dataset.id,
    name: name.value,
    categoryId: category.value,
    content: content.value,
  });

  renderAll(notes, categories);

  e.target.reset();
  toggleModal();
}

function handleShowArchiveBtn() {
  refs.sectionArchivedNotes.classList.toggle("isHidden");

  if (refs.showArchiveBtn.textContent.trim() === "Show Archive") {
    refs.showArchiveBtn.textContent = "Close Archive";
  } else {
    refs.showArchiveBtn.textContent = "Show Archive";
  }
}

function handleToggleNotes(e) {
  if (e.target.classList.contains("name-js")) {
    toggleModal();
  }
}
