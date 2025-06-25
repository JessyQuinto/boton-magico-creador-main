
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { OrderDto, CreateOrderRequestDto, OrderListParams } from '@/types/api';

class OrderService {
  async getOrders(params?: OrderListParams): Promise<OrderDto[]> {
    console.log('Fetching user orders', params);
    return apiClient.get<OrderDto[]>(API_CONFIG.ENDPOINTS.ORDERS, params);
  }

  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    return apiClient.get<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
  }

  async createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order');
    return apiClient.post<OrderDto>(API_CONFIG.ENDPOINTS.ORDERS, orderData);
  }

  async cancelOrder(id: number, reason?: string): Promise<OrderDto> {
    console.log(`Cancelling order with ID: ${id}`);
    return apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/cancel`, { reason });
  }

  async updateOrderStatus(id: number, status: string): Promise<OrderDto> {
    console.log(`Updating order ${id} status to: ${status}`);
    return apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/status`, { status });
  }
}

export const orderService = new OrderService();
