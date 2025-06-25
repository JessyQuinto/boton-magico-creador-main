
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { ProducerDto } from '@/types/api';

class ProducerService {
  async getProducers(): Promise<ProducerDto[]> {
    console.log('Fetching all producers');
    try {
      return await apiClient.get<ProducerDto[]>(API_CONFIG.ENDPOINTS.PRODUCERS);
    } catch (error) {
      console.error('Failed to fetch producers:', error);
      throw new Error('No se pudieron cargar los productores.');
    }
  }

  async getProducerById(id: number): Promise<ProducerDto> {
    console.log(`Fetching producer with ID: ${id}`);
    try {
      return await apiClient.get<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch producer ${id}:`, error);
      throw new Error('No se pudo cargar el productor.');
    }
  }

  async getProducerBySlug(slug: string): Promise<ProducerDto> {
    console.log(`Fetching producer with slug: ${slug}`);
    try {
      return await apiClient.get<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/slug/${slug}`);
    } catch (error) {
      console.error(`Failed to fetch producer by slug ${slug}:`, error);
      throw new Error('No se pudo encontrar el productor.');
    }
  }

  async getFeaturedProducers(): Promise<ProducerDto[]> {
    console.log('Fetching featured producers');
    try {
      return await apiClient.get<ProducerDto[]>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/featured`);
    } catch (error) {
      console.error('Failed to fetch featured producers:', error);
      throw new Error('No se pudieron cargar los productores destacados.');
    }
  }

  async createProducer(producer: Omit<ProducerDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProducerDto> {
    console.log('Creating new producer:', producer.name);
    try {
      return await apiClient.post<ProducerDto>(API_CONFIG.ENDPOINTS.PRODUCERS, producer);
    } catch (error) {
      console.error('Failed to create producer:', error);
      throw new Error('No se pudo crear el productor.');
    }
  }

  async updateProducer(id: number, producer: Partial<ProducerDto>): Promise<ProducerDto> {
    console.log(`Updating producer with ID: ${id}`);
    try {
      return await apiClient.put<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`, producer);
    } catch (error) {
      console.error(`Failed to update producer ${id}:`, error);
      throw new Error('No se pudo actualizar el productor.');
    }
  }

  async deleteProducer(id: number): Promise<void> {
    console.log(`Deleting producer with ID: ${id}`);
    try {
      await apiClient.delete(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`);
    } catch (error) {
      console.error(`Failed to delete producer ${id}:`, error);
      throw new Error('No se pudo eliminar el productor.');
    }
  }
}

export const producerService = new ProducerService();
