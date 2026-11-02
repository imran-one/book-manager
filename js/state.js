import { generateId } from "./utils.js";

const STORAGE_KEY = "books";

export const loadBooks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

const normalize = (bookData) => ({
  title: bookData.title.trim(),
  author: bookData.author.trim(),
  year: bookData.year === "" ? null : Number(bookData.year),
  genre: bookData.genre.trim(),
  description: bookData.description.trim(),
  status: bookData.status,
});

export const addBook = (bookData) => {
  const newBook = { id: generateId(), ...normalize(bookData) };
  const updatedBooks = [...loadBooks(), newBook];
  saveBooks(updatedBooks);
  return updatedBooks;
};

export const updateBook = (id, bookData) => {
  const updatedBooks = loadBooks().map((book) =>
    book.id === id ? { ...book, ...normalize(bookData) } : book,
  );
  saveBooks(updatedBooks);
  return updatedBooks;
};

export const deleteBook = (id) => {
  const updatedBooks = loadBooks().filter((book) => book.id !== id);
  saveBooks(updatedBooks);
  return updatedBooks;
};