import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FiAlignJustify,
  FiX,
  FiFilm,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { SignOut } from "@/pages/User/SignOut";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { user } = useUser();
  const location = useLocation();

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path?: string) => `
    flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 text-sm font-medium
    ${
      path && isActive(path)
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }
  `;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border text-card-foreground shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            🎬 Pelis VE
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <FiX size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            to="/"
            className={linkClass("/")}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center space-x-3">
              <FiHome size={18} />
              <span>Inicio</span>
            </div>
          </Link>

          <div className="pt-4">
            <p className="px-3 text-xs font-semibold uppercase text-muted-foreground mb-2 tracking-wider">
              Gestión
            </p>

            <div className="space-y-1">
              <button
                onClick={() => toggleSubMenu("movies")}
                className={linkClass()}
              >
                <div className="flex items-center space-x-3">
                  <FiFilm size={18} />
                  <span>Películas</span>
                </div>
                {openSubMenu === "movies" ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {openSubMenu === "movies" && (
                <div className="ml-9 space-y-1 border-l-2 border-muted pl-2 transition-all">
                  <Link
                    to="/cmovies"
                    className={linkClass("/cmovies")}
                    onClick={() => setIsOpen(false)}
                  >
                    Proponer
                  </Link>
                  <Link
                    to="/rmovies"
                    className={linkClass("/rmovies")}
                    onClick={() => setIsOpen(false)}
                  >
                    Ver todas
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-1 mt-2">
              <button
                onClick={() => toggleSubMenu("directors")}
                className={linkClass()}
              >
                <div className="flex items-center space-x-3">
                  <FiUsers size={18} />
                  <span>Directores</span>
                </div>
                {openSubMenu === "directors" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              {openSubMenu === "directors" && (
                <div className="ml-9 space-y-1 border-l-2 border-muted pl-2">
                  <Link
                    to="/cdirector"
                    className={linkClass("/cdirector")}
                    onClick={() => setIsOpen(false)}
                  >
                    Agregar Director
                  </Link>
                  <Link
                    to="/rdirector"
                    className={linkClass("/rdirector")}
                    onClick={() => setIsOpen(false)}
                  >
                    Ver Directores
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-muted/30">
          {user?.user && user?.session ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-2 border-background">
                  {user.user.user_metadata.username?.charAt(0).toUpperCase() ||
                    user.user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">
                    {user.user.user_metadata.username || user.user.email}
                  </p>
                  <Link
                    to="/user"
                    className="text-xs text-primary hover:underline"
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
              <div className="pt-2">
                <SignOut />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/user/login">
                  <FiLogIn className="mr-2" /> Entrar
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/user/signup">
                  <FiUserPlus className="mr-2" /> Unirse
                </Link>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <FiAlignJustify size={24} />
          </Button>
        </div>
      )}
    </>
  );
}
