import { notes, categories } from "./js/data";
import { refs } from "./js/refs";

(firstRender = () => {})();

const makeMarkupNotes = (
  { name, created, categoryId, content, dates, archived },
  categories
) => {
  return `
  <tr class="line">
    <td class="icon">${imageUrl}</td>
    <td class="name">${name}</td>
    <td class="created">${created}</td>
    <td class="category">Lorem, ipsum.</td>
    <td class="content">${content}</td>
    <td class="dates">${dates}</td>
    <td class="edit">X</td>
    <td class="archive">X</td>
    <td class="delete">X</td>
  </tr>
`;
};
