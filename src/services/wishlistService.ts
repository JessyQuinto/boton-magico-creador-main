
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { ProductDto } from '@/types/api';

export interface WishlistDto {
  id: number;
  userId: number;
  products: ProductDto[];
  createdAt: string;
  updatedAt: string;
}

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
}

export const wishlistService = new WishlistService();
