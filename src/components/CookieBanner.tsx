
import { useState, useEffect } from 'react';
import { X, Cookie, GraduationCap, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Institutional Message Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="bg-green-600 p-2 rounded-full">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="bg-orange-500 p-2 rounded-full">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                Proyecto SENA - Análisis y Desarrollo de Software
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Este proyecto hace parte del programa del SENA en <strong>Análisis y Desarrollo de Software</strong>, 
                perteneciente al <strong>Grupo 4 de la ficha 2879645</strong>. El proyecto consiste en un eCommerce 
                que vende productos artesanales elaborados por campesinos del departamento del <strong>Chocó</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Consent Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-primary-action p-2 rounded-full flex-shrink-0 mt-1">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                🍪 Aviso de Cookies
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Este sitio web utiliza cookies para mejorar tu experiencia de navegación, 
                personalizar el contenido y analizar el tráfico del sitio. Las cookies nos 
                ayudan a optimizar la plataforma para nuestros usuarios y artesanos.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              onClick={handleRejectCookies}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Rechazar
            </Button>
            <Button
              onClick={handleAcceptCookies}
              className="bg-primary-action hover:bg-primary-action/90 text-white shadow-md transition-all duration-200 transform hover:scale-105"
              size="sm"
            >
              Aceptar Cookies
            </Button>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={handleRejectCookies}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
