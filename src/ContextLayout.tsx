import "@/index.css";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "./context/MoviesContext";
import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar";

export function ContextLayout() {
  return (
    <>
      <MovieProvider>
        <div className="flex h-[100dvh]">
          <NavBar />
          <Outlet />
        </div>
        <ToastContainer />
      </MovieProvider>
    </>
  );
}
