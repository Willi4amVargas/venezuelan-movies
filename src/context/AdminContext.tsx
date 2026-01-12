import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

export const AdminContext = createContext<{
  users: User[] | undefined;
  getUsers: () => Promise<void>;
}>({
  users: undefined,
  getUsers: async () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>();
  // esto deberia obtener los usuarios registrados pero por politicas de supabase puede ser peligroso, despues se solucionara
  const getUsers = async () => {
    return;
  };
  return (
    <AdminContext.Provider value={{ users, getUsers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
