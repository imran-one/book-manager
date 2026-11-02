const STATUS_LABELS = {
  "to-read": "À lire",
  reading: "En cours",
  read: "Lu",
};

const createEl = (tag, { className, text, dataset } = {}) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  if (dataset) Object.entries(dataset).forEach(([k, v]) => (el.dataset[k] = v));
  return el;
};

/* ===== Formulaire ===== */

export const getFormData = () => ({
  title: document.getElementById("title").value,
  author: document.getElementById("author").value,
  year: document.getElementById("year").value,
  genre: document.getElementById("genre").value,
  description: document.getElementById("description").value,
  status: document.getElementById("status").value,
});

export const fillForm = (book) => {
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("year").value = book.year ?? "";
  document.getElementById("genre").value = book.genre;
  document.getElementById("description").value = book.description;
  document.getElementById("status").value = book.status;
};

export const resetForm = () => {
  document.getElementById("book-form").reset();
};

export const setEditMode = (isEditing) => {
  document.getElementById("submit").textContent = isEditing
    ? "Enregistrer"
    : "Ajouter";
  document.getElementById("cancel-btn").classList.toggle("hidden", !isEditing);
};

/* ===== Erreurs ===== */

export const clearErrors = () => {
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
    el.classList.add("hidden");
  });
  document
    .querySelectorAll(".invalid")
    .forEach((el) => el.classList.remove("invalid"));
};

export const showErrors = (errors) => {
  Object.entries(errors).forEach(([field, message]) => {
    const p = document.getElementById(`erreur-${field}`);
    p.textContent = message;
    p.classList.remove("hidden");
    document.getElementById(field).classList.add("invalid");
  });
};

/* ===== Liste ===== */

const createBookItem = ({
  id,
  title,
  author,
  year,
  genre,
  description,
  status,
}) => {
  const li = createEl("li", { dataset: { id } });

  const info = createEl("div", { className: "book-info" });
  const details = [author, year, genre].filter(Boolean).join(" · ");
  info.append(
    createEl("h3", { text: title }),
    createEl("p", { text: details }),
  );
  if (description) {
    info.append(createEl("p", { className: "book-desc", text: description }));
  }
  info.append(
    createEl("span", {
      className: `status ${status}`,
      text: STATUS_LABELS[status],
    }),
  );

  const actions = createEl("div", { className: "book-actions" });
  actions.append(
    createEl("button", { text: "Modifier", dataset: { action: "edit" } }),
    createEl("button", {
      className: "btn-danger",
      text: "Supprimer",
      dataset: { action: "delete" },
    }),
  );

  li.append(info, actions);
  return li;
};

export const renderBooks = (books) => {
  const list = document.getElementById("book-list");
  list.replaceChildren();

  if (books.length === 0) {
    list.append(
      createEl("li", { className: "empty", text: "Aucun livre à afficher." }),
    );
    return;
  }

  list.append(...books.map(createBookItem));
};
