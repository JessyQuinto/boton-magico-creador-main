
import { apiClient } from './apiClient';
import { TokenManager } from '@/utils/tokenManager';
import { API_CONFIG } from '@/config/api';
import { createDotNetHeaders } from '@/config/dotnet';
import type { 
  LoginRequestDto, 
  RegisterRequestDto, 
  DotNetAuthResponseDto, 
  DotNetUserDto 
} from '@/types/api';

class AuthService {
  async login(credentials: LoginRequestDto): Promise<DotNetAuthResponseDto> {
    console.log('Attempting login for:', credentials.email);
    
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
  }

  async register(userData: RegisterRequestDto): Promise<DotNetAuthResponseDto> {
    console.log('Attempting registration for:', userData.email);
    
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
    return apiClient.get<DotNetUserDto>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  }

  async updateProfile(userData: Partial<DotNetUserDto>): Promise<DotNetUserDto> {
    console.log('Updating user profile');
    return apiClient.put<DotNetUserDto>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, userData);
  }

  isAuthenticated(): boolean {
    return TokenManager.isAuthenticated();
  }

  getToken(): string | null {
    return TokenManager.getAccessToken();
  }
}

export const authService = new AuthService();
