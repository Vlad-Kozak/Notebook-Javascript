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
    <div class="field name">${name}</div>
    <div class="field created">${created}</div>
    <div class="field category">${category.name}</div>
    <div class="field content">${
      content.length > 40 ? content.slice(0, 40) + "..." : content
    }</div>
    <div class="field dates">${dates}</div>
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
  </li>
`;
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
  </li>
`;
}
