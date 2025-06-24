
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { getProducerById } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const producer = getProducerById(product.producerId);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="block group">
      <div className="card-modern hover:scale-[1.02] transition-transform duration-300">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-lg font-medium shadow-lg">
              ¡Últimas unidades!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium text-lg bg-black/50 px-4 py-2 rounded-xl">Agotado</span>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-modern-green-600 text-white text-xs px-2 py-1 rounded-lg font-medium shadow-lg">
              Destacado
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-modern-gray-900 dark:text-white text-lg line-clamp-2 group-hover:text-modern-green-600 dark:group-hover:text-modern-green-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-modern-gray-500 dark:text-modern-gray-400 mt-1">
              Por {producer?.name}
            </p>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(product.rating || 0) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-modern-gray-300 dark:text-modern-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-modern-gray-500 dark:text-modern-gray-400 ml-2">
              ({product.rating?.toFixed(1) || '0.0'})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-modern-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </p>
              {product.discountedPrice && (
                <p className="text-sm text-modern-gray-500 line-through">
                  {formatCurrency(product.discountedPrice)}
                </p>
              )}
            </div>
            
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-xl bg-modern-green-50 dark:bg-modern-green-600/20 text-modern-green-600 dark:text-modern-green-400 hover:bg-modern-green-100 dark:hover:bg-modern-green-600/30 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Añadir al carrito"
              >
                <ShoppingCart size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
