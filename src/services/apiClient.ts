import { API_CONFIG, HTTP_STATUS } from '@/config/api';
import { TokenManager } from '@/utils/tokenManager';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Array<{
    field?: string;
    code: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface DotNetProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public field?: string,
    public problemDetails?: DotNetProblemDetails
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          refreshToken: refreshToken,
          // .NET 9 puede requerir estos campos adicionales
          tokenType: 'Bearer'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // .NET 9 típicamente devuelve estos campos
        TokenManager.setTokens(
          data.accessToken || data.access_token, 
          data.refreshToken || data.refresh_token, 
          data.expiresIn || data.expires_in
        );
        return true;
      } else {
        // Manejo específico de errores .NET
        const errorData = await response.json().catch(() => null);
        console.error('.NET refresh token error:', errorData);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    TokenManager.clearTokens();
    return false;
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<T> {
    try {
      const accessToken = TokenManager.getAccessToken();
      
      if (accessToken && TokenManager.isTokenExpired()) {
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          throw new ApiError('Authentication expired', HTTP_STATUS.UNAUTHORIZED);
        }
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (TokenManager.getAccessToken()) {
        headers['Authorization'] = `Bearer ${TokenManager.getAccessToken()}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === HTTP_STATUS.UNAUTHORIZED) {
          if (attempt === 1 && await this.refreshToken()) {
            return this.makeRequest<T>(url, options, attempt + 1);
          }
          TokenManager.clearTokens();
        }

        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.code,
          errorData.field
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json();
      }

      return response.text() as unknown as T;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }

      if (error instanceof ApiError) {
        throw error;
      }

      if (attempt < this.retryAttempts && error.name === 'TypeError') {
        console.warn(`Request failed, retrying... (${attempt}/${this.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return this.makeRequest<T>(url, options, attempt + 1);
      }

      throw new NetworkError(error.message);
    }
  }

  async get<T>(url: string, params?: Record<string, any>, options?: RequestInit): Promise<T> {
    const queryString = params ? this.buildQueryString(params) : '';
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return this.makeRequest<T>(fullUrl, { method: 'GET', ...options });
  }

  async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async put<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async patch<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE', ...options });
  }

  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    return searchParams.toString();
  }
}

export const apiClient = new ApiClient();
