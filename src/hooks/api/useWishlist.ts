
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishlistService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

const WISHLIST_QUERY_KEY = ['wishlist'];

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Wishlist query
  const wishlistQuery = useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: wishlistService.getWishlist,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: wishlistService.addToWishlist,
    onSuccess: (data) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, data);
      toast({
        title: 'Agregado a favoritos',
        description: 'El producto ha sido agregado a tu lista de favoritos.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al agregar a favoritos',
        description: error.message || 'No se pudo agregar el producto a favoritos.',
        variant: 'destructive',
      });
    },
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onSuccess: (data) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, data);
      toast({
        title: 'Eliminado de favoritos',
        description: 'El producto ha sido eliminado de tu lista de favoritos.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al eliminar de favoritos',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Clear wishlist mutation
  const clearWishlistMutation = useMutation({
    mutationFn: wishlistService.clearWishlist,
    onSuccess: () => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, null);
      toast({
        title: 'Lista de favoritos vacía',
        description: 'Todos los productos han sido eliminados de tu lista de favoritos.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al vaciar favoritos',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    // Data
    wishlist: wishlistQuery.data || null,
    products: wishlistQuery.data?.products || [],
    
    // Loading states
    isLoading: wishlistQuery.isLoading,
    isAdding: addToWishlistMutation.isPending,
    isRemoving: removeFromWishlistMutation.isPending,
    isClearing: clearWishlistMutation.isPending,
    
    // Actions
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    clearWishlist: clearWishlistMutation.mutate,
    
    // Utilities
    refetch: wishlistQuery.refetch,
    error: wishlistQuery.error,
    isInWishlist: (productId: number) => 
      wishlistQuery.data?.products.some(p => p.id === productId) || false,
  };
};
