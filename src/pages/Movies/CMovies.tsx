import { Input } from "@/components/ui/input";
import { useDirector } from "@/context/DirectorContext";
import { useMovie } from "@/context/MoviesContext";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";

export function CMovies() {
  const { newMovie, setNewMovie, createMovie } = useMovie();
  const { directors, getDirectors } = useDirector();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMovie) {
      toast.error("Necesita llenar todos los campos");
      return;
    }

    if (!newMovie.title || !newMovie.description) {
      toast.error("Necesita llenar los campos de titulo y descripción");
      return;
    }

    if (!newMovie.coverFile) {
      toast.error("Por favor seleccione una carátula para la película");
      return;
    }

    if (!newMovie.release) {
      toast.error("Por favor ingrese una fecha de lanzamiento valida");
      return;
    }

    if (Number.isNaN(newMovie.duration)) {
      toast.error("La duracion tiene que ser un numero valido");
      return;
    }

    if (!newMovie.director || newMovie.director === -1) {
      toast.error("Por favor seleccione un director");
      return;
    }
    await createMovie(newMovie);
  };

  useEffect(() => {
    if (!directors) {
      getDirectors();
    }
  }, [directors]);

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Titulo</label>
          <Input
            id="title"
            type="text"
            className="mb-4"
            value={newMovie && newMovie.title}
            onChange={(e) =>
              setNewMovie({ ...newMovie, title: e.currentTarget.value })
            }
          />
          <label htmlFor="cover">Carátula</label>
          <Input
            id="cover"
            type="file"
            className="mb-4"
            onChange={(e) => {
              console.log(e.currentTarget.files[0]);
              setNewMovie({ ...newMovie, coverFile: e.currentTarget.files[0] });
            }}
            accept="image/*"
          />
          <label htmlFor="description">Descripcion</label>
          <Input
            id="description"
            type="text"
            className="mb-4"
            value={newMovie && newMovie.description}
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.currentTarget.value })
            }
          />
          <label htmlFor="release_year">Año de lanzamiento</label>
          <Input
            id="release_year"
            type="date"
            className="mb-4"
            value={newMovie && newMovie.release}
            onChange={(e) =>
              setNewMovie({ ...newMovie, release: e.currentTarget.value })
            }
          />
          <label htmlFor="director">Director</label>
          <div className="flex mb-3 items-center ">
            <select
              name="director"
              id="director"
              style={{ border: "1px solid var(--input)" }}
              className="w-full rounded-md px-3 py-2"
              onChange={(e) =>
                setNewMovie({ ...newMovie, director: +e.currentTarget.value })
              }
            >
              <option value="">Seleccione un director...</option>
              {directors &&
                directors.map((director) => {
                  if (newMovie && newMovie.director === director.id) {
                    return (
                      <option key={director.id} value={director.id} selected>
                        {director.name}
                      </option>
                    );
                  }

                  return (
                    <option key={director.id} value={director.id}>
                      {director.name}
                    </option>
                  );
                })}
            </select>
            <Link to={"/cdirector"} className="mx-2">
              <FaCirclePlus />
            </Link>
          </div>
          <label htmlFor="duration">Duracion</label>
          <Input
            id="duration"
            type="number"
            className="mb-4"
            value={newMovie && newMovie.duration}
            onChange={(e) =>
              setNewMovie({ ...newMovie, duration: +e.currentTarget.value })
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
