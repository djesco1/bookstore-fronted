"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthorsStore } from "../../store/useAuthorsStore";

export default function CrearAutorPage() {
  const { addAuthor } = useAuthorsStore();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAuthor(form);
    router.push("/authors");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Autor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
