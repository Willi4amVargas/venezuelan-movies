import { useMovie } from "@/context/MoviesContext";
import { useEffect } from "react";
import { Link } from "react-router";
import { SearchMovies } from "@/pages/Movies/components/SearchMovies";
import { MoviePreview } from "@/pages/Movies/components/MoviePreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Watchlist } from "./components/Watchlist";
import { useUser } from "@/context/UserContext";

export function RMovies({ adminView }: { adminView?: boolean }) {
  const { movies, getMovies, updateMovie } = useMovie();
  const { user } = useUser();

  const handleStateChange = (movieId: number, newState: string) => {
    updateMovie({
      id: movieId,
      movie: { state: parseInt(newState) },
    });
    getMovies();
  };

  useEffect(() => {
    if (adminView) {
      getMovies();
    } else {
      getMovies({ state: 2 });
    }
  }, [adminView]);

  return (
    <section className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2">
        {adminView
          ? "🛠️ Gestión de Catálogo"
          : "🎥 Catálogo de Películas Venezolanas"}
      </h2>

      <div className="mb-6">
        <SearchMovies adminView={adminView} />
        {user && user.user && <Watchlist />}
        {adminView && (
          <Button asChild variant="link">
            <Link to={"/user/admin"} className="flex items-center space-x-2">
              <FaArrowLeft />
              <span>Regresar al panel anterior</span>
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5">
        {movies ? (
          movies.map((movie) => (
            <div
              key={`MOVIE-CONTAINER-${movie.id}`}
              className="flex flex-col space-y-2"
            >
              <Link
                to={
                  adminView
                    ? `/user/admin/movies/${movie.id}`
                    : `/rmovies/${movie.id}`
                }
                className="block transition-transform hover:scale-[1.02]"
              >
                <MoviePreview {...movie} />
              </Link>

              {adminView && (
                <div className="mt-auto">
                  <Select
                    defaultValue={movie.state.toString()}
                    onValueChange={(value) =>
                      handleStateChange(movie.id, value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full font-bold text-white border-none ${
                        movie.state === 1
                          ? "bg-orange-500 hover:bg-orange-600"
                          : movie.state === 2
                          ? "bg-green-600 hover:bg-green-700"
                          : movie.state === 3
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-500"
                      }`}
                    >
                      <SelectValue placeholder="Cambiar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">🟠 En Espera</SelectItem>
                      <SelectItem value="2">🟢 Aceptado</SelectItem>
                      <SelectItem value="3">🔴 Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="w-full col-span-full text-center text-muted-foreground py-10">
            Cargando películas...
          </p>
        )}
      </div>
    </section>
  );
}
