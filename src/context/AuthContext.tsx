import React, { createContext, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { User } from '@/types'; // Import User from centralized types

const AUTH_STORAGE_KEY = 'campo-artesano-auth-user';
const USER_QUERY_KEY = ['user'];

// Initialize QueryClient
const queryClient = new QueryClient();

// Save user data to storage
const saveUserToStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

// Load user data from storage
const loadUserFromStorage = (): User | null => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedUser) return null;
    return JSON.parse(storedUser) as User;
  } catch (error) {
    console.error("Error loading user from storage:", error);
    return null;
  }
};

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string, password: string }) => Promise<boolean>;
  logout: () => void;
  register: (userData: { name: string, email: string, password: string }) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<void>;
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
  const { data: user, isLoading: isLoadingUser, isSuccess: isUserLoaded } = useQuery<User | null, Error>({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      // This function could be used to fetch user data from an API if the user is already authenticated (e.g., via a token)
      // For now, it primarily relies on initialData and mutations to update the cache.
      const loadedUser = loadUserFromStorage();
      if (!loadedUser) {
        // To ensure consistency, if nothing is in storage, queryFn should return null or throw,
        // so react-query doesn't try to fetch indefinitely if there's no actual API call here.
        return null; 
      }
      return loadedUser;
    },
    initialData: loadUserFromStorage(), // Load initial user from localStorage
    staleTime: Infinity, // Data is considered fresh indefinitely, refetch on mutation/invalidation
    gcTime: Infinity, // Cache data indefinitely
  });

  useEffect(() => {
    // If user data changes (e.g. after login/update), save it to localStorage.
    // This replaces the old useEffect that saved the entire auth state.
    saveUserToStorage(user || null);
  }, [user]);

  const isAuthenticated = !!user && isUserLoaded;

  // Mutation for login
  const loginMutation = useMutation<User, Error, { email: string, password: string }>({
    mutationFn: async ({ email, password }) => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Mock API call
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: 1,
          name: email.split('@')[0],
          email: email,
        };
        return mockUser;
      }
      throw new Error("Credenciales incorrectas. Inténtalo de nuevo.");
    },
    onSuccess: (data) => {
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, data);
      toast({
        title: "Sesión iniciada",
        description: `Bienvenido de nuevo, ${data.name}`,
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
  const registerMutation = useMutation<User, Error, { name: string, email: string, password: string }>({
    mutationFn: async ({ name, email, password }) => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Mock API call
      if (name && email && password.length >= 6) {
        const mockUser: User = {
          id: Date.now(),
          name: name,
          email: email,
        };
        return mockUser;
      }
      throw new Error("Por favor completa todos los campos correctamente.");
    },
    onSuccess: (data) => {
      TanstackQueryClient.setQueryData(USER_QUERY_KEY, data);
      toast({
        title: "¡Registro exitoso!",
        description: `Bienvenido a Campo Artesano, ${data.name}`,
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
  const updateUserMutation = useMutation<User, Error, Partial<User>>({
    mutationFn: async (userData) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock API call
      if (!user) throw new Error("Usuario no autenticado.");
      
      const updatedUser = { ...user, ...userData };
      return updatedUser;
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

  const login = async (credentials: { email: string, password: string }): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync(credentials);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (userData: { name: string, email: string, password: string }): Promise<boolean> => {
    try {
      await registerMutation.mutateAsync(userData);
      return true;
    } catch {
      return false;
    }
  };
  
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!isAuthenticated) {
        toast({ title: "Error", description: "Debes iniciar sesión para actualizar tu perfil.", variant: "destructive"});
        return;
    }
    await updateUserMutation.mutateAsync(userData);
  };

  const logout = () => {
    TanstackQueryClient.setQueryData(USER_QUERY_KEY, null); // Clear user data from cache
    // TanstackQueryClient.removeQueries({ queryKey: USER_QUERY_KEY }); // Alternative way to remove
    localStorage.removeItem(AUTH_STORAGE_KEY); // Clear from localStorage
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado tu sesión correctamente.",
    });
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
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </QueryClientProvider>
//   </React.StrictMode>,
// )
//
// This AuthProvider component itself does not need to be wrapped by QueryClientProvider
// if it's intended to be used as shown above. The useQueryClient hook will then
// correctly pick up the client provided at a higher level in the component tree.
// The local 'queryClient' instance at the top of this file is okay for standalone testing or if this
// provider were the top-level provider itself, but best practice is to have one QueryClientProvider at the root.

// To use this AuthProvider with its own QueryClient (e.g. for isolated module testing or if it's the app root):
export const AuthProviderWithClient: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);
