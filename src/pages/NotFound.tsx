import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-background border border-secondary/20 rounded-xl p-8 shadow-lg">
          <div className="text-8xl font-bold text-action mb-4">404</div>
          <h1 className="text-2xl font-bold text-primary mb-4">
            Página no encontrada
          </h1>
          <p className="text-secondary mb-6 leading-relaxed">
            Lo sentimos, la página que buscas no existe. Puede que haya sido movida o eliminada.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-action hover:bg-action/90 text-white">
              <Link to="/" className="flex items-center justify-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Volver al Inicio</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full border-action text-action hover:bg-action hover:text-white flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver Atrás</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
