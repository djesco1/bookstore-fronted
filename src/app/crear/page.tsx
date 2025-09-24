"use client";

import { useState } from "react";

export default function CrearAutorPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookDate, setBookDate] = useState("");

  const [prizeName, setPrizeName] = useState("");
  const [prizeYear, setPrizeYear] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authorRes = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, description, image }),
      });
      if (!authorRes.ok) throw new Error("Error creando autor");
      const author = await authorRes.json();

      const bookRes = await fetch("http://127.0.0.1:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: bookTitle,
          description: bookDescription,
          image: bookImage,
          publicationDate: bookDate,
        }),
      });
      if (!bookRes.ok) throw new Error("Error creando libro");
      const book = await bookRes.json();

      const prizeRes = await fetch("http://127.0.0.1:8080/api/prizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: prizeName, year: prizeYear }),
      });
      if (!prizeRes.ok) throw new Error("Error creando premio");
      const prize = await prizeRes.json();

      await fetch(
        `http://127.0.0.1:8080/api/authors/${author.id}/books/${book.id}`,
        { method: "POST" }
      );

      await fetch(
        `http://127.0.0.1:8080/api/prizes/${prize.id}/author/${author.id}`,
        { method: "POST" }
      );

      alert("Autor creado con libro y premio asociado correctamente");

      setName("");
      setBirthDate("");
      setDescription("");
      setImage("");
      setBookTitle("");
      setBookDescription("");
      setBookImage("");
      setBookDate("");
      setPrizeName("");
      setPrizeYear("");
    } catch (err) {
      console.error(err);
      alert("Hubo un error creando el autor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Crear Autor con Libro y Premio</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Autor</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <input
            type="text"
            placeholder="URL de Imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Libro</h2>
          <input
            type="text"
            placeholder="Título"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <textarea
            placeholder="Descripción"
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <input
            type="text"
            placeholder="URL de Imagen"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
          />
          <input
            type="date"
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Premio</h2>
          <input
            type="text"
            placeholder="Nombre del premio"
            value={prizeName}
            onChange={(e) => setPrizeName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-2"
            required
          />
          <input
            type="number"
            placeholder="Año"
            value={prizeYear}
            onChange={(e) => setPrizeYear(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          {loading ? "Creando..." : "Crear Autor"}
        </button>
      </form>
    </div>
  );
}
