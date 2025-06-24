
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-action rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Chocó Artesanal</h3>
                <p className="text-sm text-gray-300">Tesoros del Pacífico</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conectando el talento artesanal afrocolombiano con el mundo, 
              preservando tradiciones y creando oportunidades justas.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-bold mb-4 text-action">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#tienda" className="text-gray-300 hover:text-white transition-colors">Tienda</a></li>
              <li><a href="#historias" className="text-gray-300 hover:text-white transition-colors">Historias Culturales</a></li>
              <li><a href="#nosotros" className="text-gray-300 hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-bold mb-4 text-action">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cestería</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Textiles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cerámica</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Joyería</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instrumentos</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-bold mb-4 text-action">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de Envíos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 Chocó Artesanal. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Síguenos:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
