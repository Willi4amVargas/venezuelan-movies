import { Input } from "@/components/ui/input";
import { useMovie } from "@/context/MoviesContext";
import type { TablesInsert } from "database.types";
import { useState } from "react";
import { toast } from "react-toastify";

export function CMovies() {
  const [formData, setFormData] = useState<TablesInsert<"movies">>({
    title: "",
    description: "",
    release: "",
    director: 0,
    duration: 0,
  });

  const { createMovie } = useMovie();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData.release) {
      toast.error("Please provide a valid release date.");
      return;
    }

    if (Number.isNaN(formData.director) || Number.isNaN(formData.duration)) {
      toast.error(
        "Please provide valid numeric values for director and duration."
      );
      return;
    }

    await createMovie(formData);
  };

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Titulo</label>
          <Input
            id="title"
            type="text"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, title: e.currentTarget.value })
            }
          />
          <label htmlFor="description">Descripcion</label>
          <Input
            id="description"
            type="text"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
          />
          <label htmlFor="release_year">Año de lanzamiento</label>
          <Input
            id="release_year"
            type="date"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, release: e.currentTarget.value })
            }
          />
          <label htmlFor="director">Director</label>
          <Input
            id="director"
            type="text"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, director: +e.currentTarget.value })
            }
          />
          <label htmlFor="duration">Duracion</label>
          <Input
            id="duration"
            type="number"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, duration: +e.currentTarget.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar Pelicula
          </button>
        </form>
      </section>
    </>
  );
}
