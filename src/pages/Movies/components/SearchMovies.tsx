import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGender } from "@/context/GenderContext";
import { useMovie } from "@/context/MoviesContext";
import { useEffect, useState } from "react";

export function SearchMovies({ adminView }: { adminView?: boolean }) {
  const { getMovies } = useMovie();
  const { genders, getGenders } = useGender();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectState, setSelectState] = useState<number>(-1);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      const filters: any = {};
      if (searchValue.trim() !== "") {
        filters.q = searchValue;
      }
      if (adminView) {
        if (selectState !== -1) {
          filters.state = selectState;
        }
      } else {
        filters.state = 2;
      }

      getMovies(filters);
    }, 400);

    return () => clearTimeout(debounceId);
  }, [searchValue, selectState, adminView]);

  useEffect(() => {
    if (!genders) getGenders();
  }, [genders]);

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Busca aqui la pelicula..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {adminView && (
        <Select
          value={selectState.toString()}
          onValueChange={(value) => setSelectState(parseInt(value))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por estado..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-1">Todos los estados</SelectItem>
            <SelectItem value="1">En espera</SelectItem>
            <SelectItem value="2">Aceptado</SelectItem>
            <SelectItem value="3">Rechazado</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
