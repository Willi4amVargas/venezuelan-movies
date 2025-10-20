import { createContext, useContext, useState } from "react";
import type { Tables } from "@/interface/database";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

export const MovieContext = createContext<{
  movies: Tables<"movies">[];
  getMovies: () => Promise<void>;
}>({
  movies: undefined,
  getMovies: async () => {},
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Tables<"movies">[]>();

  const getMovies = async () => {
    const { data, error } = await supabase.from("movies").select();

    if (data) setMovies(data);

    if (error) toast.error(error.details);
  };
  return (
    <MovieContext.Provider value={{ movies, getMovies }}>
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
