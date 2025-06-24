
import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      return;
    }
    
    setIsUpdating(true);
    updateQuantity(item.id, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };
  
  const totalPrice = item.price * item.quantity;

  return (
    <div className={`flex py-6 border-b border-modern-gray-200 dark:border-modern-gray-700 transition-colors ${isUpdating ? 'bg-modern-gray-50 dark:bg-modern-gray-800' : ''}`}>
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-modern-gray-200 dark:border-modern-gray-600">
        <Link to={`/producto/${item.slug}`}>
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-modern-gray-900 dark:text-white">
              <Link 
                to={`/producto/${item.slug}`} 
                className="hover:text-modern-green-600 dark:hover:text-modern-green-400 transition-colors"
              >
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-modern-gray-500 dark:text-modern-gray-400 font-body">
              {item.description}
            </p>
          </div>
          <p className="text-right font-bold text-lg text-modern-gray-900 dark:text-white">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between">
          <div className="flex items-center bg-modern-gray-100 dark:bg-modern-gray-700 rounded-xl p-1">
            <button 
              onClick={() => handleQuantityChange(item.quantity - 1)} 
              className="p-2 text-modern-gray-600 dark:text-modern-gray-400 hover:text-modern-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-white dark:hover:bg-modern-gray-600"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="mx-3 w-8 text-center font-medium text-modern-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button 
              onClick={() => handleQuantityChange(item.quantity + 1)} 
              className="p-2 text-modern-gray-600 dark:text-modern-gray-400 hover:text-modern-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-white dark:hover:bg-modern-gray-600"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="flex items-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
          >
            <X size={16} className="mr-1" />
            <span className="font-body">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
