import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export function SignOut() {
  const { SignOut } = useUser();
  return (
    <>
      <Button variant="destructive" onClick={() => SignOut()}>
        Cerrar Sesion
      </Button>
    </>
  );
}
