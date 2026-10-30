export const getFormData = () => ({
  title: document.getElementById("title").value,
  author: document.getElementById("author").value,
  year: document.getElementById("year").value,
  genre: document.getElementById("genre").value,
  description: document.getElementById("description").value,
  status: document.getElementById("status").value,
});

export const resetForm = () => {
  document.getElementById("book-form").reset();
}

export const clearErrors = () => {
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
    el.classList.add("hidden");
  });
}

export const showErrors = (errors) => {
  Object.entries(errors).forEach(([field, message]) => {
    const p = document.getElementById(`erreur-${field}`);
    p.textContent = message;
    p.classList.remove("hidden");
  });
};