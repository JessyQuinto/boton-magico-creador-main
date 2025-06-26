import { apiClient } from './apiClient';
import type { CartDto, CartItemDto } from '@/types/api';

interface UpdateCartRequest {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

class CartService {
  async getCart(): Promise<CartDto> {
    console.log('Fetching user cart');
    try {
      return await apiClient.get<CartDto>('/cart');
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw new Error('No se pudo cargar el carrito.');
    }
  }

  async updateCart(cartData: UpdateCartRequest): Promise<CartDto> {
    console.log('Updating cart:', cartData);
    try {
      return await apiClient.post<CartDto>('/cart', cartData);
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw new Error('No se pudo actualizar el carrito.');
    }
  }

  async addToCart(productId: number, quantity: number = 1): Promise<CartDto> {
    console.log(`Adding product ${productId} to cart (quantity: ${quantity})`);
    try {
      // Primero obtenemos el carrito actual
      const currentCart = await this.getCart();
      
      // Buscamos si el producto ya existe
      const existingItem = currentCart.items.find(item => item.productId === productId);
      
      let updatedItems;
      if (existingItem) {
        // Si existe, actualizamos la cantidad
        updatedItems = currentCart.items.map(item => 
          item.productId === productId 
            ? { productId: item.productId, quantity: item.quantity + quantity }
            : { productId: item.productId, quantity: item.quantity }
        );
      } else {
        // Si no existe, lo agregamos
        updatedItems = [
          ...currentCart.items.map(item => ({ 
            productId: item.productId, 
            quantity: item.quantity 
          })),
          { productId, quantity }
        ];
      }

      return await this.updateCart({ items: updatedItems });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw new Error('No se pudo añadir el producto al carrito.');
    }
  }

  async removeFromCart(productId: number): Promise<CartDto> {
    console.log(`Removing product ${productId} from cart`);
    try {
      const currentCart = await this.getCart();
      const updatedItems = currentCart.items
        .filter(item => item.productId !== productId)
        .map(item => ({ productId: item.productId, quantity: item.quantity }));

      return await this.updateCart({ items: updatedItems });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw new Error('No se pudo eliminar el producto del carrito.');
    }
  }

  async updateQuantity(productId: number, quantity: number): Promise<CartDto> {
    console.log(`Updating quantity for product ${productId} to ${quantity}`);
    try {
      if (quantity <= 0) {
        return await this.removeFromCart(productId);
      }

      const currentCart = await this.getCart();
      const updatedItems = currentCart.items.map(item => 
        item.productId === productId 
          ? { productId: item.productId, quantity }
          : { productId: item.productId, quantity: item.quantity }
      );

      return await this.updateCart({ items: updatedItems });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw new Error('No se pudo actualizar la cantidad.');
    }
  }

  async clearCart(): Promise<void> {
    console.log('Clearing cart');
    try {
      await apiClient.delete<void>('/cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw new Error('No se pudo vaciar el carrito.');
    }
  }
}

export const cartService = new CartService();
