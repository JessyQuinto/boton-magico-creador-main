import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { ProductDto, WishlistDto } from '@/types/api';

class WishlistService {
  async getWishlist(): Promise<WishlistDto> {
    console.log('Fetching user wishlist');
    return apiClient.get<WishlistDto>(API_CONFIG.ENDPOINTS.WISHLIST);
  }

  async addToWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Adding product ${productId} to wishlist`);
    return apiClient.post<WishlistDto>(`${API_CONFIG.ENDPOINTS.WISHLIST}/add`, {
      productId,
    });
  }

  async removeFromWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Removing product ${productId} from wishlist`);
    return apiClient.delete<WishlistDto>(`${API_CONFIG.ENDPOINTS.WISHLIST}/remove/${productId}`);
  }

  async clearWishlist(): Promise<void> {
    console.log('Clearing entire wishlist');
    await apiClient.delete(API_CONFIG.ENDPOINTS.WISHLIST);
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
    await apiClient.post(`${API_CONFIG.ENDPOINTS.WISHLIST}/move-to-cart`, {
      productId,
      quantity,
    });
  }
}

export const wishlistService = new WishlistService();
