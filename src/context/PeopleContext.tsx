import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert } from "db";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

interface IFilterPeople {
  id?: number;
  people_type?: number;
}

export const PeopleContext = createContext<{
  people: Tables<"people">;
  peoples: Tables<"people">[];
  getPeoples: (filter?: IFilterPeople) => Promise<void>;
  createPeoples: (people: TablesInsert<"people">) => Promise<void>;
}>({
  people: undefined,
  peoples: undefined,
  getPeoples: async () => {},
  createPeoples: async () => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState<Tables<"people">>();
  const [peoples, setPeoples] = useState<Tables<"people">[]>();

  const getPeoples = async (filter?: IFilterPeople) => {
    let query = supabase.from("people").select();

    if (filter) {
      if (filter.people_type) {
        query = query.eq("type", filter.people_type);
      }
      if (filter.id) {
        query = query.eq("id", filter.id);
      }
    }

    const { data, error } = await query;

    if (data) {
      if (filter && filter.id) {
        setPeople(data[0]);
      } else {
        setPeoples(data);
      }
    }

    if (error) toast.error(error.details);
  };

  const createPeoples = async (
    people: TablesInsert<"people">
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("people")
      .insert(people)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Persona creado con exito");
    await getPeoples();
  };
  return (
    <PeopleContext.Provider
      value={{ people, peoples, getPeoples, createPeoples }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
};
