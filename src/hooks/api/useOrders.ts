
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import type { CreateOrderRequestDto, OrderListParams } from '@/types/api';

export const useOrders = (params?: OrderListParams) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.getUserOrders(params),
    enabled: isAuthenticated,
  });
};

export const useOrder = (id: number) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
    enabled: isAuthenticated && !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequestDto) => orderService.createOrder(orderData),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      
      toast({
        title: '¡Pedido creado!',
        description: `Tu pedido #${order.id} ha sido creado exitosamente.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al crear pedido',
        description: error.message || 'No se pudo procesar tu pedido.',
        variant: 'destructive',
      });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      orderService.cancelOrder(id, reason),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', order.id] });
      
      toast({
        title: 'Pedido cancelado',
        description: `El pedido #${order.id} ha sido cancelado.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al cancelar pedido',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
