import { useReview } from "@/context/ReviewsContext";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

export function CReview({ movie_id }: { movie_id: number }) {
  const { createReview } = useReview();
  const { user } = useUser();

  const [description, setDescription] = useState<string>();
  const [dialogState, setDialogState] = useState(false);
  const [textAreaState, setTextAreaState] = useState(true);

  const sendReview = (event: any) => {
    if (!user || !user.user) {
      toast.error("Debes iniciar sesion para enviar una review");
      return;
    }
    if (!description || description === "") {
      toast.error("No puedes enviar un comentario vacio");
      return;
    }
    setTextAreaState(false);
    createReview({
      description,
      username: user.user.user_metadata.username || user.user.email,
      movie: movie_id,
      user: user.user.id,
    }).then(() => {
      setDialogState(!dialogState);
      setTextAreaState(true);
    });
  };

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogTrigger>
          <button className="text-[#f07c42] text-sm font-bold border-b border-[#f07c42]/20 hover:border-[#f07c42] transition-all">
            Escribir una reseña
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {user && user.user
                ? "Haz la reseña"
                : "Necesitas iniciar sesion para realizar esta accion"}
            </DialogTitle>
            <DialogDescription>
              {user && user.user
                ? "Escribe un comentario relacionado a la pelicula"
                : ""}
            </DialogDescription>
          </DialogHeader>
          {user && user.user ? (
            <>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={
                      user.user.user_metadata?.username || user.user.email
                    }
                    disabled={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Comentario</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="mi comentario"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    disabled={!textAreaState}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Salir</Button>
                </DialogClose>
                <Button onClick={sendReview}>Enviar</Button>
              </DialogFooter>
            </>
          ) : (
            <Button variant="link" asChild>
              <Link to={"/user/login"}>Iniciar Sesion/Registrarse</Link>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
