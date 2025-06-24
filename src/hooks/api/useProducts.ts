
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';
import type { ProductFilters, SearchParams } from '@/types/api';

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAllProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeaturedProducts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductSearch = (params: SearchParams) => {
  return useQuery({
    queryKey: ['products', 'search', params],
    queryFn: () => productService.searchProducts(params),
    enabled: !!params.query || !!params.filters,
  });
};

export const useProductsByCategory = (categoryId: number, filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId, filters],
    queryFn: () => productService.getProductsByCategory(categoryId, filters),
    enabled: !!categoryId,
  });
};

// Admin hooks
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Producto creado',
        description: 'El producto ha sido creado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al crear producto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: any }) =>
      productService.updateProduct(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      toast({
        title: 'Producto actualizado',
        description: 'El producto ha sido actualizado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar producto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado exitosamente.',
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
};
