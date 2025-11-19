import { useEffect } from "react";
import { type MovieWithCoverUrl } from "@/context/MoviesContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiFilm, FiCalendar } from "react-icons/fi";
import { PiImageSquareFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";

function MovieComponent(movie: MovieWithCoverUrl) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full aspect-2/3 bg-muted flex items-center justify-center rounded-t-lg overflow-hidden">
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
      </CardContent>
    </Card>
  );
}

export function User() {
  const { user, approvedMovies, getApprovedMovies } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!approvedMovies) {
      getApprovedMovies();
    }
  }, [approvedMovies]);

  useEffect(() => {
    if (!user) navigate("/user/login");
  }, [user]);

  return (
    <section className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2">
        🎥 Peliculas Aprobadas ✅
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5">
        {approvedMovies ? (
          approvedMovies.map((movie) => (
            <Link to={`/rmovies/${movie.id}`} key={`MOVIE-CARD-${movie.id}`}>
              <MovieComponent {...movie} />
            </Link>
          ))
        ) : user ? (
          <p className="w-full col-span-full text-center text-muted-foreground">
            Cargando películas...
          </p>
        ) : (
          <p className="w-full col-span-full text-center text-red-500">
            Tienes que iniciar sesión para ver esto
          </p>
        )}
      </div>
    </section>
  );
}
