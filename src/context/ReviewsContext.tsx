import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert } from "db";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

interface IFilterReview {
  movie_id: number;
}

export const ReviewContext = createContext<{
  reviews: Tables<"review">[];
  getReviews: (filter: IFilterReview) => Promise<void>;
  createReview: (review: TablesInsert<"review">) => Promise<void>;
}>({
  reviews: undefined,
  getReviews: async () => {},
  createReview: async () => {},
});

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useState<Tables<"review">[]>();

  const getReviews = async (filter: IFilterReview) => {
    const { movie_id } = filter;
    let query = supabase.from("review").select().eq("movie", movie_id);

    const { data, error } = await query;

    if (data) setReviews(data);

    if (error) toast.error(error.details);
  };

  const createReview = async (
    review: TablesInsert<"review">
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("review")
      .insert(review)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Review creada con exito");
    await getReviews({ movie_id: review.movie });
  };
  return (
    <ReviewContext.Provider value={{ reviews, getReviews, createReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
};
