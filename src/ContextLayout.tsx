import "@/index.css";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "@/context/MoviesContext";
import { Outlet } from "react-router";
import { NavBar } from "@/components/NavBar";
import { DirectorProvider } from "@/context/DirectorContext";
import { UserProvider } from "@/context/UserContext";
import { GenderProvider } from "@/context/GenderContext";

export function ContextLayout() {
  return (
    <>
      <UserProvider>
        <MovieProvider>
          <DirectorProvider>
            <GenderProvider>
              <div className="flex h-dvh">
                <NavBar />
                <Outlet />
              </div>
              <ToastContainer position="bottom-right" />
            </GenderProvider>
          </DirectorProvider>
        </MovieProvider>
      </UserProvider>
    </>
  );
}
