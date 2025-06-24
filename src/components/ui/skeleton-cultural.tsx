
import { cn } from '@/lib/utils';

interface CulturalSkeletonProps {
  variant?: 'product' | 'story' | 'text' | 'image' | 'button';
  className?: string;
  count?: number;
  lines?: number;
}

const CulturalSkeleton = ({ 
  variant = 'text', 
  className,
  count = 1,
  lines = 1,
  ...props 
}: CulturalSkeletonProps & React.HTMLAttributes<HTMLDivElement>) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'product':
        return 'h-64 w-full rounded-xl';
      case 'story':
        return 'h-48 w-full rounded-2xl';
      case 'text':
        return 'h-4 rounded-md';
      case 'image':
        return 'h-32 w-full rounded-lg';
      case 'button':
        return 'h-10 w-24 rounded-lg';
      default:
        return 'h-4 w-full rounded-md';
    }
  };

  // Patrón cultural inspirado en tejidos tradicionales
  const culturalPattern = 'bg-gradient-to-br from-primary-background via-secondary/5 to-action/5';
  const baseClasses = `animate-pulse ${culturalPattern}`;
  const variantClasses = getVariantClasses();

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              'h-4 rounded-md',
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  const skeletonClasses = cn(baseClasses, variantClasses, className);

  if (count === 1) {
    return <div className={skeletonClasses} {...props} />;
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={skeletonClasses} {...props} />
      ))}
    </div>
  );
};

export { CulturalSkeleton };
export default CulturalSkeleton;
