
import { useToast } from '@/hooks/use-toast';
import { TOAST_MESSAGES } from '@/lib/toast-helpers';
import { categoryService } from '@/services/categoryService';
import type { CategoryDto } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
      toast(TOAST_MESSAGES.CATEGORY_CREATED);
    },
    onError: (error) => {
      toast({
        ...TOAST_MESSAGES.CATEGORY_ERROR_CREATE,
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
      toast(TOAST_MESSAGES.CATEGORY_UPDATED);
    },
    onError: (error) => {
      toast({
        ...TOAST_MESSAGES.CATEGORY_ERROR_UPDATE,
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
      toast(TOAST_MESSAGES.CATEGORY_DELETED);
    },
    onError: (error) => {
      toast({
        ...TOAST_MESSAGES.CATEGORY_ERROR_DELETE,
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
