
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { producerService } from '@/services/producerService';
import { useToast } from '@/hooks/use-toast';
import type { ProducerDto } from '@/types/api';

export const useProducers = () => {
  return useQuery({
    queryKey: ['producers'],
    queryFn: producerService.getProducers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProducer = (id: number) => {
  return useQuery({
    queryKey: ['producer', id],
    queryFn: () => producerService.getProducerById(id),
    enabled: !!id,
  });
};

export const useFeaturedProducers = () => {
  return useQuery({
    queryKey: ['producers', 'featured'],
    queryFn: producerService.getFeaturedProducers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateProducer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: producerService.createProducer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['producers'] });
      toast({
        title: 'Productor creado',
        description: 'El productor ha sido creado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al crear productor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProducer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, producer }: { id: number; producer: Partial<ProducerDto> }) =>
      producerService.updateProducer(id, producer),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['producers'] });
      queryClient.invalidateQueries({ queryKey: ['producer', id] });
      toast({
        title: 'Productor actualizado',
        description: 'El productor ha sido actualizado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar productor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProducer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: producerService.deleteProducer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['producers'] });
      toast({
        title: 'Productor eliminado',
        description: 'El productor ha sido eliminado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al eliminar productor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
