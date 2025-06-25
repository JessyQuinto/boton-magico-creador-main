import { ApiError, NetworkError } from '@/services/apiClient';
import { DotNetProblemDetails } from '@/config/api';

export interface ErrorContext {
  operation?: string;
  userId?: string;
  timestamp: string;
  userAgent?: string;
}

export class EnhancedErrorHandler {
  /**
   * Processes API errors and returns user-friendly messages
   */
  static handle(error: unknown, context?: Partial<ErrorContext>): string {
    const errorContext: ErrorContext = {
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      ...context
    };

    // Log error for debugging
    this.logError(error, errorContext);

    if (error instanceof ApiError) {
      return this.handleApiError(error);
    }

    if (error instanceof NetworkError) {
      return 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
    }

    if (error instanceof Error) {
      return error.message || 'Ha ocurrido un error inesperado.';
    }

    return 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
  }

  /**
   * Handles specific API errors based on status codes
   */
  private static handleApiError(error: ApiError): string {
    switch (error.status) {
      case 400:
        if (error.problemDetails?.errors) {
          // Handle .NET validation errors
          const validationErrors = Object.entries(error.problemDetails.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ');
          return `Datos inválidos: ${validationErrors}`;
        }
        return error.message || 'Los datos enviados no son válidos.';

      case 401:
        return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';

      case 403:
        return 'No tienes permisos para realizar esta acción.';

      case 404:
        return 'El recurso solicitado no fue encontrado.';

      case 409:
        return 'Conflicto: El recurso ya existe o hay un conflicto con el estado actual.';

      case 422:
        return 'Los datos enviados contienen errores de validación.';

      case 429:
        return 'Demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.';

      case 500:
        return 'Error interno del servidor. Nuestro equipo ha sido notificado.';

      case 502:
      case 503:
      case 504:
        return 'El servicio no está disponible temporalmente. Por favor, intenta más tarde.';

      default:
        return error.message || `Error del servidor (${error.status}). Por favor, intenta nuevamente.`;
    }
  }

  /**
   * Logs errors for debugging and monitoring
   */
  static logError(error: unknown, context?: Partial<ErrorContext>): void {
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: error instanceof ApiError ? error.status : undefined,
      code: error instanceof ApiError ? error.code : undefined,
      field: error instanceof ApiError ? error.field : undefined,
      problemDetails: error instanceof ApiError ? error.problemDetails : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 API Error');
      console.error('Error:', error);
      console.table(errorDetails);
      console.groupEnd();
    } else {
      // In production, you might want to send this to a logging service
      console.error('API Error:', errorDetails);
    }
  }

  /**
   * Checks if an error is retryable
   */
  static isRetryable(error: unknown): boolean {
    if (error instanceof NetworkError) {
      return true;
    }

    if (error instanceof ApiError) {
      // Retry on server errors and rate limiting
      return [408, 429, 500, 502, 503, 504].includes(error.status);
    }

    return false;
  }

  /**
   * Extracts validation errors from .NET Problem Details
   */
  static extractValidationErrors(problemDetails: DotNetProblemDetails): Record<string, string[]> {
    return problemDetails.errors || {};
  }

  /**
   * Creates a user-friendly error message for forms
   */
  static getFormErrorMessage(error: unknown, field?: string): string {
    if (error instanceof ApiError && error.problemDetails?.errors) {
      const errors = this.extractValidationErrors(error.problemDetails);
      
      if (field && errors[field]) {
        return errors[field][0];
      }
      
      // Return first validation error if no specific field
      const firstError = Object.values(errors)[0];
      if (firstError && firstError.length > 0) {
        return firstError[0];
      }
    }

    return this.handle(error);
  }

  /**
   * Checks if error indicates authentication failure
   */
  static isAuthError(error: unknown): boolean {
    return error instanceof ApiError && error.status === 401;
  }

  /**
   * Checks if error indicates authorization failure
   */
  static isAuthorizationError(error: unknown): boolean {
    return error instanceof ApiError && error.status === 403;
  }

  /**
   * Checks if error indicates validation failure
   */
  static isValidationError(error: unknown): boolean {
    return error instanceof ApiError && (error.status === 400 || error.status === 422);
  }
}
