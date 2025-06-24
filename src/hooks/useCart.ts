
import { useStore } from '@/store/useStore';

export interface CartContextType {
  items: any[];
  total: number;
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = (): CartContextType => {
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
