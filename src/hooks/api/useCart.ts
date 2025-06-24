
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cartService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

const CART_QUERY_KEY = ['cart'];

export const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Cart query
  const cartQuery = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartService.getCart,
    enabled: isAuthenticated,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
      toast({
        title: 'Producto agregado',
        description: 'El producto ha sido agregado al carrito.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al agregar producto',
        description: error.message || 'No se pudo agregar el producto al carrito.',
        variant: 'destructive',
      });
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.updateCartItem(productId, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar carrito',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: cartService.removeFromCart,
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado del carrito.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al eliminar producto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.setQueryData(CART_QUERY_KEY, null);
      toast({
        title: 'Carrito vacío',
        description: 'Todos los productos han sido eliminados del carrito.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al vaciar carrito',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Sync cart mutation
  const syncCartMutation = useMutation({
    mutationFn: cartService.syncCart,
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });

  return {
    // Data
    cart: cartQuery.data || null,
    items: cartQuery.data?.items || [],
    total: cartQuery.data?.total || 0,
    itemCount: cartQuery.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    
    // Loading states
    isLoading: cartQuery.isLoading,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateCartItemMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
    isClearing: clearCartMutation.isPending,
    isSyncing: syncCartMutation.isPending,
    
    // Actions
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    syncCart: syncCartMutation.mutate,
    
    // Utilities
    refetch: cartQuery.refetch,
    error: cartQuery.error,
  };
};
