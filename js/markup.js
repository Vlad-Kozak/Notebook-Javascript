export function makeMarkupNotes(
  { id, name, created, categoryId, content, dates },
  categories
) {
  const category = categories.find((el) => el.id === categoryId);

  return `
  <li class="line" data-id="${id}">
    <div class="field icon">
      <div class="category-icon">
        <img src="${category.imageUrl}" alt="" />
      </div>
    </div>
    <div class="field name">${
      name.length > 20 ? name.slice(0, 20) + "..." : name
    }</div>
    <div class="field created">${new Date(created).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    })}</div>
    <div class="field category">${category.name}</div>
    <div class="field content content-js">${
      content.length > 40 ? content.slice(0, 40) + "..." : content
    }</div>
    <div class="field dates">${
      dates.length > 18 ? dates.slice(0, 18) + "..." : dates
    }</div>
    <div class="field edit">
      <button class="btn-with-icon" type="button"  >
        <img class="btn-icon edit-btn-js" src="./images/edit.svg" alt="" data-id="${id}"/>
      </button>
    </div>
    <div class="field archive">
      <button class="btn-with-icon" type="button">
        <img class="btn-icon archive-btn-js" src="./images/archive.svg" alt="" data-id="${id}"/>
      </button>
    </div>
    <div class="field delete">
      <button class="btn-with-icon" type="button" >
        <img class="btn-icon delete-btn-js" src="./images/delete.svg" alt=""  data-id="${id}"/>
      </button>
    </div>
  </li>`;
}

export function makeMarkupCategories(
  { id, name, imageUrl },
  countActive,
  countArchived
) {
  return `
  <li class="line" data-id="${id}">
    <div class="field icon">
      <div class="category-icon">
        <img src="${imageUrl}" alt="" />
      </div>
    </div>
    <div class="field category">${name}</div>
    <div class="field active">${countActive ?? 0}</div>
    <div class="field archived">${countArchived ?? 0}</div>
  </li>`;
}

export function makeMarkupAddForm() {
  return {
    name: `Name
          <input class="note-form-name-input" type="text" name="name" />`,
    content: `Content
            <textarea class="note-form-content-input" name="content"></textarea>`,
    btnIcon: `<img class="note-form-submit-icon" src="./images/add.svg" alt="" />`,
  };
}

export function makeMarkupEditForm(name, content) {
  return {
    name: `Name
          <input class="note-form-name-input" type="text" name="name" value="${name}"/>`,
    content: `Content
            <input class="note-form-content-input" name="content" value="${content}" />`,
    btnIcon: `<img class="note-form-submit-icon" src="./images/confirm.svg" alt="" />`,
  };
}

export function makeMarkupNoteModalCategories({ id, name }, checked) {
  return `
  <label class="note-form-category-label">
    <input
      class="note-form-category-input"
      name="category"
      type="radio"
      value="${id}"
      ${checked && "checked"}
    />
    ${name}
  </label>`;
}
