import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MovieWithDirectorAndCoverUrl } from "@/context/MoviesContext";
import { FiCalendar, FiFilm, FiUser } from "react-icons/fi";
import { PiImageSquareFill } from "react-icons/pi";

export function MoviePreview(movie: MovieWithDirectorAndCoverUrl) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full aspect-2/3 bg-muted flex items-center justify-center rounded-t-lg overflow-hidden">
        <span className="text-muted-foreground text-sm font-semibold p-4 text-center">
          {movie.coverUrl ? (
            <img src={movie.coverUrl} alt={`MOVIE-${movie.title}`} />
          ) : (
            <PiImageSquareFill size={30} />
          )}
        </span>
      </div>

      <CardHeader className="grow pb-2">
        <CardTitle className="text-xl font-bold flex items-center space-x-2">
          <FiFilm className="text-primary" />
          <span>{movie.title}</span>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {movie.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-4 space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <FiCalendar size={16} />
          <p>
            Año:
            <Badge variant="secondary" className="font-semibold">
              {movie.release}
            </Badge>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <FiUser size={16} />
          <p>
            Director:
            <span className="font-medium text-foreground">
              {movie.director.name}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
