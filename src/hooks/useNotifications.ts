
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: 'default',
    });
  };

  const showError = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: 'destructive',
    });
  };

  const showWarning = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      // Note: You might want to add a warning variant to your toast component
    });
  };

  const showInfo = (message: string, description?: string) => {
    toast({
      title: message,
      description,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
