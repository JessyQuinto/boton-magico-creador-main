import { apiClient } from './apiClient';
import type { ProducerDto } from '@/types/api';

class ProducerService {
  async getProducers(): Promise<ProducerDto[]> {
    console.log('Fetching all producers');
    try {
      return await apiClient.get<ProducerDto[]>('/producers');
    } catch (error) {
      console.error('Failed to fetch producers:', error);
      throw new Error('No se pudieron cargar los productores.');
    }
  }

  async getProducerById(id: number): Promise<ProducerDto> {
    console.log(`Fetching producer with ID: ${id}`);
    try {
      return await apiClient.get<ProducerDto>(`/producers/${id}`);
    } catch (error) {
      console.error(`Failed to fetch producer ${id}:`, error);
      throw new Error('No se pudo cargar el productor.');
    }
  }

  async getFeaturedProducers(): Promise<ProducerDto[]> {
    console.log('Fetching featured producers');
    try {
      return await apiClient.get<ProducerDto[]>('/producers?featured=true');
    } catch (error) {
      console.error('Failed to fetch featured producers:', error);
      throw new Error('No se pudieron cargar los productores destacados.');
    }
  }
}

export const producerApi = new ProducerService();
