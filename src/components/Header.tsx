
import { ShoppingCart, Search, Menu, User, LogOut, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore, useAuth } from "@/store/useStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount, searchQuery, setSearchQuery, logout, wishlist } = useStore();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Cerrar menú móvil en resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/shop", label: "Tienda" },
    { to: "/stories", label: "Historias" },
    { to: "/about", label: "Sobre Nosotros" },
    { to: "/contact", label: "Contacto" }
  ];

  const renderNavLink = (link: typeof navLinks[0], isMobile = false) => {
    const className = `text-primary hover:text-action font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2 rounded-md px-2 py-1 ${
      isMobile ? 'block py-3 px-4 border-b border-secondary/10 hover:bg-action/5' : ''
    }`;
    
    return (
      <Link
        key={link.label}
        to={link.to}
        className={className}
        onClick={isMobile ? closeMenu : undefined}
        role="menuitem"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header 
      className="bg-background shadow-sm border-b border-secondary/20 sticky top-0 z-50"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2 rounded-md p-1"
              aria-label="Ir al inicio - Chocó Artesanal"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-action to-secondary rounded-full flex items-center justify-center shadow-md">
                <span className="text-background font-bold text-sm md:text-lg" aria-hidden="true">C</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-primary">
                  Chocó Artesanal
                </h1>
                <p className="text-xs text-secondary hidden sm:block">Tesoros del Pacífico</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            role="navigation"
            aria-label="Navegación principal"
          >
            {navLinks.map(link => renderNavLink(link))}
          </nav>

          {/* Search Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <label htmlFor="desktop-search" className="sr-only">
                  Buscar productos
                </label>
                <Input
                  id="desktop-search"
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 text-sm border-secondary/30 focus:border-action"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-action hover:bg-action/90 min-h-[44px]"
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Cerrar búsqueda"
                  className="min-h-[44px]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Abrir búsqueda"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
            
            {/* Auth Section - Hidden on small screens when menu is closed */}
            <div className="hidden md:flex items-center space-x-2">
              {isLoggedIn && user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-action hover:bg-background min-h-[44px]" 
                    asChild
                  >
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-1"
                      aria-label={`Perfil de ${user.firstName || user.name}`}
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden lg:inline">{user.firstName || user.name}</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]"
                    onClick={handleLogout}
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-action hover:bg-background text-xs lg:text-sm min-h-[44px]" 
                    asChild
                  >
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-action hover:bg-action/90 text-background text-xs lg:text-sm min-h-[44px]" 
                    asChild
                  >
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]" 
              asChild
            >
              <Link 
                to="/wishlist"
                aria-label={`Lista de deseos${wishlist.length > 0 ? ` (${wishlist.length} productos)` : ''}`}
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-action text-background text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs font-medium"
                    aria-label={`${wishlist.length} productos en lista de deseos`}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]" 
              asChild
            >
              <Link 
                to="/cart"
                aria-label={`Carrito de compras${cartCount > 0 ? ` (${cartCount} productos)` : ''}`}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-action text-background text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs font-medium"
                    aria-label={`${cartCount} productos en el carrito`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-secondary hover:text-action hover:bg-background min-h-[44px] min-w-[44px]"
              onClick={toggleMenu}
              onKeyDown={handleKeyDown}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-secondary/20 py-4 bg-background">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <label htmlFor="mobile-search" className="sr-only">
                Buscar productos
              </label>
              <Input
                id="mobile-search"
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm border-secondary/30 focus:border-action"
                autoFocus
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-action hover:bg-action/90 min-h-[44px]"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="lg:hidden fixed inset-0 bg-primary/50 backdrop-blur-sm z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <div 
              id="mobile-menu"
              className="lg:hidden fixed top-16 left-0 right-0 bg-background border-t border-secondary/20 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
              role="menu"
              aria-label="Menú de navegación móvil"
            >
              <nav className="py-4" role="navigation">
                {navLinks.map(link => renderNavLink(link, true))}
                
                {/* Auth Section in Mobile Menu */}
                <div className="border-t border-secondary/20 mt-4 pt-4">
                  {isLoggedIn && user ? (
                    <div className="space-y-1">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
                        onClick={closeMenu}
                        role="menuitem"
                        aria-label={`Perfil de ${user.firstName || user.name}`}
                      >
                        <User className="h-5 w-5" aria-hidden="true" />
                        <span>{user.firstName || user.name}</span>
                      </Link>
                      <button 
                        className="flex items-center space-x-3 text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
                        onClick={handleLogout}
                        role="menuitem"
                        aria-label="Cerrar sesión"
                      >
                        <LogOut className="h-5 w-5" aria-hidden="true" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link 
                        to="/login" 
                        className="block text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
                        onClick={closeMenu}
                        role="menuitem"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link 
                        to="/register" 
                        className="block text-action hover:text-action/80 hover:bg-action/5 font-medium py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2"
                        onClick={closeMenu}
                        role="menuitem"
                      >
                        Registrarse
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
