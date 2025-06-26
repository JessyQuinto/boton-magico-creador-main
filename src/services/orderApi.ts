import { apiClient } from './apiClient';
import type { OrderDto, CreateOrderRequestDto } from '@/types/api';

class OrderService {
  async createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order:', orderData);
    try {
      return await apiClient.post<OrderDto>('/orders', orderData);
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('No se pudo crear la orden.');
    }
  }

  async getOrders(): Promise<OrderDto[]> {
    console.log('Fetching user orders');
    try {
      return await apiClient.get<OrderDto[]>('/orders');
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw new Error('No se pudieron cargar las órdenes.');
    }
  }

  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    try {
      return await apiClient.get<OrderDto>(`/orders/${id}`);
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw new Error('No se pudo cargar la orden.');
    }
  }

  async cancelOrder(id: number): Promise<OrderDto> {
    console.log(`Cancelling order with ID: ${id}`);
    try {
      return await apiClient.patch<OrderDto>(`/orders/${id}/cancel`);
    } catch (error) {
      console.error(`Failed to cancel order ${id}:`, error);
      throw new Error('No se pudo cancelar la orden.');
    }
  }
}

export const orderApi = new OrderService();
