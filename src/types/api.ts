// Re-export from backend types for compatibility
export * from './api-backend';

// Legacy types maintained for compatibility
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
