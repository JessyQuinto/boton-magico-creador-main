import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import type { DotNetUserDto, LoginRequestDto, RegisterRequestDto } from '@/types/api';
import { TokenManager } from '@/utils/tokenManager';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, { createContext, useContext, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'campo-artesano-auth-user';
const USER_QUERY_KEY = ['auth', 'user'];

// Save user data to storage
const saveUserToStorage = (user: DotNetUserDto | null) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

// Load user data from storage
const loadUserFromStorage = (): DotNetUserDto | null => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedUser) return null;
    return JSON.parse(storedUser) as DotNetUserDto;
  } catch (error) {
    console.error("Error loading user from storage:", error);
    return null;
  }
};

export interface AuthContextType {
  user: DotNetUserDto | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequestDto) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterRequestDto) => Promise<boolean>;
  updateUser: (userData: Partial<DotNetUserDto>) => Promise<void>;
  isLoadingUser: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isUpdatingUser: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const TanstackQueryClient = useQueryClient(); // Get client from provider, or use the local one

  // Query for user data
  const { data: user, isLoading: isLoadingUser, isSuccess: isUserLoaded } = useQuery<DotNetUserDto | null, Error>({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      // Check if user is authenticated
      if (!TokenManager.isAuthenticated()) {
        return null;
      }
      // Fetch current user from backend
      try {
        return await authService.getCurrentUser();
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        TokenManager.clearTokens();
        return null;
      }
    },
    initialData: loadUserFromStorage(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: Infinity,
  });

  useEffect(() => {
    // If user data changes (e.g. after login/update), save it to localStorage.
    // This replaces the old useEffect that saved the entire auth state.
    saveUserToStorage(user || null);
  }, [user]);

  const isAuthenticated = !!user && isUserLoaded;

  // Mutation for login
  const loginMutation = useMutation<DotNetUserDto, Error, LoginRequestDto>({
    mutationFn: async (credentials) => {
      const response = await authService.login(credentials);
      return response.user;
    },
    onSuccess: (data) => {
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, data);
      TanstackQueryClient.invalidateQueries({ queryKey: ['cart'] });
      TanstackQueryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Sesión iniciada",
        description: `Bienvenido de nuevo, ${data.firstName}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation for registration
  // Mutation for registration
  const registerMutation = useMutation<DotNetUserDto, Error, RegisterRequestDto>({
    mutationFn: async (userData) => {
      const response = await authService.register(userData);
      return response.user;
    },
    onSuccess: (data) => {
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, data);
      TanstackQueryClient.invalidateQueries({ queryKey: ['cart'] });
      TanstackQueryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "¡Registro exitoso!",
        description: `Bienvenido a Campo Artesano, ${data.firstName}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation for updating user data
  const updateUserMutation = useMutation<DotNetUserDto, Error, Partial<DotNetUserDto>>({
    mutationFn: async (userData) => {
      if (!user) throw new Error("Usuario no autenticado.");
      return await authService.updateProfile(userData);
    },
    onSuccess: (data) => {
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, data);
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const login = async (credentials: LoginRequestDto): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync(credentials);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (userData: RegisterRequestDto): Promise<boolean> => {
    try {
      await registerMutation.mutateAsync(userData);
      return true;
    } catch {
      return false;
    }
  };

  const updateUser = async (userData: Partial<DotNetUserDto>): Promise<void> => {
    if (!isAuthenticated) {
      toast({ title: "Error", description: "Debes iniciar sesión para actualizar tu perfil.", variant: "destructive" });
      return;
    }
    await updateUserMutation.mutateAsync(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
      TanstackQueryClient.clear(); // Clear all cached data
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado tu sesión correctamente.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local data even if server logout fails
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, null);
      TokenManager.clearTokens();
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        login,
        logout,
        register,
        updateUser,
        isLoadingUser,
        isLoggingIn: loginMutation.isPending,
        isRegistering: registerMutation.isPending,
        isUpdatingUser: updateUserMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// It's crucial that the main application (e.g., App.tsx or main.tsx)
// wraps the AuthProvider (or the entire app) with QueryClientProvider.
// For example:
//
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// const queryClient = new QueryClient();
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
