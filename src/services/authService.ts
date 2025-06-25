import { apiClient } from './apiClient';
import { TokenManager } from '@/utils/tokenManager';
import { API_CONFIG } from '@/config/api';
import type { 
  LoginRequestDto, 
  RegisterRequestDto, 
  DotNetAuthResponseDto, 
  DotNetUserDto 
} from '@/types/api';

class AuthService {
  async login(credentials: LoginRequestDto): Promise<DotNetAuthResponseDto> {
    console.log('Attempting login for:', credentials.email);
    
    try {
      const response = await apiClient.post<DotNetAuthResponseDto>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      if (response.accessToken) {
        TokenManager.setTokens(
          response.accessToken,
          response.refreshToken,
          response.expiresIn
        );
        console.log('Login successful, tokens stored');
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
    }
  }

  async register(userData: RegisterRequestDto): Promise<DotNetAuthResponseDto> {
    console.log('Attempting registration for:', userData.email);
    
    try {
      const response = await apiClient.post<DotNetAuthResponseDto>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      if (response.accessToken) {
        TokenManager.setTokens(
          response.accessToken,
          response.refreshToken,
          response.expiresIn
        );
        console.log('Registration successful, tokens stored');
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Error en el registro. Por favor, verifica los datos e intenta nuevamente.');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      TokenManager.clearTokens();
      console.log('User logged out, tokens cleared');
    }
  }

  async getCurrentUser(): Promise<DotNetUserDto> {
    console.log('Fetching current user profile');
    try {
      return await apiClient.get<DotNetUserDto>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw new Error('No se pudo cargar el perfil del usuario.');
    }
  }

  async updateProfile(userData: Partial<DotNetUserDto>): Promise<DotNetUserDto> {
    console.log('Updating user profile');
    try {
      return await apiClient.put<DotNetUserDto>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, userData);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new Error('No se pudo actualizar el perfil.');
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<DotNetAuthResponseDto>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      if (response.accessToken) {
        TokenManager.setTokens(
          response.accessToken,
          response.refreshToken,
          response.expiresIn
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      TokenManager.clearTokens();
      return false;
    }
  }

  isAuthenticated(): boolean {
    return TokenManager.isAuthenticated();
  }

  getToken(): string | null {
    return TokenManager.getAccessToken();
  }
}

export const authService = new AuthService();
