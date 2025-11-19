import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Redirect({ url }: { url: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(url);
  }, []);

  return (
    <div className="flex w-full items-center justify-center">Redirigiendo...</div>
  );
}
