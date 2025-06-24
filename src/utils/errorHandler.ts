
import { ApiError, NetworkError } from '@/services/apiClient';

export interface ErrorInfo {
  message: string;
  type: 'network' | 'auth' | 'validation' | 'server' | 'unknown';
  shouldRetry: boolean;
  statusCode?: number;
}

export class ErrorHandler {
  static handleError(error: any): ErrorInfo {
    console.error('Error caught by handler:', error);

    if (error instanceof NetworkError) {
      return {
        message: 'Problemas de conexión. Verifica tu internet.',
        type: 'network',
        shouldRetry: true,
      };
    }

    if (error instanceof ApiError) {
      const isAuthError = error.status === 401 || error.status === 403;
      const isValidationError = error.status === 400 || error.status === 422;
      const isServerError = error.status >= 500;

      return {
        message: error.message,
        type: isAuthError ? 'auth' : isValidationError ? 'validation' : isServerError ? 'server' : 'unknown',
        shouldRetry: isServerError,
        statusCode: error.status,
      };
    }

    // Handle standard fetch errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        message: 'Error de conexión. Intenta de nuevo.',
        type: 'network',
        shouldRetry: true,
      };
    }

    // Default case
    return {
      message: error.message || 'Ha ocurrido un error inesperado.',
      type: 'unknown',
      shouldRetry: false,
    };
  }

  static isAuthError(error: any): boolean {
    return error instanceof ApiError && (error.status === 401 || error.status === 403);
  }

  static isNetworkError(error: any): boolean {
    return error instanceof NetworkError || 
           (error.name === 'TypeError' && error.message.includes('fetch'));
  }

  static getRetryableErrors(): string[] {
    return ['network', 'server'];
  }

  static shouldShowRetryButton(error: any): boolean {
    const errorInfo = this.handleError(error);
    return errorInfo.shouldRetry;
  }
}
