import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button"; 
import { FiAlignJustify, FiX, FiFilm, FiUsers } from "react-icons/fi"; 
import { Link } from "react-router";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const linkClass = "flex items-center space-x-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm font-medium";

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-2xl p-4 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold tracking-tight text-primary">
            🎬 Películas Venezolanas
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <FiX size={24} />
          </Button>
        </div>

        <Link 
            to={"/"} 
            className={`${linkClass} ${window.location.pathname === '/' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-foreground'}`}
            onClick={() => setIsOpen(false)}
        >
            <FiFilm size={20} />
            <span>Inicio</span>
        </Link>
        
        <div className="mt-4 space-y-2">
            
            <h3 className="text-xs font-semibold uppercase text-muted-foreground pt-4 border-t mt-4">
                Gestión de Contenido
            </h3>
            
            <Menubar className="flex flex-col h-full border-none p-0">
                <MenubarMenu>
                    <MenubarTrigger className={linkClass}>
                        <FiFilm size={20} />
                        <span>Películas</span>
                    </MenubarTrigger>
                    <MenubarContent className="w-48 ml-4">
                        <Link to={"/cmovies"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Agregar Película</MenubarItem>
                        </Link>
                        <Link to={"/rmovies"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Ver Películas</MenubarItem>
                        </Link>
                        {/* <Link to={"/umovies"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Editar Película</MenubarItem>
                        </Link>
                        <Link to={"/dmovies"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Eliminar Película</MenubarItem>
                        </Link> */}
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className={linkClass}>
                        <FiUsers size={20} />
                        <span>Directores</span>
                    </MenubarTrigger>
                    <MenubarContent className="w-48 ml-4">
                        <Link to={"/cdirector"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Agregar Director</MenubarItem>
                        </Link>
                        <Link to={"/rdirector"} onClick={() => setIsOpen(false)}>
                            <MenubarItem>Ver Directores</MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 bg-primary text-primary-foreground rounded-tr-xl px-4 py-3 z-50 shadow-lg">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <FiX size={24} /> : <FiAlignJustify size={24} />}
        </Button>
      </div>
    </>
  );
}