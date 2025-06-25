// API Data Transfer Objects
export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

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
  artisan?: string;
  origin?: string;
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

export interface WishlistDto {
  id: number;
  userId: number;
  products: ProductDto[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderDto {
  id: number;
  userId: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItemDto[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

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

// Request DTOs
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CreateOrderRequestDto {
  items: CartItemDto[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  total: number;
}

export interface OrderListParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  artisan?: string;
  region?: string;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price' | 'name' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  limit?: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  filters?: ProductFilters;
}

// .NET 9 API Response Types
export interface DotNetApiResponse<T = any> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: DotNetValidationError[];
  metadata?: {
    timestamp: string;
    correlationId: string;
    version: string;
  };
}

export interface DotNetValidationError {
  propertyName: string;
  errorMessage: string;
  errorCode: string;
  attemptedValue?: any;
}

export interface DotNetPaginatedResponse<T> {
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
