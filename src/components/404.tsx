import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FiFilm, FiHome, FiArrowLeft } from "react-icons/fi";

export function Error404() {
  return (
    <div className="min-h-screen bg-[#131315] font-display text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute inset-0 geometric-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f07c42]/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-2xl text-center space-y-8">
        
        <div className="relative inline-block">
          <FiFilm size={120} className="text-[#f07c42] opacity-20 animate-pulse" />
          <h1 className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl font-black tracking-tighter text-white">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Escena no encontrada
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed italic">
            "Parece que este rollo de película se ha terminado o la escena fue eliminada en la edición final."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/">
            <Button className="bg-[#f07c42] hover:bg-[#f07c42]/90 text-[#131315] font-bold px-8 py-6 rounded-xl text-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
              <FiHome size={20} />
              Volver al Inicio
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 py-6 px-8 rounded-xl font-bold text-white flex items-center gap-2"
          >
            <FiArrowLeft size={20} />
            Regresar
          </Button>
        </div>

        <div className="pt-12 flex items-center justify-center gap-3 text-white/20 uppercase text-[10px] tracking-[0.3em] font-bold">
          <span className="w-12 h-px bg-white/10"></span>
          Cine Venezolano • Archivo Digital
          <span className="w-12 h-px bg-white/10"></span>
        </div>
      </div>
    </div>
  );
}