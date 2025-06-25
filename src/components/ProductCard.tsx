import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useCart, useWishlist } from "@/hooks/useApi";
import { useNotifications } from "@/hooks/useNotifications";
import ResponsiveImage from "./ResponsiveImage";
import { Product, ProductWithStory, CartItem } from "@/types";

interface ProductCardProps {
  product: Product | ProductWithStory;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Keep local store for immediate UI feedback, but also sync with API
  const { addToCart: addToLocalCart, addToWishlist: addToLocalWishlist, removeFromWishlist: removeFromLocalWishlist } = useStore();
  const wishlist = useStore(state => state.wishlist);
  
  // Use API hooks for server synchronization
  const { addToCartCall, updateCartItem } = useCart();
  const { addToWishlistCall, removeFromWishlistCall, isProductInWishlist } = useWishlist();
  
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();
  const inWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Add to local cart immediately for UI feedback
      const cartItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        slug: product.slug,
        description: product.description,
        artisan: product.artisan,
        origin: product.origin
      };
      
      addToLocalCart(cartItem);
      showSuccess(`¡${product.name} añadido al carrito!`);
      
      // Sync with API in background
      await addToCartCall(product.id, 1);
    } catch (error) {
      showError('Error al añadir al carrito. Intenta nuevamente.');
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (inWishlist) {
        removeFromLocalWishlist(product.id);
        showSuccess(`${product.name} eliminado de favoritos`);
        
        // Sync with API
        await removeFromWishlistCall(product.id);
      } else {
        addToLocalWishlist(product);
        showSuccess(`${product.name} añadido a favoritos`);
        
        // Sync with API
        await addToWishlistCall(product.id);
      }
    } catch (error) {
      showError('Error al actualizar favoritos. Intenta nuevamente.');
      console.error('Failed to update wishlist:', error);
    }
  };

  const handleProductClick = () => {
    navigate(`/producto/${product.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick();
    }
  };

  return (
    <article 
      className="group bg-background rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/20 overflow-hidden w-full max-w-sm mx-auto focus-within:ring-2 focus-within:ring-action focus-within:ring-offset-2"
      role="button"
      tabIndex={0}
      onClick={handleProductClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalles de ${product.name}${product.artisan ? ` por ${product.artisan}` : ''}`}
    >
      <div className="relative overflow-hidden">
        <ResponsiveImage
          src={product.image}
          alt={`${product.name} - Artesanía tradicional${product.origin ? ` del ${product.origin}` : ''}${product.artisan ? ` por ${product.artisan}` : ''}`}
          className="group-hover:scale-110 transition-transform duration-500"
          aspectRatio="landscape"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {product.origin && (
          <div 
            className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-action border border-action/20"
            aria-label={`Origen: ${product.origin}`}
          >
            {product.origin}
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? `Eliminar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          className={`absolute top-3 left-3 p-2 min-w-[44px] min-h-[44px] rounded-full backdrop-blur-sm transition-all ${
            inWishlist 
              ? 'bg-action text-background hover:bg-action/90' 
              : 'bg-background/95 text-secondary hover:bg-background hover:text-action'
          }`}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
        </Button>
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <header>
          <h3 className="font-bold text-base md:text-lg text-primary group-hover:text-action transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-secondary line-clamp-2 mb-2">
            {product.description}
          </p>
          {product.artisan && (
            <p className="text-xs text-action font-medium">
              Por <span className="font-semibold">{product.artisan}</span>
            </p>
          )}
        </header>

        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div 
            className="text-xl md:text-2xl font-bold text-action"
            aria-label={`Precio: ${product.price.toLocaleString()} pesos colombianos`}
          >
            ${product.price.toLocaleString()}
          </div>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            aria-label={`Añadir ${product.name} al carrito`}
            className="bg-action hover:bg-action/90 text-background flex items-center space-x-2 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center min-h-[44px] font-medium"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm">Añadir</span>
          </Button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
