
// Unified API Configuration for .NET 9 Backend
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001',
  TIMEOUT: 30000, // .NET APIs pueden necesitar más tiempo
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      REGISTER: '/api/v1/auth/register',
      REFRESH: '/api/v1/auth/refresh-token',
      LOGOUT: '/api/v1/auth/logout',
      PROFILE: '/api/v1/auth/profile',
      REVOKE: '/api/v1/auth/revoke-token',
    },
    PRODUCTS: {
      BASE: '/api/v1/products',
      FEATURED: '/api/v1/products/featured',
      SEARCH: '/api/v1/products/search',
      BY_CATEGORY: '/api/v1/products/category',
      BY_SLUG: '/api/v1/products/slug',
      REVIEWS: '/api/v1/products/{id}/reviews',
    },
    CATEGORIES: '/api/v1/categories',
    PRODUCERS: '/api/v1/producers',
    CART: '/api/v1/cart',
    ORDERS: '/api/v1/orders',
    WISHLIST: '/api/v1/wishlist',
    USERS: '/api/v1/users',
    PAYMENTS: '/api/v1/payments',
    UPLOAD: '/api/v1/upload',
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

// Note: TokenManager has been moved to utils/tokenManager.ts
// Note: HTTP client functionality is in services/apiClient.ts
// Import from there to avoid duplication
