
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { useToast } from '@/hooks/use-toast';
import type { CategoryDto } from '@/types/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Categoría creada',
        description: 'La categoría ha sido creada exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al crear categoría',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: Partial<CategoryDto> }) =>
      categoryService.updateCategory(id, category),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });
      toast({
        title: 'Categoría actualizada',
        description: 'La categoría ha sido actualizada exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar categoría',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Categoría eliminada',
        description: 'La categoría ha sido eliminada exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al eliminar categoría',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
