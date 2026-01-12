import { useUser, type IUser } from "@/context/UserContext";
import { MoviePreview } from "@/pages/Movies/components/MoviePreview";
import { useEffect } from "react";
import { Link } from "react-router";

export function UserCommon({ user }: { user: IUser }) {
  const { userMovies, getUserMovies } = useUser();

  useEffect(() => {
    if (!userMovies) {
      getUserMovies();
    }
  }, []);
  return (
    <section className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2 flex flex-col">
        <span>🎥 Mis peticiones de Peliculas</span>
        <b className="text-sm pt-2 text-gray-400">
          <i>{user.user.email}</i>
        </b>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5">
        {userMovies ? (
          userMovies.map((movie) => (
            <Link to={`/user/movie/${movie.id}`} key={`MOVIE-CARD-${movie.id}`}>
              <div className="flex flex-col">
                <MoviePreview {...movie} />
                {/* En la base de datos esta la lista de los estados deberia obtenerlos de hay pero se solucionara despues */}
                {movie.state === 1 ? (
                  <span className="text-center mt-2 rounded-2xl bg-orange-400">
                    EN ESPERA
                  </span>
                ) : movie.state === 2 ? (
                  <span className="text-center mt-2 rounded-2xl bg-green-400">
                    ACEPTADO
                  </span>
                ) : movie.state === 3 ? (
                  <span className="text-center mt-2 rounded-2xl bg-red-400">
                    RECHAZADO
                  </span>
                ) : (
                  <span className="text-center mt-2 rounded-2xl bg-blue-400">
                    ESTE ESTADO NO EXISTE
                  </span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="w-full col-span-full text-center text-muted-foreground">
            Cargando películas...
          </p>
        )}
      </div>
    </section>
  );
}
