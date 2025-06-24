
import CulturalSkeleton from './ui/skeleton-cultural';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  variant?: 'spinner' | 'skeleton';
  skeletonType?: 'product' | 'story' | 'text';
  count?: number;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Cargando...', 
  className,
  variant = 'spinner',
  skeletonType = 'product',
  count = 1
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (variant === 'skeleton') {
    return (
      <div className={`${className || ''}`}>
        <CulturalSkeleton variant={skeletonType} count={count} />
        <div className="mt-4 text-center">
          <p className={`text-primary-secondary ${textSizeClasses[size]}`}>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background ${className || ''}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-action/20 border-t-action rounded-full animate-spin`}></div>
        <p className={`text-primary-secondary ${textSizeClasses[size]} font-medium`}>{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
