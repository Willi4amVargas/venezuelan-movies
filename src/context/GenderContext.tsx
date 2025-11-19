import { supabase } from "@/lib/supabase";
import type { Tables } from "db";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const GenderContext = createContext<{
  genders: Tables<"gender">[];
  movieGenders: Tables<"gender">[];
  getGenders: () => Promise<void>;
  getMovieGenders: (id: number) => Promise<void>;
}>({
  genders: undefined,
  movieGenders: undefined,
  getGenders: async () => {},
  getMovieGenders: async (id: number) => {},
});

export const GenderProvider = ({ children }: { children: React.ReactNode }) => {
  const [genders, setGenders] = useState<Tables<"gender">[]>();
  const [movieGenders, setMovieGenders] = useState<Tables<"gender">[]>();

  const getGenders = async () => {
    const { data, error } = await supabase.from("gender").select();

    if (data) setGenders(data);

    if (error) toast.error(error.details);
  };

  const getMovieGenders = async (id: number) => {
    const { data, error } = await supabase
      .from("movie_gender")
      .select(`*, gender (*)`)
      .eq("movie_id", id);

    if (error) {
      toast.error(error.details);
      return;
    }
    if (!data) {
      toast.error("No se encontraron géneros para la película.");
      return;
    }
    const movieGenders = data.map((mg) => mg.gender);
    setMovieGenders(movieGenders);
    return;
  };
  return (
    <GenderContext.Provider
      value={{ genders, movieGenders, getGenders, getMovieGenders }}
    >
      {children}
    </GenderContext.Provider>
  );
};

export const useGender = () => {
  const context = useContext(GenderContext);
  if (!context) {
    throw new Error("useGender must be used within a GenderProvider");
  }
  return context;
};
