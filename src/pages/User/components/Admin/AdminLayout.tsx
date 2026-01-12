import { AdminProvider } from "@/context/AdminContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function AdminLayout() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (user &&
        !user.user &&
        user.user.id !== "7fce3337-c718-4b59-9788-97317007bd60") ||
      !user
    ) {
      navigate("/user");
    }
  }, [user]);
  return (
    <AdminProvider>
      <Outlet />;
    </AdminProvider>
  );
}
