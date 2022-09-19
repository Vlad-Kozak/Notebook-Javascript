import {
  makeMarkupAddForm,
  makeMarkupCategories,
  makeMarkupEditForm,
  makeMarkupNoteModalCategories,
  makeMarkupNotes,
} from "./markup.js";
import { refs } from "./refs.js";

export function renderAll(notes, categories) {
  renderNotes(notes, categories);
  renderArchivedNotes(notes, categories);
  renderCategories(notes, categories);
}

export function renderNotes(notes, categories) {
  const markup = notes
    .filter((el) => el.archived === false)
    .map((el) => makeMarkupNotes(el, categories))
    .join("");
  refs.tableNotes.innerHTML = markup;
}

export function renderArchivedNotes(notes, categories) {
  const markup = notes
    .filter((el) => el.archived === true)
    .map((el) => makeMarkupNotes(el, categories))
    .join("");
  refs.tableArchivedNotes.innerHTML = markup;
}

export function renderCategories(notes, categories) {
  const count = getNotesCount(notes);
  const markup = categories
    .map((el) => {
      if (!count[el.id]) {
        count[el.id] = { countActive: 0, countArchived: 0 };
      }
      return makeMarkupCategories(
        el,
        count[el.id].countActive,
        count[el.id].countArchived
      );
    })
    .join("");
  refs.tableCategories.innerHTML = markup;
}

export function renderModalCategories(categories, id) {
  const markup = categories
    .map((el) => {
      return el.id === id
        ? makeMarkupNoteModalCategories(el, true)
        : makeMarkupNoteModalCategories(el);
    })
    .join("");
  refs.categorySelection.innerHTML = markup;
}

export function renderAddForm(categories) {
  const markup = makeMarkupAddForm();
  refs.noteFormName.innerHTML = markup.name;
  refs.noteFormContent.innerHTML = markup.content;
  refs.noteFormSubmitBtn.innerHTML = markup.btnIcon;
  renderModalCategories(categories);
}

export function renderEditForm(notes, categories, id) {
  const note = notes.find((el) => el.id === id);
  const markup = makeMarkupEditForm(note.name, note.content);
  refs.noteFormName.innerHTML = markup.name;
  refs.noteFormContent.innerHTML = markup.content;
  refs.noteFormSubmitBtn.innerHTML = markup.btnIcon;
  refs.noteForm.dataset.id = id;
  renderModalCategories(categories, note.categoryId);
}

function getNotesCount(notes) {
  let count = {};

  notes.forEach((el) => {
    if (count[el.categoryId]) {
      el.archived
        ? (count[el.categoryId].countArchived += 1)
        : (count[el.categoryId].countActive += 1);
    }
    if (!count[el.categoryId]) {
      el.archived
        ? (count[el.categoryId] = { countArchived: 1, countActive: 0 })
        : (count[el.categoryId] = { countArchived: 0, countActive: 1 });
    }
  });

  return count;
}
