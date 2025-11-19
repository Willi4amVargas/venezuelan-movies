import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router";

export function SignIn() {
  const { user, SignIn } = useUser();

  const navigate = useNavigate();
  if (user && user.user && user.session) {
    navigate("/");
  }

  const [formState, setFormState] = useState({
    sending: false,
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setFormState({
        sending: true,
      });
      await SignIn({ email, password });
      setFormState({
        sending: false,
      });
    }
  };

  return (
    <section className="flex w-full justify-center items-center min-h-[80vh] p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
            <FiLogIn className="text-primary" />
            <span>Iniciar Sesión</span>
          </CardTitle>
          <CardDescription>
            Accede para registrar y gestionar películas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center space-x-1">
                <FiMail size={14} />
                <span>Correo Electrónico</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
                disabled={formState.sending}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="flex items-center space-x-1">
                <FiLock size={14} />
                <span>Contraseña</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                disabled={formState.sending}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 h-10 text-lg font-semibold"
              disabled={formState.sending}
            >
              <FiLogIn className="mr-2 h-4 w-4" /> Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <span className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link to={"/user/signup"} className="text-primary hover:underline">
              Regístrate
            </Link>
          </span>
        </CardFooter>
      </Card>
    </section>
  );
}
