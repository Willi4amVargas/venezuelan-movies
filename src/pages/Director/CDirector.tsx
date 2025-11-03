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
import { useDirector } from "@/context/DirectorContext";
import type { TablesInsert } from "database.types";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUserPlus, FaSave } from "react-icons/fa";
import { FiCalendar, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router";
import { useMovie } from "@/context/MoviesContext";

export function CDirector() {
  const { newMovie } = useMovie();
  const [formData, setFormData] = useState<TablesInsert<"director">>({
    name: "",
    biography: "",
    birth: undefined,
  });

  const { createDirector } = useDirector();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Por favor ingrese un nombre");
      return;
    }

    await createDirector(formData);
  };

  return (
    <section className="flex justify-center items-center p-4 md:p-8 w-full">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center space-x-2">
            <FaUserPlus className="text-primary" />
            <span>Registrar Nuevo Director</span>
          </CardTitle>
          <CardDescription>
            Introduce la información del director o directora venezolano.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ej. Roman Chalbaud"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.currentTarget.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth" className="flex items-center space-x-1">
                <FiCalendar size={14} /> <span>Fecha de Nacimiento</span>
              </Label>
              <Input
                id="birth"
                type="date"
                value={formData.birth || ""}
                onChange={(e) =>
                  setFormData({ ...formData, birth: e.currentTarget.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="biography"
                className="flex items-center space-x-1"
              >
                <FiBookOpen size={14} /> <span>Biografía</span>
              </Label>
              <Textarea
                id="biography"
                placeholder="Escribe una breve reseña de su vida y trayectoria..."
                value={formData.biography}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.currentTarget.value })
                }
                rows={6}
              />
            </div>

            <div
              className={`flex ${
                newMovie ? "justify-between" : "justify-center"
              } items-center mt-4`}
            >
              {newMovie && (
                <Link to={"/cmovies"}>
                  <Button variant="outline" type="button" className="text-base">
                    <IoArrowBackOutline size={20} className="mr-2" />
                    Volver a Películas
                  </Button>
                </Link>
              )}
              <Button type="submit" className="h-10 text-lg font-semibold">
                <FaSave className="mr-2 h-4 w-4" /> Agregar Director
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
