import { useReview } from "@/context/ReviewsContext";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";

// Interfaz de createReview
// const createReview: (review: {
//     created_at?: string;
//     description: string;
//     id?: number;
//     movie?: number;
//     user?: string;
//     username: string;
// }) => Promise<void>

export function CReview({ movie_id }: { movie_id: number }) {
  const { createReview } = useReview();
  const { user } = useUser();
  const navigate = useNavigate();
  if (!user || !user.user) {
    navigate("/user/login");
    return;
  }

  return (
    <>
      Pagina para crear las reviews (deberia ser un componente pequeño para
      añadir en la vista de la pelicula)
    </>
  );
}
