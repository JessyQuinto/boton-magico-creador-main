
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Settings, LogOut, TreePalm } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  const itemCount = items.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/productos?buscar=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200 border-b border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-tesoros-green to-tesoros-blue rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105 shadow-sm">
              <TreePalm className="text-white h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-tesoros-brown dark:text-white font-alternates">Tesoros<span className="text-tesoros-gold">Chocó</span></h1>
              <p className="text-xs text-tesoros-brown/70 dark:text-gray-400">Tradición del Chocó</p>
            </div>
          </Link>

          {/* Buscador (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar productos artesanales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-2 border-tesoros-gold/30 dark:border-gray-600 rounded-lg focus:border-tesoros-green dark:focus:border-tesoros-gold bg-white dark:bg-gray-800 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tesoros-brown dark:text-gray-400 hover:text-tesoros-green dark:hover:text-tesoros-gold transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-3">
            {/* Toggle de tema */}
            <ThemeToggle />

            {/* Carrito */}
            <Link to="/carrito">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-md border border-tesoros-gold/30 dark:border-gray-600 bg-white/80 dark:bg-gray-800 hover:bg-tesoros-cream dark:hover:bg-gray-700 text-tesoros-brown dark:text-gray-300 hover:text-tesoros-green dark:hover:text-tesoros-gold transition-all"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-tesoros-red text-white text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Autenticación */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-md border border-tesoros-gold/30 dark:border-gray-600 bg-white/80 dark:bg-gray-800 hover:bg-tesoros-cream dark:hover:bg-gray-700 text-tesoros-brown dark:text-gray-300 hover:text-tesoros-green dark:hover:text-tesoros-gold transition-all"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-tesoros-brown dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center text-tesoros-brown dark:text-gray-300 hover:text-tesoros-green dark:hover:text-white hover:bg-tesoros-cream/50 dark:hover:bg-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account-management" className="flex items-center text-tesoros-brown dark:text-gray-300 hover:text-tesoros-green dark:hover:text-white hover:bg-tesoros-cream/50 dark:hover:bg-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Gestión de Cuentas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-tesoros-green text-tesoros-green hover:bg-tesoros-green hover:text-white dark:border-tesoros-gold dark:text-tesoros-gold dark:hover:bg-tesoros-gold dark:hover:text-black transition-all shadow-sm"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-tesoros-green hover:bg-tesoros-blue text-white shadow-lg dark:bg-tesoros-gold dark:hover:bg-tesoros-gold/90 dark:text-black transition-all"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 text-tesoros-brown dark:text-gray-300 hover:text-tesoros-green dark:hover:text-tesoros-gold hover:bg-tesoros-cream/50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil expandido */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 bg-white dark:bg-gray-900">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 border-tesoros-gold/30 dark:border-gray-600 bg-white dark:bg-gray-800 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tesoros-brown dark:text-gray-400 hover:text-tesoros-green dark:hover:text-tesoros-gold"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
