// Configuración específica para integración con .NET 9 Backend

export const DOTNET_CONFIG = {
  // Configuración de autenticación JWT
  JWT: {
    HEADER_NAME: 'Authorization',
    TOKEN_PREFIX: 'Bearer ',
    REFRESH_BUFFER_TIME: 300000, // 5 minutos antes de expirar
  },

  // Configuración de cookies (si usas cookies además de JWT)
  COOKIES: {
    SAME_SITE: 'lax' as const,
    SECURE: import.meta.env.PROD,
    HTTP_ONLY: false, // Para acceso desde JS si es necesario
  },

  // Headers específicos para .NET 9
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
    API_VERSION: '1.0',
    REQUEST_ID: () => crypto.randomUUID?.() || Date.now().toString(),
  },

  // Configuración de validación
  VALIDATION: {
    // .NET 9 devuelve errores de validación en este formato
    ERROR_FIELD_PATH: 'errors',
    PROBLEM_DETAILS_TYPE: 'https://tools.ietf.org/html/rfc7807',
  },

  // Timeouts específicos para .NET APIs
  TIMEOUTS: {
    AUTH: 15000,
    DATA_FETCH: 30000,
    FILE_UPLOAD: 120000,
    PAYMENT: 45000,
  },

  // Configuración de retry específica
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    EXPONENTIAL_BACKOFF: true,
    RETRIABLE_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },

  // Feature flags para compatibilidad
  FEATURES: {
    USE_PROBLEM_DETAILS: true,
    USE_API_VERSIONING: true,
    USE_CORRELATION_ID: true,
    USE_STRUCTURED_LOGGING: true,
  },
};

// Helper para generar headers con configuración .NET
export const createDotNetHeaders = (additionalHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = {
    [DOTNET_CONFIG.HEADERS.CONTENT_TYPE]: DOTNET_CONFIG.HEADERS.CONTENT_TYPE,
    'Accept': DOTNET_CONFIG.HEADERS.ACCEPT,
    'X-API-Version': DOTNET_CONFIG.HEADERS.API_VERSION,
    ...additionalHeaders,
  };

  if (DOTNET_CONFIG.FEATURES.USE_CORRELATION_ID) {
    headers['X-Correlation-ID'] = DOTNET_CONFIG.HEADERS.REQUEST_ID();
  }

  return headers;
};

// Helper para manejar respuestas de error de .NET
export const handleDotNetError = (error: any) => {
  // .NET 9 usa ProblemDetails para errores estructurados
  if (error.type === DOTNET_CONFIG.VALIDATION.PROBLEM_DETAILS_TYPE) {
    return {
      title: error.title,
      status: error.status,
      detail: error.detail,
      errors: error.errors || {},
      traceId: error.traceId,
    };
  }

  return error;
};
