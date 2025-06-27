// ===========================
// TIPOS ACTUALIZADOS SEGÚN DOCUMENTACIÓN BACKEND
// ===========================

// User Types - Compatibles con backend
export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Product Types - Exactamente según documentación backend
export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  categoryId: number;
  producerId: number;
  stock: number;
  featured: boolean;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProducerDto {
  id: number;
  name: string;
  description?: string;
  location?: string;
  image?: string;
  featured: boolean;
  foundedYear?: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Types - Exactamente según documentación backend
export interface CartItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface CartDto {
  id: number;
  userId: number;
  items: CartItemDto[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Wishlist Types
export interface WishlistDto {
  id: number;
  userId: number;
  products: ProductDto[];
  createdAt: string;
  updatedAt: string;
}

// Order Types - Exactamente según documentación backend
export interface OrderShippingAddress {
  name: string;
  address: string;
  city: string;
  region: string;
  zipCode: string;
  phone: string;
}

export interface OrderDto {
  id: number;
  userId: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItemDto[];
  shippingAddress: OrderShippingAddress;
  paymentMethod: string;
  total: number;
  requestedDeliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewDto {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// ===========================
// REQUEST TYPES SEGÚN BACKEND
// ===========================

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Auth Request DTOs - Exactamente según documentación
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

// Auth Response según documentación backend
export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

// Order Request DTOs - Exactamente según documentación
export interface CreateOrderRequestDto {
  userId: number;
  items: CartItemDto[];
  shippingAddress: OrderShippingAddress;
  paymentMethod: string;
  total: number;
  requestedDeliveryDate?: string;
}

// Cart Request DTOs - Según documentación backend
export interface UpdateCartRequestDto {
  id: number;
  userId: number;
  items: CartItemDto[];
  total: number;
}

export interface AddToCartRequestDto {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequestDto {
  quantity: number;
}

// Query Parameters
export interface OrderListParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface ProductFilters {
  categoryId?: number;
  producerId?: number;
  searchTerm?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'name' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  filters?: ProductFilters;
}

// Backend API Response Types
export interface BackendApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  metadata: {
    timestamp: string;
    version: string;
  };
}

export interface BackendValidationError {
  propertyName: string;
  errorMessage: string;
  errorCode: string;
  attemptedValue?: any;
}

export interface BackendPaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// .NET Identity User Response
export interface DotNetUserDto extends UserDto {
  userName?: string;
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  roles: string[];
  claims: Array<{
    type: string;
    value: string;
  }>;
}

// .NET JWT Token Response
export interface DotNetAuthResponseDto {
  user: DotNetUserDto;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
  scope?: string;
}
