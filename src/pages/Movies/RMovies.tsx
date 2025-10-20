import { useMovie } from "@/context/MoviesContext";
import type { Tables } from "@/interface/database";
import { useEffect } from "react";

function MovieComponent(movie: Tables<"movies">) {
  return (
    <>
      <div className="border border-black rounded px-4 py-2 text-center">
        <h4 className="text-[2rem]">{movie.title}</h4>
        <p>{movie.description}</p>
        <p className="text-start">
          Año: <b>{movie.release_year}</b>
        </p>
        <p className="text-start">
          Director: <i>{movie.director}</i>
        </p>
      </div>
    </>
  );
}

export function RMovies() {
  const { movies, getMovies } = useMovie();

  useEffect(() => {
    if (!movies) getMovies();
  }, [movies]);

  return (
    <>
      <section className="mx-20">
        <div className="grid grid-cols-4">
          {movies &&
            movies.map((movie) => (
              <MovieComponent key={`MOVIE-${movie.id}`} {...movie} />
            ))}
        </div>
      </section>
    </>
  );
}
