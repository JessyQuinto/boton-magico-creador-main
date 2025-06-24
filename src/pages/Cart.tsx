import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, User, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useStore, useCartItems, useCartCount, useCartTotal, useAuth } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const Cart = () => {
  const { 
    updateCartQuantity, 
    removeFromCart, 
    clearCart 
  } = useStore();
  const cartItems = useCartItems();
  const cartCount = useCartCount();
  const cartTotal = useCartTotal();
  const { isLoggedIn } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(itemId, newQuantity);
      showSuccess("Cantidad actualizada");
    }
  };

  const handleRemoveItem = (itemId: number, itemName: string) => {
    removeFromCart(itemId);
    showSuccess(`${itemName} eliminado del carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    showSuccess("Carrito vacío");
  };

  const subtotal = cartTotal;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!acceptTerms) {
      showError("Debes aceptar los términos y condiciones");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <Breadcrumb className="mb-4 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Carrito de Compras</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            Tu Carrito
          </h1>
          {cartCount > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-sm"
              size="sm"
            >
              Vaciar Carrito
            </Button>
          )}
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-8 sm:py-16">
            <div className="max-w-md mx-auto px-4">
              <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 text-secondary/50 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-secondary mb-6 sm:mb-8 text-sm sm:text-lg">
                Descubre nuestros productos únicos y añade algunos a tu carrito
              </p>
              <Button asChild className="bg-action hover:bg-action/90 text-white w-full sm:w-auto">
                <Link to="/shop" className="flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Ir a la Tienda</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-primary">
                  Productos ({cartCount} {cartCount === 1 ? 'artículo' : 'artículos'})
                </h2>
                <Button variant="ghost" asChild className="text-action hover:text-action/80 text-sm sm:text-base">
                  <Link to="/shop" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Continuar Comprando</span>
                  </Link>
                </Button>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-secondary/20 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Link to={`/product-detail?slug=${item.slug}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                          />
                        </Link>
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product-detail?slug=${item.slug}`}>
                          <h3 className="text-sm sm:text-lg font-semibold text-primary hover:text-action transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-secondary text-xs sm:text-sm line-clamp-2 mt-1">
                          {item.description}
                        </p>
                        <p className="text-action font-medium text-xs sm:text-sm mt-1">
                          Por {item.artisan} • {item.origin}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-action mt-1">
                          ${item.price.toLocaleString()} c/u
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xs sm:text-sm text-secondary font-medium">Cantidad:</span>
                        <div className="flex items-center border border-secondary/30 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0 hover:bg-secondary/20"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="px-2 sm:px-4 py-2 font-medium min-w-[2rem] sm:min-w-[3rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 hover:bg-secondary/20"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-lg sm:text-xl font-bold text-action">
                        ${item.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-background border border-secondary/20 rounded-xl p-4 sm:p-6 h-fit sticky top-4 sm:top-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-secondary">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-secondary">IVA (19%):</span>
                  <span className="font-semibold">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-secondary/30 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-bold text-primary">Total:</span>
                    <span className="font-bold text-action text-lg sm:text-xl">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-secondary leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {/* Opciones de Checkout */}
              <div className="space-y-3">
                {isLoggedIn ? (
                  <Button
                    onClick={handleCheckout}
                    disabled={!acceptTerms || cartCount === 0}
                    className="w-full bg-action hover:bg-action/90 text-white py-3 sm:py-4 text-sm sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    asChild={acceptTerms && cartCount > 0}
                  >
                    {acceptTerms && cartCount > 0 ? (
                      <Link to="/checkout" className="flex items-center justify-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Checkout</span>
                      </Link>
                    ) : (
                      <span>Checkout</span>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleCheckout}
                      disabled={!acceptTerms || cartCount === 0}
                      className="w-full bg-action hover:bg-action/90 text-white py-3 sm:py-4 text-sm sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      asChild={acceptTerms && cartCount > 0}
                    >
                      {acceptTerms && cartCount > 0 ? (
                        <Link to="/guest-checkout" className="flex items-center justify-center space-x-2">
                          <UserPlus className="h-4 w-4" />
                          <span>Checkout como Invitado</span>
                        </Link>
                      ) : (
                        <span>Checkout como Invitado</span>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleCheckout}
                      disabled={!acceptTerms || cartCount === 0}
                      className="w-full border-action text-action hover:bg-action hover:text-white py-3 sm:py-4 text-sm sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      asChild={acceptTerms && cartCount > 0}
                    >
                      {acceptTerms && cartCount > 0 ? (
                        <Link to="/login?redirect=/checkout" className="flex items-center justify-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Iniciar Sesión y Checkout</span>
                        </Link>
                      ) : (
                        <span>Iniciar Sesión</span>
                      )}
                    </Button>
                  </>
                )}
              </div>

              <p className="text-xs text-secondary mt-3 sm:mt-4 text-center">
                Compra segura y protegida
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
