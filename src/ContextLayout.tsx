import "@/index.css";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "@/context/MoviesContext";
import { Outlet } from "react-router";
import { NavBar } from "@/components/NavBar";
import { UserProvider } from "@/context/UserContext";
import { GenderProvider } from "@/context/GenderContext";
import { PeopleProvider } from "./context/PeopleContext";
import { ReviewProvider } from "./context/ReviewsContext";

export function ContextLayout() {
  return (
    <>
      <UserProvider>
        <MovieProvider>
          <ReviewProvider>
            <PeopleProvider>
                <GenderProvider>
                  <div className="flex h-dvh">
                    <NavBar />
                    <Outlet />
                  </div>
                  <ToastContainer position="bottom-right" />
                </GenderProvider>
            </PeopleProvider>
          </ReviewProvider>
        </MovieProvider>
      </UserProvider>
    </>
  );
}
