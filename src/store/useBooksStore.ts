import { create } from "zustand";

export interface Review {
  id: number;
  text: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  image?: string;
  publicationDate?: string;
  reviews?: Review[];
}

interface BooksState {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: number) => Promise<Book | null>;
  addReview: (bookId: number, review: { text: string }) => Promise<void>;
}

export const useBooksStore = create<BooksState>((set) => ({
  books: [],
  fetchBooks: async () => {
    const res = await fetch("http://127.0.0.1:8080/api/books");
    const data: Book[] = await res.json();
    set({ books: data });
  },
  fetchBookById: async (id: number) => {
    const res = await fetch(`http://127.0.0.1:8080/api/books/${id}`);
    if (!res.ok) return null;
    return await res.json() as Book;
  },
  addReview: async (bookId: number, review: { text: string }) => {
    await fetch(`http://127.0.0.1:8080/api/books/${bookId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const res = await fetch("http://127.0.0.1:8080/api/books");
    const data: Book[] = await res.json();
    set({ books: data });
  },
}));
