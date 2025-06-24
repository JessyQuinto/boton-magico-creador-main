
import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-background border border-secondary/20 rounded-xl p-8 shadow-lg">
              <AlertTriangle className="h-16 w-16 text-action mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-primary mb-4">
                ¡Oops! Algo salió mal
              </h1>
              <p className="text-secondary mb-6 leading-relaxed">
                Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ya fue notificado. 
                Puedes intentar recargar la página o volver al inicio.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={this.handleReload}
                  className="w-full bg-action hover:bg-action/90 text-white flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Recargar Página</span>
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full border-action text-action hover:bg-action hover:text-white flex items-center justify-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Ir al Inicio</span>
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-secondary hover:text-primary">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <pre className="mt-2 text-xs bg-red-50 border border-red-200 rounded p-2 overflow-auto text-red-800">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
