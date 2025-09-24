"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBooksStore, Book } from "../../../store/useBooksStore";

export default function BookDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { fetchBookById, addReview } = useBooksStore();
  const [book, setBook] = useState<Book | null>(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (id) {
      fetchBookById(id).then((data) => {
        if (data) setBook(data);
      });
    }
  }, [id, fetchBookById]);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    await addReview(id, { text: review });
    const updated = await fetchBookById(id);
    if (updated) setBook(updated);
    setReview("");
  };

  if (!book) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <img
        src={book.image ?? "https://placehold.co/600x300"}
        alt={book.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">{book.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Publicado: {book.publicationDate ?? "Fecha desconocida"}
      </p>
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      <ul className="list-disc pl-5 mb-4">
        {book.reviews?.map((r) => (
          <li key={r.id}>{r.text}</li>
        ))}
      </ul>
      <form onSubmit={handleReview} className="flex gap-2">
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Escribe un review"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
