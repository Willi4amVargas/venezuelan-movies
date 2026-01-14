import { useDirector } from "@/context/DirectorContext";
import { useEffect } from "react";
import { DirectorPreview } from "@/pages/Director/components/DirectorPreview";
import { usePeople } from "@/context/PeopleContext";

// Componente principal de la vista
export function RDirector() {
  const { peoples, getPeoples } = usePeople();

  useEffect(() => {
    if (!peoples) getPeoples({people_type:1});
  }, [getPeoples]);

  return (
    <section className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2">
        👤 Directores Venezolanos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peoples ? (
          peoples.map((director) => (
            <DirectorPreview
              key={`DIRECTOR-${director.id}`}
              director={director}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            Cargando directores...
          </p>
        )}
      </div>
    </section>
  );
}
