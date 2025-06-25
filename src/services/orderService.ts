
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { OrderDto, CreateOrderRequestDto, OrderListParams } from '@/types/api';

class OrderService {
  async getOrders(params?: OrderListParams): Promise<OrderDto[]> {
    console.log('Fetching user orders', params);
    try {
      return await apiClient.get<OrderDto[]>(API_CONFIG.ENDPOINTS.ORDERS, params);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw new Error('No se pudieron cargar las órdenes.');
    }
  }

  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    try {
      return await apiClient.get<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw new Error('No se pudo cargar la orden.');
    }
  }

  async createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order');
    try {
      return await apiClient.post<OrderDto>(API_CONFIG.ENDPOINTS.ORDERS, orderData);
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('No se pudo crear la orden. Por favor, intenta nuevamente.');
    }
  }

  async cancelOrder(id: number, reason?: string): Promise<OrderDto> {
    console.log(`Cancelling order with ID: ${id}`);
    try {
      return await apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/cancel`, { reason });
    } catch (error) {
      console.error(`Failed to cancel order ${id}:`, error);
      throw new Error('No se pudo cancelar la orden.');
    }
  }

  async updateOrderStatus(id: number, status: string): Promise<OrderDto> {
    console.log(`Updating order ${id} status to: ${status}`);
    try {
      return await apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/status`, { status });
    } catch (error) {
      console.error(`Failed to update order ${id} status:`, error);
      throw new Error('No se pudo actualizar el estado de la orden.');
    }
  }

  async getOrderHistory(params?: OrderListParams): Promise<OrderDto[]> {
    console.log('Fetching order history', params);
    try {
      return await apiClient.get<OrderDto[]>(`${API_CONFIG.ENDPOINTS.ORDERS}/history`, params);
    } catch (error) {
      console.error('Failed to fetch order history:', error);
      throw new Error('No se pudo cargar el historial de órdenes.');
    }
  }
}

export const orderService = new OrderService();
