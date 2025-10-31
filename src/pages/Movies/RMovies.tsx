import {
  useMovie,
  type MovieWithDirectorAndCoverUrl,
} from "@/context/MoviesContext";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiFilm, FiCalendar, FiUser } from "react-icons/fi";
import { PiImageSquareFill } from "react-icons/pi";

function MovieComponent(movie: MovieWithDirectorAndCoverUrl) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full aspect-2/3 bg-muted flex items-center justify-center rounded-t-lg overflow-hidden">
        {/* Este será el espacio para tu imagen de carátula */}
        <span className="text-muted-foreground text-sm font-semibold p-4 text-center">
          {movie.coverUrl ? (
            <img src={movie.coverUrl} alt={`MOVIE-${movie.title}`} />
          ) : (
            <PiImageSquareFill size={30} />
          )}
        </span>
      </div>

      <CardHeader className="grow pb-2">
        <CardTitle className="text-xl font-bold flex items-center space-x-2">
          <FiFilm className="text-primary" />
          <span>{movie.title}</span>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {movie.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-4 space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <FiCalendar size={16} />
          <p>
            Año:
            <Badge variant="secondary" className="font-semibold">
              {movie.release}
            </Badge>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <FiUser size={16} />
          <p>
            Director:
            <span className="font-medium text-foreground">
              {movie.director.name}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente principal de la vista
export function RMovies() {
  const { movies, getMovies } = useMovie();

  useEffect(() => {
    if (!movies) getMovies();
  }, [movies]);

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2">
        🎥 Catálogo de Películas Venezolanas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5">
        {movies ? (
          movies.map((movie) => (
            <MovieComponent key={`MOVIE-${movie.id}`} {...movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            Cargando películas...
          </p>
        )}
      </div>
    </section>
  );
}
