import { useState, useCallback } from 'react';
import { ApiError, NetworkError } from '@/services/apiClient';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ErrorHandlerOptions {
  showErrorToast?: boolean;
  logError?: boolean;
  fallbackData?: any;
}

export function useApiCall<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const handleError = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const { logError = true, fallbackData = null } = options;
    
    let errorMessage = 'Ha ocurrido un error inesperado';

    if (error instanceof ApiError) {
      switch (error.status) {
        case 400:
          errorMessage = error.message || 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente';
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 409:
          errorMessage = 'Conflicto con el estado actual del recurso';
          break;
        case 422:
          errorMessage = 'Datos de entrada inválidos';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intenta nuevamente más tarde';
          break;
        default:
          errorMessage = error.message || `Error del servidor (${error.status})`;
      }
    } else if (error instanceof NetworkError) {
      errorMessage = 'Error de conexión. Verifica tu conexión a internet';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (logError) {
      console.error('API call error:', {
        error,
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    }

    setState(prev => ({
      ...prev,
      loading: false,
      error: errorMessage,
      data: fallbackData
    }));

    return errorMessage;
  }, []);

  const execute = useCallback(async (
    apiCall: () => Promise<T>,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }, [handleError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
    handleError
  };
}

// Hook especializado para operaciones CRUD
export function useCrudApi<T, CreateData = Partial<T>, UpdateData = Partial<T>>() {
  const list = useApiCall<T[]>();
  const single = useApiCall<T>();
  const create = useApiCall<T>();
  const update = useApiCall<T>();
  const remove = useApiCall<void>();

  return {
    list,
    single,
    create,
    update,
    remove,
    // Método de conveniencia para resetear todos los estados
    resetAll: () => {
      list.reset();
      single.reset();
      create.reset();
      update.reset();
      remove.reset();
    }
  };
}

// Hook para paginación
export function usePaginatedApi<T>() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const api = useApiCall<{
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  }>();

  const fetchPage = useCallback(async (
    apiCall: (page: number, size: number) => Promise<any>,
    page?: number,
    size?: number
  ) => {
    const targetPage = page ?? currentPage;
    const targetSize = size ?? pageSize;
    
    const result = await api.execute(async () => {
      return await apiCall(targetPage, targetSize);
    });

    if (result) {
      setCurrentPage(result.pagination.currentPage);
      setTotalItems(result.pagination.totalItems);
      setTotalPages(result.pagination.totalPages);
      setPageSize(result.pagination.itemsPerPage);
    }

    return result;
  }, [api, currentPage, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  return {
    ...api,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    fetchPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}
