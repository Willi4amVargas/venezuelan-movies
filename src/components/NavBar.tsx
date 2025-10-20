import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`flex flex-col text-center bg-gray-800 text-white px-2 py-1 space-y-4 transition-all duration-300 ease-in-out ${
          isOpen ? "" : "hidden"
        }`}
      >
        <h1>
          <b>
            <Link to={"/"}>Menu</Link>
          </b>
        </h1>
        <Menubar className="text-black">
          <MenubarMenu>
            <MenubarTrigger>Peliculas</MenubarTrigger>
            <MenubarContent>
              <Link to={"/cmovies"} className="cursor-pointer">
                <MenubarItem>Agregar</MenubarItem>
              </Link>
              <Link to={"/rmovies"} className="cursor-pointer">
                <MenubarItem>Ver</MenubarItem>
              </Link>
              <Link to={"/umovies"} className="cursor-pointer">
                <MenubarItem>Editar</MenubarItem>
              </Link>
              <Link to={"/dmovies"} className="cursor-pointer">
                <MenubarItem>Eliminar</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="fixed bottom-0 left-0 bg-gray-800 text-white rounded-tr-xl px-4 pt-3 z-20">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiAlignJustify size={30} className="mx-auto cursor-pointer" />
        </button>
      </div>
    </>
  );
}
