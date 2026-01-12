import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tables } from "db";
import { FiBookOpen, FiCalendar, FiImage } from "react-icons/fi";

interface DirectorProps {
  director: Tables<"director">;
}

// Componente individual de la tarjeta del director
export function DirectorPreview({ director }: DirectorProps) {
  // Variable booleana para simular si hay una foto disponible
  const hasPhoto = false;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden justify-center">
      <CardHeader className="flex flex-row items-start space-x-4 p-4 md:p-6 pb-2">
        {/* 1. Espacio para la Foto (Opcional) */}
        {hasPhoto ? (
          <div className="w-20 h-20 shrink-0 rounded-full bg-muted flex items-center justify-center border-2 border-primary/50">
            {/* Aquí irá la imagen real del director */}
            <FiImage size={24} className="text-primary/70" />
          </div>
        ) : (
          <div className="w-20 h-20 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl text-primary border border-primary">
            {director.name.charAt(0)}
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {director.name}
          </CardTitle>
          {/* Opcional por si el director no tiene fecha de nacimiento */}
          {director.birth && (
            <CardDescription className="flex items-center space-x-2">
              <FiCalendar size={14} className="text-muted-foreground" />
              <span>
                Nacimiento:
                <Badge
                  variant="outline"
                  className="ml-1 font-semibold border-primary text-primary bg-primary/10"
                >
                  {director.birth}
                </Badge>
              </span>
            </CardDescription>
          )}
        </div>
      </CardHeader>

      {/* Seccion opcional por si el director no tiene biografia */}
      {director.biography && (
        <CardContent className="pt-2 px-4 md:px-6">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground flex items-center space-x-1 mb-1">
            <FiBookOpen size={14} /> <span>Biografía</span>
          </h3>
          <p className="text-sm text-foreground/80 line-clamp-4">
            {director.biography}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
