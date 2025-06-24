
import React, { useState } from 'react';
import { Heart, Minus, Plus, Share2, Truck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product, Producer, Category } from '@/types'; // Import from centralized types
import { getProducerById, getCategoryById } from '@/data/mockData'; // These functions still come from mockData
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const producer = getProducerById(product.producerId);
  const category = getCategoryById(product.categoryId);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product || !producer || !category) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <button onClick={handleGoBack} className="flex items-center text-campo-brown mb-6 hover:text-campo-terracotta transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        <span>Volver</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <Link to={`/productos?categoria=${category.slug}`} className="text-sm text-campo-terracotta hover:underline">
              {category.name}
            </Link>
            <h1 className="text-3xl font-serif font-bold text-campo-dark mt-1">{product.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.rating} estrellas)</span>
            </div>
            
            <div className="text-2xl font-bold text-campo-terracotta">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Descripción</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Artisan Info */}
          <div className="bg-campo-cream rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <img src={producer.image} alt={producer.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-4">
                <p className="text-sm text-campo-brown">Hecho por</p>
                <Link to={`/artesano/${producer.id}`} className="font-medium hover:text-campo-terracotta">
                  {producer.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{producer.location}</p>
              </div>
            </div>
          </div>

          {/* Stock & Quantity */}
          <div className="mb-6">
            <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `En stock (${product.stock} disponibles)` : 'Agotado'}
            </p>
            
            {product.stock > 0 && (
              <div className="flex items-center mt-4">
                <span className="mr-3 text-gray-700">Cantidad:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    className="p-2 text-gray-600 hover:text-campo-brown"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    className="p-2 text-gray-600 hover:text-campo-brown"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 px-6 rounded-md flex items-center justify-center ${
                product.stock === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-campo-brown text-white hover:bg-opacity-90'
              }`}
            >
              Añadir al carrito
            </button>
            
            <button className="py-3 px-6 rounded-md border border-campo-brown text-campo-brown hover:bg-campo-cream flex items-center justify-center">
              <Heart size={20} className="mr-2" />
              <span>Guardar</span>
            </button>
            
            <button className="py-3 px-3 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center">
              <Share2 size={18} />
            </button>
          </div>
          
          {/* Shipping Info */}
          <div className="mt-6 flex items-start border-t pt-4">
            <Truck size={20} className="text-campo-green mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Envío gratis para compras superiores a $150.000. Tiempo estimado de entrega: 3-5 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
