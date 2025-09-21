"use client";

import { useEffect, useState } from "react";
import { useAuthorsStore, Author } from "../../store/useAuthorsStore";

export default function AuthorsPage() {
  const { authors, fetchAuthors, deleteAuthor, updateAuthor } = useAuthorsStore();
  const [editing, setEditing] = useState<Author | null>(null);
  const [form, setForm] = useState<Omit<Author, "id">>({
    name: "",
    birthDate: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleEdit = (author: Author) => {
    setEditing(author);
    setForm({
      name: author.name,
      birthDate: author.birthDate,
      description: author.description,
      image: author.image,
    });
  };

  const handleUpdate = async () => {
    if (editing) {
      await updateAuthor(editing.id, form);
      setEditing(null);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Autores</h1>
      {authors.length === 0 ? (
        <p className="text-gray-500">No hay autores aún.</p>
      ) : (
        <ul className="space-y-4">
          {authors.map((author) => (
            <li
              key={author.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              {editing?.id === author.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) =>
                      setForm({ ...form, birthDate: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold">{author.name}</h2>
                  <p className="text-sm text-gray-600">{author.birthDate}</p>
                  <p className="mt-2">{author.description}</p>
                  {author.image && (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-24 h-24 object-cover mt-2"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteAuthor(author.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
