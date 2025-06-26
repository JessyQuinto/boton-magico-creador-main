import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';

const DevModeIndicator = () => {
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        setIsBackendAvailable(response.ok);
      } catch (error) {
        setIsBackendAvailable(false);
      }
    };

    checkBackend();
    // Recheck every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isBackendAvailable === null || isBackendAvailable === true || !isVisible) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800">
                Modo Desarrollo
              </h4>
              <p className="text-xs text-yellow-700 mt-1">
                Backend no disponible. Usando datos simulados para desarrollo.
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                URL: {API_CONFIG.BASE_URL}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-yellow-400 hover:text-yellow-600 text-lg leading-none"
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevModeIndicator;
