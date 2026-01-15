import { useReview } from "@/context/ReviewsContext";
import { useEffect } from "react";
import { FiMessageSquare, FiCalendar, FiStar } from "react-icons/fi";
import { CReview } from "./CReviews";

export function RReviews({ movie_id }: { movie_id: number }) {
  const { reviews, getReviews } = useReview();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    getReviews({ movie_id });
  }, [movie_id]);

  return (
    <section className="space-y-8 mt-12">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-8 h-0.5 bg-[#f07c42]"></span>
          Reseñas de la Comunidad
          <span className="text-sm font-normal text-white/40 ml-2">
            ({reviews?.length || 0})
          </span>
        </h3>
        <CReview movie_id={movie_id}/>
      </div>

      <div className="space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={`REVIEW-${review.id}`}
              className="bg-[#262627]/50 rounded-xl p-6 border border-white/5 geometric-pattern transition-all hover:border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-[#f07c42]/20 flex items-center justify-center text-[#f07c42] font-bold border border-[#f07c42]/30 text-lg">
                    {review.username.charAt(0) + review.username.charAt(1)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {review.username}
                    </p>
                    <p className="text-[11px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                      <FiCalendar /> {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5 text-[#FADB47]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      fill={i < 4 ? "currentColor" : "none"}
                      className={i < 4 ? "opacity-100" : "opacity-20"}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-2 -top-2 text-4xl text-[#f07c42]/10 font-serif">
                  “
                </span>
                <p className="text-white/80 text-base leading-relaxed italic pl-4">
                  {review.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-black/50 rounded-2xl border border-dashed border-white/10 text-center">
            <FiMessageSquare size={40} className="text-white/20 mb-4" />
            <h4 className="text-lg font-medium text-white/60">
              Aún no hay reseñas
            </h4>
            <p className="text-sm text-white/40">
              Sé el primero en compartir tu opinión sobre esta película.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
