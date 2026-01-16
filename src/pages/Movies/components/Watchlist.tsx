import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FiHeart, FiFilm, FiArrowRight, FiTrash2 } from "react-icons/fi";

export function Watchlist() {
  const { watchlist, getWatchlist, deleteWatchlist } = useWatchlist();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.user) {
      getWatchlist({ user_id: user.user.id });
    }
  }, [user]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:text-[#f07c42] hover:bg-white/5 gap-2 font-bold uppercase tracking-widest text-xs"
        >
          <FiHeart className="text-[#f07c42] fill-[#f07c42]/20" size={18} />
          Mi Lista
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#131315] border-white/10 text-white max-w-md sm:max-w-lg p-0 overflow-hidden">
        <div className="p-6 pb-2 geometric-pattern border-b border-white/5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-[#f07c42] rounded-full"></span>
              Tu Lista de Favoritos
            </DialogTitle>
            <DialogDescription className="text-white/40 font-medium">
              Películas que has guardado para ver más tarde.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
          <div className="space-y-4">
            {watchlist && watchlist.length > 0 ? (
              watchlist.map((w) => (
                <div
                  key={`WATCH-ITEM-${w.movies.id}`}
                  className="group relative flex items-center gap-4 bg-[#262627]/40 p-3 rounded-xl border border-white/5 hover:border-[#f07c42]/30 transition-all"
                >
                  <button
                    onClick={() =>
                      deleteWatchlist({
                        user_id: user.user.id,
                        movie_id: w.movie_id,
                      })
                    }
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Eliminar de mi lista"
                  >
                    <FiTrash2 size={14} />
                  </button>

                  <div className="w-16 h-24 bg-muted rounded-lg overflow-hidden shrink-0 border border-white/10">
                    {w.coverUrl ? (
                      <img
                        src={w.coverUrl}
                        alt={w.movies.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full opacity-20">
                        <FiFilm />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-bold text-base truncate group-hover:text-[#f07c42] transition-colors uppercase">
                      {w.movies.title}
                    </h4>
                    <p className="text-xs text-white/40 mb-2">
                      {w.movies.release} • {w.movies.duration} min
                    </p>

                    <div className="flex gap-2">
                      <Link to={`/rmovies/${w.movies.id}`} className="w-full">
                        <Button
                          size="sm"
                          className="w-full bg-white/5 hover:bg-[#f07c42] hover:text-[#131315] border border-white/10 h-7 text-[10px] font-bold uppercase tracking-wider"
                        >
                          Ver Detalles <FiArrowRight className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-4">
                <FiHeart size={48} className="mx-auto text-white/10" />
                <p className="text-white/40 italic">
                  Aún no has añadido películas a tu lista.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-[#262627]/20 border-t border-white/5 flex justify-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
            Cine Venezolano • Memoria Digital
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
