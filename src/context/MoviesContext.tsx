import { createContext, useContext, useState } from "react";
import type { TablesInsert } from "db";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import type { QueryData } from "@supabase/supabase-js";
import { AddImageToBucket, GetImageUrl } from "@/lib/bucket";

interface optionalData {
  director?: boolean;
}

const moviesWithDirector = supabase.from("movies").select(`*, director (*)`);
export type MoviesWithDirector = QueryData<typeof moviesWithDirector>;
export type MovieWithDirector = MoviesWithDirector[number];

export interface MovieWithDirectorAndCoverUrl extends MovieWithDirector {
  coverUrl?: string;
}

interface InsertMovieData extends TablesInsert<"movies"> {
  coverFile: File | null;
}

export const MovieContext = createContext<{
  movies: MovieWithDirectorAndCoverUrl[] | undefined;
  newMovie: InsertMovieData;
  setNewMovie: (movie: InsertMovieData) => void;
  getMovies: (optionalData?: optionalData) => Promise<void>;
  createMovie: (movie: InsertMovieData) => Promise<void>;
}>({
  movies: undefined,
  newMovie: undefined,
  setNewMovie: (movie: InsertMovieData) => {},
  getMovies: async (optionalData?: optionalData) => {},
  createMovie: async () => {},
});

function normalizeText(texto: string): string {
    let slug: string = texto.toLowerCase();
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.replace(/[^a-z0-9]+/g, "_");
    slug = slug.replace(/^_+|_+$/g, "");

    return slug;
}

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<MovieWithDirectorAndCoverUrl[]>();
  const [newMovie, setMovieNew] = useState<InsertMovieData>();

  const getMovies = async (optionalData?: optionalData) => {
    const { data, error } = await moviesWithDirector;

    if (data) {
      const moviesWithUrls = await Promise.all(
        data.map(async (m) => {
          const coverUrl = await GetImageUrl(m.cover);
          return {
            ...m,
            coverUrl: coverUrl,
          };
        })
      );
      setMovies(moviesWithUrls);
    }

    if (error) toast.error(error.details);
  };

  const createMovie = async (movie: InsertMovieData): Promise<void> => {
    if (!movie.coverFile) {
      console.log("No cover file provided");
      return;
    }
    const fileSplit = movie.coverFile.name.split(".");

    const filename = `${normalizeText(movie.title)}.${
      movie.coverFile.name.split(".")[fileSplit.length - 1]
    }`;

    const { data, error } = await supabase
      .from("movies")
      .insert({
        title: movie.title,
        description: movie.description,
        release: movie.release,
        director: movie.director,
        cover: filename,
        duration: movie.duration,
        synopsis: movie.synopsis,
      })
      .select();
    await AddImageToBucket(filename, movie.coverFile);

    if (error) {
      toast.error(error.message);
      return;
    }

    await getMovies();
    toast.success("Pelicula creada con exito");
  };

  const setNewMovie = (movie: InsertMovieData): void => {
    // in case i need to modify before send... i think
    setMovieNew(movie);
  };
  return (
    <MovieContext.Provider
      value={{ movies, newMovie, setNewMovie, getMovies, createMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};
