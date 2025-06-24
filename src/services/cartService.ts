
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { CartDto, CartItemDto } from '@/types/api';

class CartService {
  async getCart(): Promise<CartDto> {
    console.log('Fetching user cart');
    return apiClient.get<CartDto>(API_CONFIG.ENDPOINTS.CART);
  }

  async addToCart(productId: number, quantity: number = 1): Promise<CartDto> {
    console.log(`Adding product ${productId} to cart (quantity: ${quantity})`);
    return apiClient.post<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/add`, {
      productId,
      quantity,
    });
  }

  async updateCartItem(productId: number, quantity: number): Promise<CartDto> {
    console.log(`Updating cart item ${productId} to quantity: ${quantity}`);
    return apiClient.put<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/update`, {
      productId,
      quantity,
    });
  }

  async removeFromCart(productId: number): Promise<CartDto> {
    console.log(`Removing product ${productId} from cart`);
    return apiClient.delete<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/remove/${productId}`);
  }

  async clearCart(): Promise<void> {
    console.log('Clearing entire cart');
    await apiClient.delete(API_CONFIG.ENDPOINTS.CART);
  }

  async syncCart(items: CartItemDto[]): Promise<CartDto> {
    console.log('Syncing local cart with server');
    return apiClient.post<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/sync`, { items });
  }

  async updateCart(cart: CartDto): Promise<CartDto> {
    console.log('Updating entire cart');
    return apiClient.put<CartDto>(API_CONFIG.ENDPOINTS.CART, cart);
  }
}

export const cartService = new CartService();
