import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert } from "../../database.types";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

export const MovieContext = createContext<{
  movies: Tables<"movies">[];
  getMovies: () => Promise<void>;
  createMovie: (movie: TablesInsert<"movies">) => Promise<void>;
}>({
  movies: undefined,
  getMovies: async () => {},
  createMovie: async () => {},
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Tables<"movies">[]>();

  const getMovies = async () => {
    const { data, error } = await supabase.from("movies").select();

    if (data) setMovies(data);

    if (error) toast.error(error.details);
  };

  const createMovie = async (movie: TablesInsert<"movies">): Promise<void> => {
    const { data, error } = await supabase
      .from("movies")
      .insert(movie)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log("Created movie:", data);
    toast.success("Pelicula creada con exito");
  };
  return (
    <MovieContext.Provider value={{ movies, getMovies, createMovie }}>
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
