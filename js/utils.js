export const generateId = () => Date.now().toString();

export const validateBook = ({ title, author, year }) => {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Le titre est obligatoire";
  }

  if (!author.trim()) {
    errors.author = "L'auteur est obligatoire";
  }

  if (
    year !== "" &&
    (!Number.isInteger(Number(year)) ||
      Number(year) < 0 ||
      Number(year) > new Date().getFullYear())
  ) {
    errors.year =
      "L'année doit être un nombre entier entre 0 et l'année en cours";
  }

  return errors;
};

export const searchBooks = (books, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return books;
  return books.filter(
    ({ title, author }) =>
      title.toLowerCase().includes(q) || author.toLowerCase().includes(q),
  );
};

export const sortBooks = (books, key) =>
  [...books].sort((a, b) => {
    if (key === "year") {
      // les livres sans année vont à la fin
      if (a.year === null && b.year === null) return 0;
      if (a.year === null) return 1;
      if (b.year === null) return -1;
      return a.year - b.year;
    }
    return a[key].localeCompare(b[key], "fr", { sensitivity: "base" });
  });
