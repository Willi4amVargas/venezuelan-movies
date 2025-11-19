import { useParams } from "react-router";

export function UMovies() {
  const { id } = useParams();

  return <h1>Update Movies Page</h1>;
}
