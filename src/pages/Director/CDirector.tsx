import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TablesInsert } from "db";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  FiUserPlus,
  FiSave,
  FiCalendar,
  FiBookOpen,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router";
import { useMovie } from "@/context/MoviesContext";
import { usePeople } from "@/context/PeopleContext";
import { useUser } from "@/context/UserContext";

export function CDirector() {
  const { newMovie } = useMovie();
  const { user } = useUser();
  const { createPeoples } = usePeople();

  const [formData, setFormData] = useState<TablesInsert<"people">>({
    name: "",
    biography: "",
    birth: undefined,
    type: 1,
  });
  const [formState, setFormState] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Por favor ingrese un nombre");
      return;
    }
    setFormState(true);
    await createPeoples(formData);
    setFormState(false);
  };

  useEffect(() => {
    if (!user || !user.user) {
      toast.info("Es necesario iniciar sesión para agregar un director", {
        toastId: "required_session",
      });
    }
  }, [user]);

  const inputClasses =
    "bg-white/5 border-white/10 focus:border-[#f07c42] focus:ring-[#f07c42] text-white placeholder:text-white/20";

  return (
    <section className="pt-24 pb-12 px-4 relative overflow-hidden flex items-center justify-center mx-auto">
      <div className="absolute inset-0 geometric-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#508696]/5 blur-[100px] rounded-full" />

      <Card className="w-full max-w-xl bg-[#262627]/80 border-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <div className="h-1.5 w-full bg-linear-to-r from-[#508696] to-[#f07c42]" />

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
            <FiUserPlus className="text-[#f07c42]" />
            Registrar Director
          </CardTitle>
          <CardDescription className="text-white/40 italic">
            Añade a los cineastas que dan vida a nuestras historias.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2"
              >
                <FiUser size={14} /> Nombre Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ej. Mariana Rondón"
                className={inputClasses}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.currentTarget.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="birth"
                className="text-xs uppercase tracking-widest font-bold text-[#508696] flex items-center gap-2"
              >
                <FiCalendar size={14} /> Fecha de Nacimiento
              </Label>
              <Input
                id="birth"
                type="date"
                className={`${inputClasses} scheme-dark`}
                value={formData.birth || ""}
                onChange={(e) =>
                  setFormData({ ...formData, birth: e.currentTarget.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="biography"
                className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2"
              >
                <FiBookOpen size={14} /> Biografía / Trayectoria
              </Label>
              <Textarea
                id="biography"
                placeholder="Breve reseña sobre su impacto en el cine..."
                className={`${inputClasses} min-h-[150px] resize-none`}
                value={formData.biography}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.currentTarget.value })
                }
                maxLength={500}
              />
              <div className="text-[10px] text-right text-white/20 uppercase tracking-tighter">
                {formData.biography?.length || 0} / 500 caracteres
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {newMovie && (
                <Link to="/cmovies" className="flex-1">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold"
                  >
                    <IoArrowBackOutline size={18} className="mr-2" />
                    Volver
                  </Button>
                </Link>
              )}

              <Button
                type="submit"
                className={`flex-1 ${
                  newMovie ? "" : "w-full"
                } bg-[#f07c42] hover:bg-[#f07c42]/90 text-[#131315] font-black uppercase tracking-widest shadow-lg shadow-[#f07c42]/10 transition-transform active:scale-95`}
                disabled={formState}
              >
                <FiSave className="mr-2" />
                {formState ? "Guardando..." : "Guardar Director"}
              </Button>
            </div>
          </form>
        </CardContent>
        <div className="p-4 bg-white/5 border-t border-white/5 flex justify-center">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
            Talento Nacional • Registro Fílmico
          </p>
        </div>
      </Card>
    </section>
  );
}
