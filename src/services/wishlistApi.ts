import { apiClient } from './apiClient';
import type { WishlistDto, ProductDto } from '@/types/api';

class WishlistService {
  async getWishlist(): Promise<WishlistDto> {
    console.log('Fetching user wishlist');
    try {
      return await apiClient.get<WishlistDto>('/wishlist');
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      throw new Error('No se pudo cargar la lista de deseos.');
    }
  }

  async addToWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Adding product ${productId} to wishlist`);
    try {
      return await apiClient.post<WishlistDto>('/wishlist/add', { productId });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      throw new Error('No se pudo agregar el producto a la lista de deseos.');
    }
  }

  async removeFromWishlist(productId: number): Promise<WishlistDto> {
    console.log(`Removing product ${productId} from wishlist`);
    try {
      return await apiClient.delete<WishlistDto>(`/wishlist/remove/${productId}`);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      throw new Error('No se pudo eliminar el producto de la lista de deseos.');
    }
  }

  async clearWishlist(): Promise<void> {
    console.log('Clearing wishlist');
    try {
      await apiClient.delete<void>('/wishlist');
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
      throw new Error('No se pudo vaciar la lista de deseos.');
    }
  }

  async isInWishlist(productId: number): Promise<boolean> {
    console.log(`Checking if product ${productId} is in wishlist`);
    try {
      const wishlist = await this.getWishlist();
      return wishlist.products.some(product => product.id === productId);
    } catch (error) {
      console.error('Failed to check wishlist status:', error);
      return false;
    }
  }
}

export const wishlistApi = new WishlistService();
