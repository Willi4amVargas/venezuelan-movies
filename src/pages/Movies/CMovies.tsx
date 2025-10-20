import { Input } from "@/components/ui/input";

export function CMovies() {
  return (
    <>
      <section className="flex justify-center items-center w-full">
        <form action="">
          <label htmlFor="title">Titulo</label>
          <Input id="title" type="text" className="mb-4" />
          <label htmlFor="description">Descripcion</label>
          <Input id="description" type="text" className="mb-4" />
          <label htmlFor="release_year">Año de lanzamiento</label>
          <Input id="release_year" type="date" className="mb-4" />
          <label htmlFor="director">Director</label>
          <Input id="director" type="text" className="mb-4" />
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
