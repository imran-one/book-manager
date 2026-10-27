export const generateId = () => Date.now().toString();

export const validateBook = ({ title, author, year }) => {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Le titre est obligatoire";
  }

  if (!author.trim()) {
    errors.author = "L'auteur est obligatoire";
  }

  if (year !== "" && (!Number.isInteger(Number(year)) || Number(year) < 0 || Number(year) > new Date().getFullYear())) {
    errors.year = "L'année doit être un nombre valide";
  }

  return errors;
};
