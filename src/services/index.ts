// Exportación centralizada de todos los servicios API según la documentación

// Servicios principales
export { authService } from './authService';
export { productService } from './productService';
export { cartService } from './cartService';
export { categoryService } from './categoryService';
export { orderService } from './orderService';
export { producerService } from './producerService';
export { wishlistService } from './wishlistService';

// Cliente HTTP base
export { apiClient } from './apiClient';

// Re-exportar tipos principales
export type {
  ProductDto,
  CategoryDto,
  ProducerDto,
  CartDto,
  CartItemDto,
  OrderDto,
  WishlistDto,
  ReviewDto,
  ProductFilters,
  RegisterRequestDto,
  LoginRequestDto,
  AuthResponseDto,
  UserDto,
  CreateOrderRequestDto,
  PaginatedResponse,
  SearchParams
} from '@/types/api';
