// Unified API Configuration for .NET 9 Backend
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
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
      PROFILE: '/auth/profile',
      REVOKE: '/auth/revoke-token',
    },
    PRODUCTS: {
      BASE: '/products',
      FEATURED: '/products/featured',
      SEARCH: '/products/search',
      BY_CATEGORY: '/products/category',
      BY_SLUG: '/products/slug',
      REVIEWS: '/products/{id}/reviews',
    },
    CATEGORIES: '/categories',
    PRODUCERS: '/producers',
    CART: '/cart',
    ORDERS: '/orders',
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

// API Response Types according to integration guide
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  metadata: ApiMetadata;
}

export interface ApiMetadata {
  timestamp: string;
  version: string;
  requestId: string;
}

// .NET Problem Details format
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
