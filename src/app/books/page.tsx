"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useBooksStore } from "../../store/useBooksStore";

export default function BooksPage() {
  const { books, fetchBooks } = useBooksStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Libros</h1>
          <Link
            href="/crear"
            className="text-sm text-gray-600 hover:underline"
          >
            Crear Autor
          </Link>
        </div>

        {books.length === 0 ? (
          <p className="text-gray-500">No hay libros registrados.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <li
                key={book.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col"
              >
                <div className="h-40 w-full mb-3 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                  <img
                    src={book.image ?? "https://placehold.co/300x200"}
                    alt={book.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {book.publicationDate ?? "Fecha desconocida"}
                </p>
                <p className="text-gray-700 mt-3 line-clamp-3">
                  {book.description}
                </p>
                <div className="mt-auto pt-3">
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                  >
                    Ver detalle
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
