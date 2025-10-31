import { Input } from "@/components/ui/input";
import { useDirector } from "@/context/DirectorContext";
import type { TablesInsert } from "database.types";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router";

export function CDirector() {
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
    <>
      <section className="flex justify-center items-center w-full">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Nombre</label>
          <Input
            id="title"
            type="text"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />
          <label htmlFor="description">Biografia</label>
          <Input
            id="description"
            type="text"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, biography: e.currentTarget.value })
            }
          />
          <label htmlFor="birth_year">Nacimiento</label>
          <Input
            id="birth_year"
            type="date"
            className="mb-4"
            onChange={(e) =>
              setFormData({ ...formData, birth: e.currentTarget.value })
            }
          />
          <div className="flex justify-between items-center">
            <button>
              <Link to={"/cmovies"}>
                <IoArrowBackOutline size={25} />
              </Link>
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar Director
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
