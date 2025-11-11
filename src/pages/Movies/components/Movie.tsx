import { useMovie } from "@/context/MoviesContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FiClock, FiCalendar, FiUser, FiFilm } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Movie() {
  let { id } = useParams();
  const { movies, getMovies } = useMovie();

  useEffect(() => {
    if (!movies) getMovies();
  }, [movies, getMovies]);

  const movie = movies?.find((m) => m.id === +id);

  if (!movie) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="p-8 text-center text-xl text-muted-foreground">
          Cargando detalles de la película o no encontrada...
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <section className="p-4 md:p-8 w-full max-w-5xl mx-auto">
        <Link to={"/rmovies"}>
          <Button variant="outline" className="mb-6">
            <IoArrowBackOutline size={20} className="mr-2" />
            Volver al Catálogo
          </Button>
        </Link>

        <Card className="overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 relative h-96 lg:h-full bg-muted flex items-center justify-center overflow-hidden">
              {movie.coverUrl ? (
                <img
                  src={movie.coverUrl}
                  alt={`Carátula de ${movie.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  <FiFilm size={48} className="mx-auto mb-2" />
                  Carátula no disponible
                </div>
              )}
            </div>

            <div className="lg:col-span-2 p-6 md:p-8 space-y-6">
              <CardHeader className="p-0 pb-4 border-b">
                <CardTitle className="text-4xl font-extrabold tracking-tight">
                  {movie.title}
                </CardTitle>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Badge variant="secondary" className="text-base py-1">
                    <FiCalendar className="mr-1" /> {movie.release}
                  </Badge>
                  <Badge className="text-base py-1">
                    <FiClock className="mr-1" /> {movie.duration} min
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Descripción
                </h3>
                <p className="text-muted-foreground">{movie.description}</p>

                {movie.synopsis && (
                  <>
                    <h3 className="text-lg font-semibold text-primary pt-4">
                      Sinopsis Detallada
                    </h3>
                    <p className="text-foreground">{movie.synopsis}</p>
                  </>
                )}
              </CardContent>

              <Separator />

              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
                  <FiUser /> <span>Director(a): {movie.director.name}</span>
                </h3>
                {movie.director.birth && (
                  <p className="text-sm text-muted-foreground">
                    <b>Nacimiento:</b>
                    <Badge variant="outline">{movie.director.birth}</Badge>
                  </p>
                )}
                {movie.director.biography && (
                  <>
                    <h4 className="text-md font-semibold mt-4">
                      Biografía del Director
                    </h4>
                    <p className="text-sm italic text-foreground/80">
                      {movie.director.biography}
                    </p>
                  </>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
