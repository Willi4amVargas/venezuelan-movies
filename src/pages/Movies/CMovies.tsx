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
import { FaSave } from "react-icons/fa";
import { FiClock, FiCalendar, FiBookOpen } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { useGender } from "@/context/GenderContext";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import { usePeople } from "@/context/PeopleContext";

const badgeColors = ["default", "outline", "secondary", "destructive"] as const;

export function CMovies() {
  const { newMovie, setNewMovie, createMovie } = useMovie();
  const { peoples, getPeoples } = usePeople();
  const { genders, getGenders } = useGender();
  const { user } = useUser();

  const [formState, setFormState] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMovie) {
      toast.error("Necesita llenar todos los campos");
      return;
    }

    if (!newMovie.title || !newMovie.description) {
      toast.error("Necesita llenar los campos de titulo y descripción");
      return;
    }

    if (!newMovie.coverFile) {
      toast.error("Por favor seleccione una carátula para la película");
      return;
    }

    if (!newMovie.release) {
      toast.error("Por favor ingrese una fecha de lanzamiento valida");
      return;
    }

    if (newMovie.duration === undefined || Number.isNaN(newMovie.duration)) {
      toast.error("La duracion tiene que ser un número válido");
      return;
    }

    if (!newMovie.director || newMovie.director === -1) {
      toast.error("Por favor seleccione un director");
      return;
    }
    setFormState(true);
    await createMovie(newMovie);
    setNewMovie(undefined);
    setFormState(false);
  };

  useEffect(() => {
    if (!user || !user.user) {
      toast.info("Es necesario iniciar sesion para hacer un aporte", {
        autoClose: false,
        position: "top-right",
        toastId: "required_session",
        closeOnClick: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!peoples) {
      getPeoples({ people_type: 1 });
    }
  }, [peoples]);

  useEffect(() => {
    if (!genders) {
      getGenders();
    }
  }, [genders]);

  return (
    <section className="flex justify-center items-center p-4 md:p-8 w-full">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center space-x-2">
            <FaSave className="text-primary" />
            <span>Proponer Nueva Película</span>
          </CardTitle>
          <CardDescription>
            Introduce los detalles y la carátula de la película venezolana.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ej. El Libertador"
                value={newMovie?.title || ""}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.currentTarget.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover">Carátula (Poster)</Label>
              <Input
                id="cover"
                type="file"
                className="file:text-primary file:font-semibold file:cursor-pointer"
                onChange={(e) => {
                  setNewMovie({
                    ...newMovie,
                    coverFile: e.currentTarget.files?.[0] || null,
                  });
                }}
                accept="image/*"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="flex items-center space-x-1"
              >
                <FiBookOpen size={14} /> <span>Descripción</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Sinopsis breve de la película..."
                value={newMovie?.description || ""}
                onChange={(e) =>
                  setNewMovie({
                    ...newMovie,
                    description: e.currentTarget.value,
                  })
                }
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="release_year"
                  className="flex items-center space-x-1"
                >
                  <FiCalendar size={14} /> <span>Año de Lanzamiento</span>
                </Label>
                <Input
                  id="release_year"
                  type="date"
                  value={newMovie?.release || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, release: e.currentTarget.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="flex items-center space-x-1"
                >
                  <FiClock size={14} /> <span>Duración (minutos)</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="90"
                  value={newMovie?.duration || ""}
                  onChange={(e) =>
                    setNewMovie({
                      ...newMovie,
                      duration: +e.currentTarget.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              {/* Esto deberia ser un upsert (registrar/buscar) */}
              <Label htmlFor="director">Director</Label>
              <div className="flex items-center space-x-3">
                <Select
                  value={newMovie?.director?.toString() || ""}
                  onValueChange={(value) =>
                    setNewMovie({ ...newMovie, director: +value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un director..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-1" disabled>
                      Seleccione un director...
                    </SelectItem>
                    {peoples &&
                      peoples.map((director) => (
                        <SelectItem
                          key={director.id}
                          value={director.id.toString()}
                        >
                          {director.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Link to={"/cdirector"}>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    aria-label="Añadir Nuevo Director"
                  >
                    <FaCirclePlus size={20} />
                  </Button>
                </Link>
              </div>
            </div>
            {newMovie && (
              <div>
                <Label>Generos</Label>
                <Select
                  onValueChange={(value) => {
                    if (!newMovie.gender) {
                      setNewMovie({
                        ...newMovie,
                        gender: [{ genderId: +value }],
                      });
                      return;
                    }

                    if (
                      newMovie.gender.filter((a) => a.genderId === +value)
                        .length <= 0
                    ) {
                      setNewMovie({
                        ...newMovie,
                        gender: [...newMovie.gender, { genderId: +value }],
                      });
                      return;
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione los generos de la pelicula..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-1" disabled>
                      Seleccione los generos...
                    </SelectItem>
                    {genders &&
                      genders.map((gender) => (
                        <SelectItem
                          key={"GENDER-" + gender.id}
                          value={gender.id.toString()}
                        >
                          {gender.description}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {newMovie && newMovie.gender && (
              <div>
                {newMovie.gender.map((gen, index) => {
                  return (
                    <Badge
                      variant={badgeColors[index % badgeColors.length]}
                      className="mx-1"
                    >
                      {genders.find((e) => e.id == gen.genderId).description}
                    </Badge>
                  );
                })}
              </div>
            )}
            <Button
              type="submit"
              className="w-full mt-4 h-10 text-lg font-semibold"
              disabled={formState}
            >
              <FaSave className="mr-2 h-4 w-4" /> Agregar Película
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
