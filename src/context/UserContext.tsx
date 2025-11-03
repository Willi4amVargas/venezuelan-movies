import { supabase } from "@/lib/supabase";
import type {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
  WeakPassword,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext<{
  user: {
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  };
  SignIn: (userData: SignInWithPasswordCredentials) => Promise<void>;
  SignUp: (userData: SignUpWithPasswordCredentials) => Promise<void>;
  SignOut: () => Promise<void>;
}>({
  user: undefined,
  SignIn: async (userData: SignInWithPasswordCredentials) => {},
  SignUp: async (userData: SignUpWithPasswordCredentials) => {},
  SignOut: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  }>();
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

    console.log("USUARIO REGISTRADO ", data);
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
    <UserContext.Provider value={{ user, SignIn, SignUp, SignOut }}>
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
