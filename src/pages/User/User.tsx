import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";
import { AdminDashboard } from "@/pages/User/components/Admin/AdminDashboard";
import { UserCommon } from "@/pages/User/components/UserCommon";

export function User() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const waitTimer = setTimeout(() => {
      if ((user && !user.user) || !user) {
        navigate("/user/login");
      }
    }, 500);
    return () => clearTimeout(waitTimer);
  }, [user]);

  if (user && user.user) {
    switch (user.user.id) {
      // Admin User ID
      // No es la mejor manera de hacerlo pero se puede solucionar despues
      case "7fce3337-c718-4b59-9788-97317007bd60":
        return <AdminDashboard user={user} />;
      default:
        return <UserCommon user={user} />;
    }
  }
}
