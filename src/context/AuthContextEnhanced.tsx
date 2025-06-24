import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar si hay usuario guardado en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockUser: User = {
        id: 1,
        name: email.split('@')[0],
        email,
        address: 'Dirección de ejemplo',
        phone: '+57 300 123 4567',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Éxito",
        description: "Inicio de sesión exitoso"
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Error",
      description: "Credenciales inválidas",
      variant: "destructive"
    });
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now(),
        name,
        email,
        address: '',
        phone: '',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Éxito",
        description: "Registro exitoso"
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Error",
      description: "Error en el registro",
      variant: "destructive"
    });
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Éxito",
      description: "Sesión cerrada"
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.email === 'admin@choco.com';

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
