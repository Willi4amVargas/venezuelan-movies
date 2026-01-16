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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMovie } from "@/context/MoviesContext";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {
  FiClock,
  FiCalendar,
  FiBookOpen,
  FiUpload,
  FiLink,
  FiUser,
  FiSend,
  FiPlus,
} from "react-icons/fi";
import { useGender } from "@/context/GenderContext";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import { usePeople } from "@/context/PeopleContext";

export function CMovies() {
  const { newMovie, setNewMovie, createMovie } = useMovie();
  const { peoples, getPeoples } = usePeople();
  const { genders, getGenders } = useGender();
  const { user } = useUser();
  const [formState, setFormState] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (Mantengo tu lógica de validación intacta)
    if (
      !newMovie ||
      !newMovie.title ||
      !newMovie.description ||
      !newMovie.coverFile ||
      !newMovie.release ||
      !newMovie.director ||
      newMovie.director === -1
    ) {
      toast.error("Por favor, completa todos los campos requeridos");
      return;
    }
    setFormState(true);
    await createMovie(newMovie);
    setNewMovie(undefined);
    setFormState(false);
  };

  useEffect(() => {
    if (!user || !user.user) {
      toast.info("Es necesario iniciar sesión para proponer una película", {
        toastId: "required_session",
        closeOnClick: true,
        autoClose: false,
      });
    }
    if (!peoples) getPeoples({ people_type: 1 });
    if (!genders) getGenders();
  }, [user, peoples, genders]);

  const inputClasses =
    "bg-white/5 border-white/10 focus:border-[#f07c42] focus:ring-[#f07c42] text-white placeholder:text-white/20";

  return (
    <section className="px-4 relative mx-auto my-5">
      <div className="absolute inset-0 geometric-pattern opacity-10 pointer-events-none" />

      <Card className="max-w-3xl mx-auto bg-[#262627]/80 border-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <div className="h-2 w-full bg-linear-to-r from-[#f07c42] to-[#508696]" />

        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
            <FiSend className="text-[#f07c42]" />
            Proponer Película
          </CardTitle>
          <CardDescription className="text-white/40 italic">
            Ayúdanos a preservar la memoria fílmica de Venezuela añadiendo
            nuevos títulos al catálogo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-xs uppercase tracking-widest font-bold text-[#f07c42]"
                >
                  Título de la Obra
                </Label>
                <Input
                  id="title"
                  placeholder="Ej. Libertador"
                  className={inputClasses}
                  value={newMovie?.title || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, title: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="cover"
                    className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2"
                  >
                    <FiUpload /> Carátula (Poster)
                  </Label>
                  <Input
                    id="cover"
                    type="file"
                    className={`${inputClasses} file:bg-[#f07c42] file:text-[#131315] file:font-bold file:border-none file:rounded-md file:px-3 file:py-1 cursor-pointer`}
                    onChange={(e) =>
                      setNewMovie({
                        ...newMovie,
                        coverFile: e.target.files?.[0] || null,
                      })
                    }
                    accept="image/*"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="trailer"
                    className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2"
                  >
                    <FiLink /> URL Trailer
                  </Label>
                  <Input
                    id="trailer"
                    placeholder="https://youtube.com/..."
                    className={inputClasses}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, trailer: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2"
              >
                <FiBookOpen /> Sinopsis Breve
              </Label>
              <Textarea
                id="description"
                placeholder="Escribe un resumen que atrape al espectador..."
                className={`${inputClasses} min-h-[120px] resize-none`}
                value={newMovie?.description || ""}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <Label
                  htmlFor="release_year"
                  className="text-xs uppercase tracking-widest font-bold text-[#508696] flex items-center gap-2"
                >
                  <FiCalendar /> Lanzamiento
                </Label>
                <Input
                  id="release_year"
                  type="date"
                  className={inputClasses}
                  value={newMovie?.release || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, release: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-xs uppercase tracking-widest font-bold text-[#508696] flex items-center gap-2"
                >
                  <FiClock /> Duración (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="120"
                  className={inputClasses}
                  value={newMovie?.duration || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, duration: +e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-bold text-[#f07c42] flex items-center gap-2">
                  <FiUser /> Dirección
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={newMovie?.director?.toString() || ""}
                    onValueChange={(value) =>
                      setNewMovie({ ...newMovie, director: +value })
                    }
                  >
                    <SelectTrigger className={inputClasses}>
                      <SelectValue placeholder="Seleccionar Director..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#262627] border-white/10 text-white">
                      {peoples?.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Link to="/cdirector">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 bg-white/5 hover:bg-[#f07c42] hover:text-black"
                    >
                      <FiPlus size={20} />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest font-bold text-[#f07c42]">
                  Géneros Cinematográficos
                </Label>
                <Select
                  onValueChange={(value) => {
                    const currentGenders = newMovie?.gender || [];
                    if (!currentGenders.find((g) => g.genderId === +value)) {
                      setNewMovie({
                        ...newMovie,
                        gender: [...currentGenders, { genderId: +value }],
                      });
                    }
                  }}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Añadir géneros..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#262627] border-white/10 text-white">
                    {genders?.map((g) => (
                      <SelectItem key={g.id} value={g.id.toString()}>
                        {g.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex flex-wrap gap-2 min-h-8">
                  {newMovie?.gender?.map((gen, i) => (
                    <Badge
                      key={gen.genderId}
                      className="bg-[#508696]/20 text-[#508696] border-[#508696]/30 px-3 py-1"
                    >
                      {genders?.find((e) => e.id == gen.genderId)?.description}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={formState}
              className="w-full bg-[#f07c42] hover:bg-[#f07c42]/90 text-[#131315] font-black uppercase tracking-widest h-14 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#f07c42]/20"
            >
              {formState ? "Enviando..." : "Enviar Propuesta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
