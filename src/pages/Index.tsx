import { Link } from "react-router";
import { MessageSquare, PlusCircle, Search } from "lucide-react";

export function Index() {
  return (
    <div className="w-full flex flex-col items-center  text-slate-900">
      <header className="w-full py-16 px-4 flex flex-col items-center text-center max-w-5xl space-y-8 mt-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-yellow-500">Cine</span>
            <span className="text-blue-600"> Venezolano</span>
            <span className="text-red-600 font-serif"> 🇻🇪</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-900 max-w-2xl mx-auto italic">
            "El portal donde nuestra identidad se proyecta en la pantalla."
          </p>
        </div>

        <p className="text-lg md:text-xl text-slate-800 leading-relaxed max-w-3xl mx-auto">
          Desde los clásicos de culto hasta las joyas independientes del
          presente. Aquí no solo miras, tú construyes la memoria fílmica de
          nuestro país.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/rmovies"
            className="px-8 py-4 text-lg font-bold rounded-xl shadow-xl transition-all bg-red-600 hover:bg-red-700 text-white hover:scale-105 active:scale-95"
          >
            Explorar Catálogo
          </Link>
          <Link
            to="/cmovies"
            className="px-8 py-4 text-lg font-bold rounded-xl border-2 border-slate-200 bg-slate-200/80 hover:border-blue-600 hover:text-blue-600 transition-all"
          >
            Proponer una Película
          </Link>
        </div>
      </header>

      <section className="w-full max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
            <Link to={"/rmovies"}>
              <Search size={32} />
            </Link>
          </div>
          <h3 className="text-xl font-bold">
            <Link to={"/rmovies"}>Descubre Joyas</Link>
          </h3>
          <p className="text-slate-800 text-sm">
            Encuentra detalles técnicos y curiosidades de producciones
            nacionales, desde cortometrajes hasta grandes éxitos.
          </p>
        </div>

        <div className="p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Link to={"/cmovies"}>
              <PlusCircle size={32} />
            </Link>
          </div>
          <h3 className="text-xl font-bold">
            <Link to={"/cmovies"}>Haz tu Aporte</Link>
          </h3>
          <p className="text-slate-800 text-sm">
            ¿Falta una película que conoces? Agrégala a nuestra base de datos
            para que otros puedan conocerla.
          </p>
        </div>

        <div className="p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <Link to={"/rmovies"}>
              <MessageSquare size={32} />
            </Link>
          </div>
          <h3 className="text-xl font-bold">
            <Link to={"/rmovies"}>Tu Opinión Cuenta</Link>
          </h3>
          <p className="text-slate-800 text-sm">
            Comenta, debate y valora las historias que nos representan. Crea
            comunidad con otros cinéfilos.
          </p>
        </div>
      </section>

      <footer className="mt-auto py-10 text-slate-800 text-sm">
        <p>© {new Date().getFullYear()} Comunidad de Cine Venezolano</p>
      </footer>
    </div>
  );
}
