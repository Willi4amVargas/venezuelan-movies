import { Link } from "react-router";

export function Index() {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <header className="text-center max-w-4xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-yellow-400">
            Cine Venezolano 🇻🇪
          </h1>

          <p className="text-xl md:text-3xl font-light text-black">
            Un Viaje por la Historia, las Historias y las Voces de Nuestra
            Tierra.
          </p>

          <p className="text-base md:text-lg text-black leading-relaxed max-w-3xl mx-auto">
            Descubre el corazón palpitante del cine hecho en Venezuela. Desde
            los clásicos inmortales hasta las producciones contemporáneas que
            están redefiniendo nuestra cultura cinematográfica. Explora
            filmografías, noticias, festivales y dónde ver tus películas
            favoritas.
          </p>

          <div className="pt-6">
            <Link
              to={"/rmovies"}
              className="inline-block px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 bg-red-600 hover:bg-red-700 text-white transform hover:scale-105"
            >
              Explora Nuestro Catálogo
            </Link>
          </div>
        </header>
      </div>
    </>
  );
}
