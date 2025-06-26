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
      console.warn('Backend API not available, using mock login:', error);
      
      // Fallback: Mock login cuando el backend no esté disponible
      return this.mockLogin(credentials);
    }
  }

  private async mockLogin(credentials: LoginRequestDto): Promise<DotNetAuthResponseDto> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock credentials para testing
    const validCredentials = [
      { email: 'admin@test.com', password: 'admin123' },
      { email: 'user@test.com', password: 'user123' }
    ];
    
    const isValid = validCredentials.some(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );
    
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }
    
    // Mock user data
    const mockUser: DotNetUserDto = {
      id: 1,
      firstName: 'Usuario',
      lastName: 'Prueba',
      email: credentials.email,
      phone: '+57 300 123 4567',
      address: 'Dirección de prueba',
      avatar: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: credentials.email,
      emailConfirmed: true,
      phoneNumberConfirmed: true,
      twoFactorEnabled: false,
      lockoutEnd: undefined,
      lockoutEnabled: false,
      accessFailedCount: 0,
      roles: credentials.email.includes('admin') ? ['Admin', 'User'] : ['User'],
      claims: []
    };
    
    // Mock tokens
    const mockTokens = {
      accessToken: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
      refreshTokenExpiresIn: 7200
    };
    
    // Almacenar tokens mock
    TokenManager.setTokens(
      mockTokens.accessToken,
      mockTokens.refreshToken,
      mockTokens.expiresIn
    );
    
    console.log('Mock login successful for:', credentials.email);
    
    return {
      user: mockUser,
      ...mockTokens
    };
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
      console.warn('Backend API not available, using mock registration:', error);
      
      // Fallback: Mock registration cuando el backend no esté disponible
      return this.mockRegister(userData);
    }
  }

  private async mockRegister(userData: RegisterRequestDto): Promise<DotNetAuthResponseDto> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular validación de email duplicado
    const existingEmails = ['admin@test.com', 'test@example.com'];
    if (existingEmails.includes(userData.email)) {
      throw new Error('Este email ya está registrado');
    }
    
    // Mock user data
    const mockUser: DotNetUserDto = {
      id: Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      avatar: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: userData.email,
      emailConfirmed: true,
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: undefined,
      lockoutEnabled: false,
      accessFailedCount: 0,
      roles: ['User'],
      claims: []
    };
    
    // Mock tokens
    const mockTokens = {
      accessToken: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
      refreshTokenExpiresIn: 7200
    };
    
    // Almacenar tokens mock
    TokenManager.setTokens(
      mockTokens.accessToken,
      mockTokens.refreshToken,
      mockTokens.expiresIn
    );
    
    console.log('Mock registration successful for:', userData.email);
    
    return {
      user: mockUser,
      ...mockTokens
    };
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
