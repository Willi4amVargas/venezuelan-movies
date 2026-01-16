import { useMovie } from "@/context/MoviesContext";
import { useEffect } from "react";
import { Link } from "react-router";
import { useGender } from "@/context/GenderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiClock, FiFilm, FiPlay, FiArrowLeft } from "react-icons/fi";
import { FaTags } from "react-icons/fa";
import { RReviews } from "@/pages/Reviews/RReviews";
import { useWatchlist } from "@/context/WatchlistContext";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export function MovieDetail({
  id,
  redirectUrl,
  redirectText,
}: {
  id: number;
  redirectUrl?: string;
  redirectText?: string;
}) {
  const { movie, getMovies } = useMovie();
  const { movieGenders, getMovieGenders } = useGender();
  const { watchlist, createWatchlist, getWatchlist } = useWatchlist();
  const { user } = useUser();

  useEffect(() => {
    getMovies({ id: id });
    getMovieGenders(id);
  }, [id]);

  useEffect(() => {
    if (user && user.user) {
      if (!watchlist) getWatchlist({ user_id: user.user.id });
    }
  }, [user]);

  if (!movie) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center ">
        <div className="text-center animate-pulse">
          <FiFilm size={48} className="mx-auto mb-4 text-[#f07c42]" />
          <p className="text-xl text-white/60 font-display">
            Cargando película...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-display text-white selection:bg-[#f07c42]/30">
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url(${movie.coverUrl})`,
            filter: "brightness(0.3) blur(8px)",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#131315] via-[#131315]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 pb-12">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="hidden md:block w-64 aspect-2/3 bg-[#262627] rounded-xl shadow-2xl overflow-hidden border border-white/10 shrink-0 transform -translate-y-4">
              {movie.coverUrl ? (
                <img
                  src={movie.coverUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/20">
                  <FiFilm size={48} />
                </div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <Link
                to={redirectUrl || "/rmovies"}
                className="inline-flex items-center text-[#f07c42] hover:text-white transition-colors mb-4 text-sm font-bold tracking-widest uppercase"
              >
                <FiArrowLeft className="mr-2" /> {redirectText || "Volver"}
              </Link>

              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-[#508696]/20 text-[#508696] border-[#508696]/30 uppercase text-[10px] tracking-widest font-bold">
                  {movie.release}
                </Badge>
                <span className="text-white/60 text-sm flex items-center gap-2">
                  <FiClock /> {movie.duration} min
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase leading-none">
                {movie.title}
              </h2>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-[#f07c42] hover:bg-[#f07c42]/90 text-[#131315] font-bold px-8 py-6 rounded-xl text-lg"
                >
                  <a href={movie.trailer} target="_blank">
                    <FiPlay className="mr-2 fill-current" />
                    {movie.trailer
                      ? "Ver Trailer"
                      : "No hay trailer disponible"}
                  </a>
                </Button>
                {watchlist && watchlist.find((e) => e.movie_id === movie.id) ? (
                  <Button
                    variant="outline"
                    className="bg-green-300/5 border-green-400/10 backdrop-blur-sm py-6 px-8 rounded-xl font-bold"
                    disabled
                  >
                    Añadido en la lista
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 py-6 px-8 rounded-xl font-bold cursor-pointer"
                    onClick={() => {
                      if (!user || !user.user) {
                        toast.info(
                          "Debes iniciar sesión para añadir a la lista",
                          {
                            autoClose: false,
                            closeOnClick: true,
                            toastId: "required_session",
                            position: "top-right",
                          }
                        );
                        return;
                      }
                      createWatchlist({
                        movie_id: movie.id,
                        user: user.user.id,
                      });
                    }}
                  >
                    Añadir a mi lista
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 md:px-20 py-12 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
              <span className="border-b-2 border-[#f07c42] pb-4 px-2 text-sm font-bold tracking-wide cursor-default">
                RESUMEN
              </span>
              <span className="pb-4 px-2 text-sm font-bold tracking-wide hover:text-black/50 transition-colors cursor-pointer uppercase">
                Detalles Técnicos
              </span>
            </div>

            {movieGenders && movieGenders.length > 0 && (
              <section>
                <h3 className="text-xs font-bold text-[#f07c42] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <FaTags /> Géneros
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movieGenders.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="outline"
                      className="border-white/10 bg-slate-300/40 text-black hover:border-[#f07c42]/50 transition-colors px-4 py-1"
                    >
                      {genre.description}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-[#f07c42]"></span> Sinopsis
              </h3>
              <p className="text-lg text-black leading-relaxed font-light italic">
                {movie.description}
              </p>
              {movie.synopsis && (
                <p className="text-base text-white/80 leading-relaxed mt-4">
                  {movie.synopsis}
                </p>
              )}
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 text-center">Director</h3>
              <div className="flex flex-col text-center items-center gap-4">
                <div className="size-16 rounded-full bg-[#f07c42]/20 flex items-center justify-center text-[#f07c42] border border-[#f07c42]/30 text-xl font-bold">
                  {movie.director.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-bold">{movie.director.name}</p>
                  <p className="text-xs text-[#f07c42] uppercase tracking-widest font-bold">
                    Cineasta
                  </p>
                </div>
              </div>
            </section>
            <section>
              <RReviews movie_id={movie.id} />
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-[#262627] rounded-xl p-6 border border-white/10 space-y-6">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3 italic">
                  Detalles de Producción
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#f07c42] font-bold uppercase tracking-wider">
                      Director Principal
                    </span>
                    <span className="text-sm font-medium text-white">
                      {movie.director.name}
                    </span>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#f07c42] font-bold uppercase tracking-wider">
                      Año de Estreno
                    </span>
                    <span className="text-sm font-medium text-white">
                      {movie.release}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full text-white/50 hover:text-[#f07c42] text-[10px] uppercase font-bold tracking-widest"
              >
                Proponer Actualización
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
