
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Drum } from 'lucide-react';
import { categories } from '@/data/mockData';

const NavegacionPrincipal: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-3 navbar-categories sticky top-[72px] z-40 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex overflow-x-auto space-x-8">
            {categories.map((category) => {
              const isActive = location.search.includes(`categoria=${category.slug}`);
              return (
                <Link
                  key={category.id}
                  to={`/productos?categoria=${category.slug}`}
                  className={`whitespace-nowrap font-medium py-2 border-b-2 transition-colors duration-300 relative group ${
                    isActive 
                    ? 'text-choco-gold border-choco-gold dark:text-choco-gold dark:border-choco-gold' 
                    : 'text-choco-dark hover:text-choco-blue border-transparent hover:border-choco-blue dark:text-gray-300 dark:hover:text-choco-gold dark:hover:border-choco-gold'
                  }`}
                >
                  {category.name}
                  {/* Elemento decorativo que aparece al hacer hover */}
                  <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-choco-gold">
                    ✦
                  </span>
                </Link>
              );
            })}
          </div>
          
          <div className="lg:hidden w-full">
            <div className="relative">
              <select 
                className="w-full bg-white dark:bg-gray-800 border border-choco-gold/30 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-choco-gold dark:focus:ring-choco-gold text-choco-brown dark:text-gray-300"
                onChange={(e) => {
                  if (e.target.value) {
                    window.location.href = `/productos?categoria=${e.target.value}`;
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Descubrir categorías...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-choco-gold">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicador de tradición del Pacífico */}
        <div className="flex justify-center mt-3 pt-3 hidden lg:flex">
          <div className="flex items-center text-xs text-choco-brown/70 dark:text-gray-400">
            <span className="mr-2">
              <Drum size={14} className="text-choco-gold" />
            </span>
            <span className="italic font-serif">Tradiciones del Pacífico colombiano</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavegacionPrincipal;
