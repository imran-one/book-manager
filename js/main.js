import { loadBooks, addBook, updateBook, deleteBook } from "./state.js";
import {
  renderBooks,
  showErrors,
  clearErrors,
  getFormData,
  fillForm,
  resetForm,
  setEditMode,
} from "./ui.js";
import { validateBook, searchBooks, sortBooks } from "./utils.js";

const form = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const list = document.getElementById("book-list");

let editingId = null;

function refresh() {
  const filtered = searchBooks(loadBooks(), searchInput.value);
  renderBooks(sortBooks(filtered, sortSelect.value));
}

function exitEditMode() {
  editingId = null;
  setEditMode(false);
  resetForm();
  clearErrors();
}

/* ajouter ou modifier */
function handleSubmit(event) {
  event.preventDefault();

  const formData = getFormData();
  const errors = validateBook(formData);

  clearErrors();
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  if (editingId) {
    updateBook(editingId, formData);
    exitEditMode();
  } else {
    addBook(formData);
    resetForm();
  }
  refresh();
}

/* délégation d'événements sur la liste */
const handleListClick = (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.closest("li").dataset.id;
  const { action } = button.dataset;

  if (action === "edit") {
    const book = loadBooks().find((b) => b.id === id);
    if (!book) return;
    editingId = id;
    clearErrors();
    fillForm(book);
    setEditMode(true);
    form.scrollIntoView({ behavior: "smooth" });
  }

  if (action === "delete") {
    if (!confirm("Voulez-vous vraiment supprimer ce livre ?")) return;
    deleteBook(id);
    if (editingId === id) exitEditMode();
    refresh();
  }
};

form.addEventListener("submit", handleSubmit);
cancelBtn.addEventListener("click", exitEditMode);
list.addEventListener("click", handleListClick);
searchInput.addEventListener("input", refresh);
sortSelect.addEventListener("change", refresh);

refresh();
