import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { ProductDto, WishlistDto } from '@/types/api';

class WishlistService {
  async getWishlist(): Promise<WishlistDto> {
    console.log('Fetching user wishlist');
    try {
      return await apiClient.get<WishlistDto>(API_CONFIG.ENDPOINTS.WISHLIST);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      throw new Error('No se pudo cargar la lista de deseos.');
    }
  }

  async addToWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Adding product ${productId} to wishlist`);
    try {
      return await apiClient.post<WishlistDto>(`${API_CONFIG.ENDPOINTS.WISHLIST}/add`, {
        productId,
      });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      throw new Error('No se pudo añadir a la lista de deseos.');
    }
  }

  async removeFromWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Removing product ${productId} from wishlist`);
    try {
      return await apiClient.delete<WishlistDto>(`${API_CONFIG.ENDPOINTS.WISHLIST}/remove/${productId}`);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      throw new Error('No se pudo eliminar de la lista de deseos.');
    }
  }

  async clearWishlist(): Promise<void> {
    console.log('Clearing entire wishlist');
    try {
      await apiClient.delete(API_CONFIG.ENDPOINTS.WISHLIST);
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
      throw new Error('No se pudo vaciar la lista de deseos.');
    }
  }

  async isProductInWishlist(productId: number): Promise<boolean> {
    console.log(`Checking if product ${productId} is in wishlist`);
    try {
      const wishlist = await this.getWishlist();
      return wishlist.products.some(product => product.id === productId);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  }

  async moveToCart(productId: number, quantity: number = 1): Promise<void> {
    console.log(`Moving product ${productId} from wishlist to cart`);
    try {
      await apiClient.post(`${API_CONFIG.ENDPOINTS.WISHLIST}/move-to-cart`, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Failed to move to cart:', error);
      throw new Error('No se pudo mover al carrito.');
    }
  }

  async toggleWishlist(productId: number): Promise<{ added: boolean; wishlist: WishlistDto }> {
    console.log(`Toggling product ${productId} in wishlist`);
    try {
      const isInWishlist = await this.isProductInWishlist(productId);
      
      if (isInWishlist) {
        const wishlist = await this.removeFromWishlist(productId);
        return { added: false, wishlist };
      } else {
        const wishlist = await this.addToWishlist(productId);
        return { added: true, wishlist };
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      throw new Error('No se pudo actualizar la lista de deseos.');
    }
  }
}

export const wishlistService = new WishlistService();
