
import { useStore } from '@/store/useStore';
import type { CartItem } from '@/types';

export interface LocalCartContextType {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useLocalCart = (): LocalCartContextType => {
  const { cartItems, cartTotal, addToCart, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const items = cartItems.map(item => ({
    ...item,
    total: item.price * item.quantity
  }));

  return {
    items,
    total: cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity: updateCartQuantity,
    clearCart
  };
};
