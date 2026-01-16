import { createContext, useContext, useState } from "react";
import type { Tables, TablesInsert, TablesUpdate } from "db";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import type { QueryData } from "@supabase/supabase-js";
import { AddImageToBucket, GetImageUrl } from "@/lib/bucket";
import { useUser } from "@/context/UserContext";

interface optionalData {
  id?: number;
  q?: string;
  gender?: number;
  state?: number;
  director?: boolean;
}

const moviesWithDirector = supabase
  .from("movies")
  .select(`*, director (*)`)
  .order("description", {
    ascending: true,
  });
export type MoviesWithDirector = QueryData<typeof moviesWithDirector>;
export type MovieWithDirector = MoviesWithDirector[number];

export interface MovieWithDirectorAndCoverUrl extends MovieWithDirector {
  coverUrl?: string;
}

interface GenderType {
  genderId: number;
}
interface InsertMovieData extends TablesInsert<"movies"> {
  coverFile: File | null;
  gender?: GenderType[];
}

export const MovieContext = createContext<{
  movie: MovieWithDirectorAndCoverUrl | undefined;
  movies: MovieWithDirectorAndCoverUrl[] | undefined;
  newMovie: InsertMovieData;
  setNewMovie: (movie: InsertMovieData) => void;
  getMovies: (optionalData?: optionalData) => Promise<void>;
  createMovie: (movie: InsertMovieData) => Promise<void>;
  updateMovie: ({
    id,
    movie,
  }: {
    id: number;
    movie: TablesUpdate<"movies">;
  }) => Promise<void>;
}>({
  movie: undefined,
  movies: undefined,
  newMovie: undefined,
  setNewMovie: (movie: InsertMovieData) => {},
  getMovies: async (optionalData?: optionalData) => {},
  createMovie: async () => {},
  updateMovie: async () => {},
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movie, setMovie] = useState<MovieWithDirectorAndCoverUrl>();
  const [movies, setMovies] = useState<MovieWithDirectorAndCoverUrl[]>();
  const [newMovie, setNewMovie] = useState<InsertMovieData>();
  const { user } = useUser();

  async function MovieCreatedBy(movie: Tables<"movies">): Promise<void> {
    try {
      const { data, error } = await supabase.from("movies_creator").insert({
        user_id: user.user.id,
        movie_id: movie.id,
      });

      if (error) {
        toast.error(error.details);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      return;
    }
  }

  async function MovieGenders(
    movie: Tables<"movies">,
    genders: GenderType[]
  ): Promise<void> {
    try {
      const { data, error } = await supabase.from("movie_gender").insert(
        genders.map((gen) => ({
          gender_id: gen.genderId,
          movie_id: movie.id,
        }))
      );

      if (error) {
        toast.error(error.details);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      return;
    }
  }

  const getMovies = async (optionalData?: optionalData) => {
    let query = supabase
      .from("movies")
      .select(`*, director (*)`)
      .order("description", {
        ascending: true,
      });

    if (optionalData) {
      if (optionalData.id) {
        query = query.eq("id", optionalData.id);
      }
      if (optionalData.state) {
        query = query.eq("state", optionalData.state);
      }
      if (optionalData.q && optionalData.q !== "") {
        query = query.ilike("title", `%${optionalData.q}%`);
      }
    }
    const { data, error } = await query;

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
      if (optionalData?.id) {
        setMovie(moviesWithUrls[0]);
      } else {
        setMovies(moviesWithUrls);
      }
    }

    if (error) toast.error(error.details);
  };

  const createMovie = async (movie: InsertMovieData): Promise<void> => {
    if (!user.user) {
      toast.error("Tienes que iniciar sesión para agregar una pelicula");
      return;
    }

    if (!movie.coverFile) {
      console.log("No cover file provided");
      return;
    }
    const fileSplit = movie.coverFile.name.split(".");

    const filename = `${crypto.randomUUID()}.${
      movie.coverFile.name.split(".")[fileSplit.length - 1]
    }`;

    // archivo no mayor a 3mb
    if (movie.coverFile.size > 3 * 10 ** 6) {
      toast.error("Archivo del cover muy pesado");
      return;
    }

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
        trailer: movie.trailer,
      })
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }
    await AddImageToBucket(filename, movie.coverFile);
    data.forEach(async (mov) => await MovieCreatedBy(mov));
    data.forEach(async (mov) => await MovieGenders(mov, movie.gender));

    // para actualizar el estado global de las peliculas
    // No se necesita actualizar el estado inmediatamente ya que las peliculas necesitan aprobacion del administrador
    // await getMovies();
    toast.info("Tu propuesta fue enviada a revision");
  };

  const updateMovie = async ({
    id,
    movie,
  }: {
    id: number;
    movie: TablesUpdate<"movies">;
  }): Promise<void> => {
    const { data, error } = await supabase
      .from("movies")
      .update(movie)
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Pelicula actualizada con exito");
    return;
  };
  return (
    <MovieContext.Provider
      value={{
        movie,
        movies,
        newMovie,
        setNewMovie,
        getMovies,
        createMovie,
        updateMovie,
      }}
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
