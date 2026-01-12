import { GetImageUrl } from "@/lib/bucket";
import { supabase } from "@/lib/supabase";
import type {
  QueryData,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
  WeakPassword,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { MovieWithDirectorAndCoverUrl } from "@/context/MoviesContext";

export type IUser = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};

export const UserContext = createContext<{
  user: IUser;
  userMovies: MovieWithDirectorAndCoverUrl[];
  getUserMovies: () => Promise<void>;
  SignIn: (userData: SignInWithPasswordCredentials) => Promise<void>;
  SignUp: (userData: SignUpWithPasswordCredentials) => Promise<void>;
  SignOut: () => Promise<void>;
}>({
  user: undefined,
  userMovies: undefined,
  SignIn: async (userData: SignInWithPasswordCredentials) => {},
  SignUp: async (userData: SignUpWithPasswordCredentials) => {},
  SignOut: async () => {},
  getUserMovies: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  }>();

  const [userMovies, setUserMovies] =
    useState<MovieWithDirectorAndCoverUrl[]>();

  const SignIn = async (
    userData: SignInWithPasswordCredentials
  ): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword(userData);
    if (!error) {
      setUser(data);
      toast.success("Sesión iniciada correctamente");
      return;
    }
    setUser(undefined);
    toast.error(error.message);
  };

  const SignUp = async (
    userData: SignUpWithPasswordCredentials
  ): Promise<void> => {
    const { data, error } = await supabase.auth.signUp(userData);

    if (error) {
      console.error("Error al registrar el usuario:", error);
      toast.error(`Error al crear el usuario: ${error.message}`);
      setUser(undefined);
      return;
    }

    setUser({
      user: data.user,
      session: data.session,
    });
    toast.success(
      "¡Registro exitoso! Por favor, verifica tu correo electrónico para activar tu cuenta."
    );
  };

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    setUser(undefined);
    toast.info("Sesión cerrada correctamente");
  };

  const getUserMovies = async () => {
    try {
      if (!user.user) {
        toast.info(
          "Inicia sesión o registrate para ver las peliculas que creaste"
        );
        return;
      }
      const { data, error } = await supabase
        .from("movies_creator")
        .select("*, movies(*, director (*))")
        .eq("user_id", user.user.id);

      const moviesWithUrls = await Promise.all(
        data.map(async (m) => {
          const coverUrl = await GetImageUrl(m.movies.cover);
          return {
            ...m,
            movies: {
              ...m.movies,
              coverUrl: coverUrl,
            },
          };
        })
      );

      setUserMovies(moviesWithUrls.map((mov) => mov.movies));
      return;
    } catch (error) {
      toast.error(error);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      const { data: user, error: errorUser } = await supabase.auth.getUser();
      const { data: session, error: errorSession } =
        await supabase.auth.getSession();
      if (user && session)
        setUser({ user: user.user, session: session.session });
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        SignIn,
        SignUp,
        SignOut,
        userMovies,
        getUserMovies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
