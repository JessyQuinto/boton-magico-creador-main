
import { useNotifications } from '@/hooks/useNotifications';

export const useToast = () => {
  const { showSuccess, showError, showInfo } = useNotifications();

  return {
    success: showSuccess,
    error: showError,
    info: showInfo
  };
};
