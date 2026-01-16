import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert } from "db";
import { supabase } from "@/lib/supabase";
import type { QueryData } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { GetImageUrl } from "@/lib/bucket";

const QueryWatchlistWithMovie = supabase
  .from("user_watchlist")
  .select(`*, movies(*)`)
  .order("created_at", {
    ascending: true,
  });
export type IWatchlistWithMovies = QueryData<typeof QueryWatchlistWithMovie>;
export type IWatchlistWithMovie = IWatchlistWithMovies[number];

export interface IWatchlistWithMovieAndCoverUrl extends IWatchlistWithMovie {
  coverUrl: string;
}

interface IFilterWatchlist {
  user_id: string;
}

export const WatchlistContext = createContext<{
  watchlist: IWatchlistWithMovieAndCoverUrl[];
  getWatchlist: (filter: IFilterWatchlist) => Promise<void>;
  createWatchlist: (watchlist: TablesInsert<"user_watchlist">) => Promise<void>;
  deleteWatchlist: ({
    user_id,
    movie_id,
  }: {
    user_id: string;
    movie_id: number;
  }) => Promise<void>;
}>({
  watchlist: undefined,
  getWatchlist: async () => {},
  createWatchlist: async () => {},
  deleteWatchlist: async ({
    user_id,
    movie_id,
  }: {
    user_id: string;
    movie_id: number;
  }) => {},
});

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlist, setWatchlist] =
    useState<IWatchlistWithMovieAndCoverUrl[]>();

  const getWatchlist = async (filter: IFilterWatchlist) => {
    const { user_id } = filter;
    let query = QueryWatchlistWithMovie.eq("user", user_id);
    const { data, error } = await query;
    if (data) {
      const moviesWithUrls = await Promise.all(
        data.map(async (m) => {
          const coverUrl = await GetImageUrl(m.movies.cover);
          return {
            ...m,
            coverUrl: coverUrl,
          };
        })
      );
      setWatchlist(moviesWithUrls);
    }
    if (error) toast.error(error.details);
  };

  const createWatchlist = async (
    watchlist: TablesInsert<"user_watchlist">
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("user_watchlist")
      .insert(watchlist)
      .select();
    if (error) {
      toast.error(error.message);
      return;
    }
    await getWatchlist({ user_id: watchlist.user });
    toast.success("Pelicula añadida a la lista");
  };

  const deleteWatchlist = async ({
    user_id,
    movie_id,
  }: {
    user_id: string;
    movie_id: number;
  }) => {
    const { error } = await supabase
      .from("user_watchlist")
      .delete()
      .eq("user", user_id)
      .eq("movie_id", movie_id);

    if (error) {
      toast.error(error.message);
    } else {
      getWatchlist({ user_id });
    }
  };
  return (
    <WatchlistContext.Provider
      value={{ watchlist, getWatchlist, createWatchlist, deleteWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
