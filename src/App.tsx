import { BrowserRouter, Route, Routes } from "react-router";
import { ContextLayout } from "./ContextLayout";
import { Index } from "./pages/Index";
import { RMovies } from "./pages/Movies/RMovies";
import { CMovies } from "./pages/Movies/CMovies";
import { UMovies } from "./pages/Movies/UMovies";
import { DMovies } from "./pages/Movies/DMovies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ContextLayout />}>
          <Route path="/">
            <Route index element={<Index />} />
            <Route path="cmovies" element={<CMovies />} />
            <Route path="rmovies" element={<RMovies />} />
            <Route path="umovies" element={<UMovies />} />
            <Route path="dmovies" element={<DMovies />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
