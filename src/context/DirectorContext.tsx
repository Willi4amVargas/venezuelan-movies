import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert } from "../../database.types";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

export const DirectorContext = createContext<{
  directors: Tables<"director">[];
  getDirectors: () => Promise<void>;
  createDirector: (director: TablesInsert<"director">) => Promise<void>;
}>({
  directors: undefined,
  getDirectors: async () => {},
  createDirector: async () => {},
});

export const DirectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [directors, setDirectors] = useState<Tables<"director">[]>();

  const getDirectors = async () => {
    const { data, error } = await supabase.from("director").select();

    if (data) setDirectors(data);

    if (error) toast.error(error.details);
  };

  const createDirector = async (
    director: TablesInsert<"director">
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("director")
      .insert(director)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log("Created director:", data);
    toast.success("Director creado con exito");
    await getDirectors();
  };
  return (
    <DirectorContext.Provider
      value={{ directors, createDirector, getDirectors }}
    >
      {children}
    </DirectorContext.Provider>
  );
};

export const useDirector = () => {
  const context = useContext(DirectorContext);
  if (!context) {
    throw new Error("useDirector must be used within a DirectorProvider");
  }
  return context;
};
