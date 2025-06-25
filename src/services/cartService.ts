
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { CartDto, CartItemDto } from '@/types/api';

class CartService {
  async getCart(): Promise<CartDto> {
    console.log('Fetching user cart');
    try {
      return await apiClient.get<CartDto>(API_CONFIG.ENDPOINTS.CART);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw new Error('No se pudo cargar el carrito.');
    }
  }

  async addToCart(productId: number, quantity: number = 1): Promise<CartDto> {
    console.log(`Adding product ${productId} to cart (quantity: ${quantity})`);
    try {
      return await apiClient.post<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/add`, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw new Error('No se pudo añadir el producto al carrito.');
    }
  }

  async updateCartItem(productId: number, quantity: number): Promise<CartDto> {
    console.log(`Updating cart item ${productId} to quantity: ${quantity}`);
    try {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      return await apiClient.put<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/update`, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw new Error('No se pudo actualizar el producto en el carrito.');
    }
  }

  async removeFromCart(productId: number): Promise<CartDto> {
    console.log(`Removing product ${productId} from cart`);
    try {
      return await apiClient.delete<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/remove/${productId}`);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw new Error('No se pudo eliminar el producto del carrito.');
    }
  }

  async clearCart(): Promise<void> {
    console.log('Clearing entire cart');
    try {
      await apiClient.delete(API_CONFIG.ENDPOINTS.CART);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw new Error('No se pudo vaciar el carrito.');
    }
  }

  async syncCart(items: CartItemDto[]): Promise<CartDto> {
    console.log('Syncing local cart with server');
    try {
      return await apiClient.post<CartDto>(`${API_CONFIG.ENDPOINTS.CART}/sync`, { items });
    } catch (error) {
      console.error('Failed to sync cart:', error);
      throw new Error('No se pudo sincronizar el carrito.');
    }
  }

  async updateCart(cart: CartDto): Promise<CartDto> {
    console.log('Updating entire cart');
    try {
      return await apiClient.put<CartDto>(API_CONFIG.ENDPOINTS.CART, cart);
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw new Error('No se pudo actualizar el carrito.');
    }
  }
}

export const cartService = new CartService();
