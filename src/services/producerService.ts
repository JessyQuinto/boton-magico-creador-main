
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { ProducerDto } from '@/types/api';

class ProducerService {
  async getAllProducers(): Promise<ProducerDto[]> {
    console.log('Fetching all producers');
    return apiClient.get<ProducerDto[]>(API_CONFIG.ENDPOINTS.PRODUCERS);
  }

  async getProducerById(id: number): Promise<ProducerDto> {
    console.log(`Fetching producer with ID: ${id}`);
    return apiClient.get<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`);
  }

  async getFeaturedProducers(): Promise<ProducerDto[]> {
    console.log('Fetching featured producers');
    return apiClient.get<ProducerDto[]>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/featured`);
  }

  async createProducer(producer: Omit<ProducerDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProducerDto> {
    console.log('Creating new producer:', producer.name);
    return apiClient.post<ProducerDto>(API_CONFIG.ENDPOINTS.PRODUCERS, producer);
  }

  async updateProducer(id: number, producer: Partial<ProducerDto>): Promise<ProducerDto> {
    console.log(`Updating producer with ID: ${id}`);
    return apiClient.put<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`, producer);
  }

  async deleteProducer(id: number): Promise<void> {
    console.log(`Deleting producer with ID: ${id}`);
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`);
  }
}

export const producerService = new ProducerService();
