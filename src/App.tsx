import { BrowserRouter, Route, Routes } from "react-router";
import { ContextLayout } from "./ContextLayout";
import { Index } from "./pages/Index";
import { RMovies } from "./pages/Movies/RMovies";
import { CMovies } from "./pages/Movies/CMovies";
import { UMovies } from "./pages/Movies/UMovies";
import { DMovies } from "./pages/Movies/DMovies";
import { env } from "./lib/config";
import { CDirector } from "./pages/Director/CDirector";
import { RDirector } from "./pages/Director/RDirector";
import { Movie } from "./pages/Movies/components/Movie";
import { SignIn } from "./pages/User/SignIn";
import { SignUp } from "./pages/User/SignUp";

export default function App() {
  return (
    <BrowserRouter basename={env.APP_BASE_PATH}>
      <Routes>
        <Route element={<ContextLayout />}>
          <Route path="/">
            <Route index element={<Index />} />
            <Route path="cmovies" element={<CMovies />} />
            <Route path="rmovies">
              <Route index element={<RMovies />} />
              <Route path=":id" element={<Movie />} />
            </Route>
            <Route path="umovies" element={<UMovies />} />
            <Route path="dmovies" element={<DMovies />} />
            <Route path="cdirector" element={<CDirector />} />
            <Route path="rdirector" element={<RDirector />} />
            <Route path="user">
              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
