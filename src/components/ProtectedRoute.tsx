
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/useStore';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Verificando acceso..." />;
  }

  if (requireAuth && !isLoggedIn) {
    // Redirect to login with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requireAuth && isLoggedIn && location.pathname === '/login') {
    // Redirect logged in users away from login page
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
