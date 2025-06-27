
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { 
  OrderDto, 
  CreateOrderRequestDto, 
  OrderListParams 
} from '@/types/api';

class OrderService {
  // GET /orders - Obtener órdenes del usuario
  async getOrders(params?: OrderListParams): Promise<OrderDto[]> {
    console.log('Fetching user orders', params);
    try {
      return await apiClient.get<OrderDto[]>(API_CONFIG.ENDPOINTS.ORDERS.BASE, params);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw new Error('No se pudieron cargar las órdenes.');
    }
  }

  // GET /orders/{id} - Obtener orden por ID
  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    try {
      return await apiClient.get<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS.BASE}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw new Error('No se pudo cargar la orden.');
    }
  }

  // POST /orders - Crear nueva orden
  async createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order');
    try {
      return await apiClient.post<OrderDto>(API_CONFIG.ENDPOINTS.ORDERS.BASE, orderData);
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('No se pudo crear la orden. Por favor, intenta nuevamente.');
    }
  }

  // GET /orders/user/{userId} - Para administradores
  async getOrdersByUserId(userId: number, params?: OrderListParams): Promise<OrderDto[]> {
    console.log(`Fetching orders for user: ${userId}`);
    try {
      const endpoint = API_CONFIG.ENDPOINTS.ORDERS.BY_USER.replace('{userId}', userId.toString());
      return await apiClient.get<OrderDto[]>(endpoint, params);
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error);
      throw new Error('No se pudieron cargar las órdenes del usuario.');
    }
  }

  // PATCH /orders/{id}/status - Actualizar estado de orden (Admin)
  async updateOrderStatus(id: number, status: string): Promise<OrderDto> {
    console.log(`Updating order ${id} status to: ${status}`);
    try {
      const endpoint = API_CONFIG.ENDPOINTS.ORDERS.UPDATE_STATUS.replace('{id}', id.toString());
      return await apiClient.patch<OrderDto>(endpoint, { status });
    } catch (error) {
      console.error(`Failed to update order ${id} status:`, error);
      throw new Error('No se pudo actualizar el estado de la orden.');
    }
  }

  // Método helper para validar estados permitidos
  isValidStatus(status: string): boolean {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    return validStatuses.includes(status);
  }

  // Método helper para obtener órdenes por estado
  async getOrdersByStatus(status: string, params?: OrderListParams): Promise<OrderDto[]> {
    console.log(`Fetching orders with status: ${status}`);
    try {
      const queryParams = { ...params, status };
      return await this.getOrders(queryParams);
    } catch (error) {
      console.error(`Failed to fetch orders with status ${status}:`, error);
      throw new Error('No se pudieron cargar las órdenes filtradas.');
    }
  }

  // Método helper para cancelar orden (usando updateOrderStatus)
  async cancelOrder(id: number, reason?: string): Promise<OrderDto> {
    console.log(`Cancelling order with ID: ${id}`);
    try {
      // Solo cambiar el estado - el reason podría enviarse como metadata en implementación real
      return await this.updateOrderStatus(id, 'Cancelled');
    } catch (error) {
      console.error(`Failed to cancel order ${id}:`, error);
      throw new Error('No se pudo cancelar la orden.');
    }
  }

  // Método helper para obtener historial de órdenes (alias de getOrders)
  async getOrderHistory(params?: OrderListParams): Promise<OrderDto[]> {
    console.log('Fetching order history', params);
    return await this.getOrders(params);
  }
}

export const orderService = new OrderService();
