
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n2_AaYybSc-oi8aRe4-yADQdflQPJgHRihbTxUd5qvSTtuknxeDKf0rRfuoARX9LW7IXNQM2Eyn_hiqRMWRXBB466EPwiPNjfEiWaLevgdAJ8EydB8VG7ugowjB8NweXz_6JOhsb8zY_iq7uT9RDc--OMwgmksIWyBS4tQYULI3isQJNMySM4JX8iE0K-pUyijAPf4jynySu5vdub-C6GopDl9WI7RlaKqtaXa0bepak7--tPCqgEwgxyca5iPDw8B1wLkFN"
          alt="Artesana chocoana trabajando en sus creaciones"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="text-center space-y-6 sm:space-y-8 max-w-4xl w-full">
          {/* Main headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              <span className="block">Descubre el</span>
              <span className="block text-primary-action">Alma de Chocó</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
              Artesanías únicas hechas a mano por maestros artesanos afrocolombianos. 
              Cada pieza cuenta una historia de tradición, cultura y amor por el arte.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary-action hover:bg-primary-action/90 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[56px]"
              asChild
            >
              <Link to="/shop">Explorar Tienda</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-text px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-lg transition-all duration-300 bg-transparent backdrop-blur-sm shadow-lg min-h-[56px]"
              asChild
            >
              <Link to="/stories">Conoce las Historias</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
