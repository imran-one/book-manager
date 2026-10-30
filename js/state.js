import { generateId } from "./utils.js";

const STORAGE_KEY = "books";

export const loadBooks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const addBook = (bookData) => {
  const books = loadBooks();

  const newBook = {
    id: generateId(),
    title: bookData.title.trim(),
    author: bookData.author.trim(),
    year: bookData.year === "" ? null : Number(bookData.year),
    genre: bookData.genre.trim(),
    description: bookData.description.trim(),
    status: bookData.status,
  };

  const updatedBooks = [...books, newBook];
  saveBooks(updatedBooks);
  return updatedBooks;
};