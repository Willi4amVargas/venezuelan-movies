import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

export function SignOut() {
  const { SignOut } = useUser();
  const [buttonState, setButtonState] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="destructive"
        onClick={async () => {
          setButtonState(!buttonState);
          await SignOut();
        }}
        disabled={buttonState}
      >
        Cerrar Sesion
      </Button>
    </>
  );
}
