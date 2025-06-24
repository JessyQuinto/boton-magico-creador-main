
import { useEffect } from 'react';
import { useCart } from '@/hooks/api/useCart';
import { useAuth } from '@/hooks/api/useAuth';
import { useStore } from '@/store/useStore';

export const useCartSync = () => {
  const { isAuthenticated } = useAuth();
  const apiCart = useCart();
  const localCart = useStore(state => state.cartItems);
  const { clearCart: clearLocalCart } = useStore();

  // Sync local cart with server when user logs in
  useEffect(() => {
    if (isAuthenticated && localCart.length > 0 && !apiCart.isLoading) {
      // Convert local cart items to API format
      const cartItems = localCart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Sync with server if syncCart method is available
      if (apiCart.syncCart) {
        apiCart.syncCart(cartItems);
      }

      // Clear local cart after sync
      clearLocalCart();
    }
  }, [isAuthenticated, localCart.length, apiCart.isLoading]);

  // Return API cart if authenticated, otherwise use local store methods
  if (isAuthenticated) {
    return {
      items: apiCart.items || [],
      total: apiCart.total || 0,
      itemCount: apiCart.itemCount || 0,
      isLoading: apiCart.isLoading,
      isSyncing: apiCart.isSyncing || false,
      addToCart: apiCart.addToCart,
      updateQuantity: apiCart.updateQuantity,
      removeFromCart: apiCart.removeFromCart,
      clearCart: apiCart.clearCart,
    };
  }

  // Use local store for non-authenticated users
  return {
    items: localCart,
    total: localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    itemCount: localCart.reduce((sum, item) => sum + item.quantity, 0),
    isLoading: false,
    isSyncing: false,
    addToCart: useStore.getState().addToCart,
    updateQuantity: useStore.getState().updateCartQuantity,
    removeFromCart: useStore.getState().removeFromCart,
    clearCart: clearLocalCart,
  };
};
