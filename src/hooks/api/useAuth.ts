
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import type { LoginRequestDto, RegisterRequestDto, UserDto } from '@/types/api';

const AUTH_QUERY_KEY = ['auth', 'user'];

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Query for current user
  const userQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authService.getCurrentUser,
    enabled: authService.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      
      toast({
        title: 'Bienvenido',
        description: `¡Hola ${data.user.firstName}! Has iniciado sesión correctamente.`,
      });
      
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: 'Error de autenticación',
        description: error.message || 'Credenciales incorrectas',
        variant: 'destructive',
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      
      toast({
        title: '¡Registro exitoso!',
        description: `Bienvenido ${data.user.firstName}. Tu cuenta ha sido creada.`,
      });
      
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: 'Error de registro',
        description: error.message || 'No se pudo crear la cuenta',
        variant: 'destructive',
      });
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
      toast({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido actualizada correctamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar',
        description: error.message || 'No se pudo actualizar el perfil',
        variant: 'destructive',
      });
    },
  });

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      queryClient.clear(); // Clear all cached data
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    // Data
    user: userQuery.data || null,
    isAuthenticated: authService.isAuthenticated(),
    
    // Loading states
    isLoading: userQuery.isLoading,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    logout,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    userError: userQuery.error,
  };
};
