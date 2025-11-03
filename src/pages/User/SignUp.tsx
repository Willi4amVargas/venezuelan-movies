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
import { FiUserPlus, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function SignUp() {
  const { user, SignUp } = useUser();

  const navigate = useNavigate();
  if (user && user.user && user.session) {
    navigate("/");
  }
  const [formState, setFormState] = useState({
    sending: false,
  });

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Debes ingresar un email");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden. Por favor, revísalas.");
      return;
    }
    setFormState({
      sending: true,
    });
    await SignUp({ email, password });
    setFormState({
      sending: false,
    });
    navigate("/user/login");
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] p-4 w-full">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
            <FiUserPlus className="text-primary" />
            <span>Crear Cuenta</span>
          </CardTitle>
          <CardDescription>
            Regístrate para comenzar a registrar películas venezolanas.
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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                minLength={6}
                disabled={formState.sending}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="confirm-password"
                className="flex items-center space-x-1"
              >
                <FiLock size={14} />
                <span>Confirmar Contraseña</span>
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Vuelve a escribir la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                required
                minLength={6}
                disabled={formState.sending}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 h-10 text-lg font-semibold"
              disabled={formState.sending}
            >
              <FiUserPlus className="mr-2 h-4 w-4" /> Registrarme
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <span className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?
            <a href="/user/login" className="text-primary hover:underline ml-1">
              Inicia Sesión
            </a>
          </span>
        </CardFooter>
      </Card>
    </section>
  );
}
