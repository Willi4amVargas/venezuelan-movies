import { BrowserRouter, Route, Routes, useParams } from "react-router";
import { ContextLayout } from "@/ContextLayout";
import { Index } from "@/pages/Index";
import { RMovies } from "@/pages/Movies/RMovies";
import { CMovies } from "@/pages/Movies/CMovies";
import { UMovies } from "@/pages/Movies/UMovies";
import { DMovies } from "@/pages/Movies/DMovies";
import { env } from "@/lib/config";
import { CDirector } from "@/pages/Director/CDirector";
import { RDirector } from "@/pages/Director/RDirector";
import { MovieDetail } from "@/pages/Movies/components/MovieDetail";
import { SignIn } from "@/pages/User/SignIn";
import { SignUp } from "@/pages/User/SignUp";
import { User } from "@/pages/User/User";
import { Redirect } from "@/components/Redirect";
import { AdminLayout } from "@/pages/User/components/Admin/AdminLayout";
import { UserRevision } from "@/pages/User/components/Admin/UserRevision";
import { Error404 } from "@/components/404";

function MovieDetailAdapter({
  redirectUrl,
  redirectText,
}: {
  redirectUrl?: string;
  redirectText?: string;
}) {
  const { id } = useParams();
  return (
    <MovieDetail
      id={parseInt(id)}
      redirectText={redirectText}
      redirectUrl={redirectUrl}
    />
  );
}

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
              <Route path=":id" element={<MovieDetailAdapter />} />
            </Route>
            <Route path="umovies">
              <Route index element={<Redirect url="/rmovies" />} />
              <Route path=":id" element={<UMovies />} />
            </Route>
            <Route path="dmovies" element={<DMovies />} />
            <Route path="cdirector" element={<CDirector />} />
            <Route path="rdirector" element={<RDirector />} />
            <Route path="user">
              <Route index element={<User />} />
              {/* esto no deberia funcionar si el usuario no es el creador de la pelicula despues se solucionara */}
              <Route
                path="movie/:id"
                element={
                  <MovieDetailAdapter
                    redirectText="Regresar al dashboard de usuario"
                    redirectUrl="/user"
                  />
                }
              />
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<User />} />
                <Route path="movies">
                  <Route index element={<RMovies adminView={true} />} />
                  <Route
                    path=":id"
                    element={
                      <MovieDetailAdapter
                        redirectText="Regresar al dashboard de administrador"
                        redirectUrl="/user/admin/movies"
                      />
                    }
                  />
                </Route>
                <Route path="users" element={<UserRevision />} />
              </Route>
              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Route>
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
