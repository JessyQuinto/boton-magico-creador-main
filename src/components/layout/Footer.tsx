
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const PieDePagina: React.FC = () => {
  return (
    <footer className="bg-tesoros-brown dark:bg-gray-900 text-white pt-12 pb-6 transition-colors duration-200 border-t border-tesoros-brown/20 dark:border-gray-700">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tesoros-green via-tesoros-gold to-tesoros-blue"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4 group">
              <span className="text-white font-alternates text-2xl font-bold group-hover:text-tesoros-gold transition-colors">
                Tesoros<span className="text-tesoros-gold">Chocó</span>
              </span>
            </Link>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Conectando artesanos chocoanos con amantes del arte y la cultura afrocolombiana.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-tesoros-gold hover:text-white transition-colors p-2 bg-white/10 dark:bg-gray-700/50 rounded-full hover:bg-tesoros-gold/20 dark:hover:bg-gray-600/50 hover:scale-105 transform duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="text-tesoros-gold hover:text-white transition-colors p-2 bg-white/10 dark:bg-gray-700/50 rounded-full hover:bg-tesoros-gold/20 dark:hover:bg-gray-600/50 hover:scale-105 transform duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="text-tesoros-gold hover:text-white transition-colors p-2 bg-white/10 dark:bg-gray-700/50 rounded-full hover:bg-tesoros-gold/20 dark:hover:bg-gray-600/50 hover:scale-105 transform duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-tesoros-gold font-alternates">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-center group">
                <MapPin size={16} className="mr-3 text-tesoros-gold group-hover:text-white transition-colors" />
                <p className="text-gray-300 dark:text-gray-400 text-sm group-hover:text-white transition-colors">Quibdó, Chocó, Colombia</p>
              </div>
              <div className="flex items-center group">
                <Phone size={16} className="mr-3 text-tesoros-gold group-hover:text-white transition-colors" />
                <p className="text-gray-300 dark:text-gray-400 text-sm group-hover:text-white transition-colors">+57 300 123 4567</p>
              </div>
              <div className="flex items-center group">
                <Mail size={16} className="mr-3 text-tesoros-gold group-hover:text-white transition-colors" />
                <p className="text-gray-300 dark:text-gray-400 text-sm group-hover:text-white transition-colors">info@tesoroschoco.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 dark:border-gray-600/50 mt-8 pt-6 text-center">
          <p className="text-gray-300 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} TesorosChocó. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PieDePagina;
