// store/useAuthorsStore.ts
import { create } from "zustand";

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
}

interface AuthorsState {
  authors: Author[];
  fetchAuthors: () => Promise<void>;
  addAuthor: (author: Omit<Author, "id">) => Promise<void>;
  updateAuthor: (id: number, updated: Omit<Author, "id">) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
}

export const useAuthorsStore = create<AuthorsState>((set) => ({
  authors: [],

  fetchAuthors: async () => {
    const res = await fetch("http://127.0.0.1:8080/api/authors");
    const data: Author[] = await res.json();
    set({ authors: data });
  },

  addAuthor: async (author) => {
    const res = await fetch("http://127.0.0.1:8080/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    });
    const newAuthor: Author = await res.json();
    set((state) => ({ authors: [...state.authors, newAuthor] }));
  },

  updateAuthor: async (id, updated) => {
    const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const updatedAuthor: Author = await res.json();
    set((state) => ({
      authors: state.authors.map((a) =>
        a.id === id ? updatedAuthor : a
      ),
    }));
  },

  deleteAuthor: async (id) => {
    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, { method: "DELETE" });
    set((state) => ({
      authors: state.authors.filter((a) => a.id !== id),
    }));
  },
}));
