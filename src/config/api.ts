// Backend API Configuration - TesorosChoco
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.tesoroschoco.com/api/v1',
  FALLBACK_URL: 'http://localhost:5000/api/v1', // For development
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh-token',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    PRODUCTS: {
      BASE: '/products',
      BY_ID: '/products/{id}',
      FEATURED: '/products?featured=true',
      SEARCH: '/products',
      BY_CATEGORY: '/products?categoryId={categoryId}',
      BY_PRODUCER: '/products?producerId={producerId}',
    },
    CART: {
      BASE: '/cart',
      ITEMS: '/cart/items',
      ITEM_BY_ID: '/cart/items/{id}',
    },
    ORDERS: {
      BASE: '/orders',
      BY_ID: '/orders/{id}',
      BY_USER: '/orders/user/{userId}',
      UPDATE_STATUS: '/orders/{id}/status',
    },
    CATEGORIES: '/categories',
    PRODUCERS: '/producers',
    WISHLIST: '/wishlist',
    USERS: '/users',
    PAYMENTS: '/payments',
    UPLOAD: '/upload',
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Backend API Response Types según documentación
export interface BackendApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  metadata: {
    timestamp: string;
    version: string;
  };
}

export interface ApiMetadata {
  timestamp: string;
  version: string;
}

// Error response format
export interface BackendErrorResponse {
  data: null;
  success: false;
  message: string;
}

// .NET Problem Details format para errores específicos
export interface DotNetProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

// Note: TokenManager has been moved to utils/tokenManager.ts
// Note: HTTP client functionality is in services/apiClient.ts
// Import from there to avoid duplication
