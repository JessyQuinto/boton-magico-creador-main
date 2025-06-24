
import { cn } from '@/lib/utils';

interface SkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'image' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
  lines?: number;
}

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  className,
  count = 1,
  lines = 1,
  ...props 
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-48 w-full rounded-xl';
      case 'text':
        return 'h-4 rounded';
      case 'avatar':
      case 'circular':
        return 'h-12 w-12 rounded-full';
      case 'button':
        return 'h-10 w-24 rounded-md';
      case 'image':
        return 'h-32 w-full rounded-lg';
      case 'rectangular':
        return 'rounded-md';
      default:
        return 'h-4 w-full rounded';
    }
  };

  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200';
  const variantClasses = getVariantClasses();

  // Handle multiple lines for text variant
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              'h-4 rounded',
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{ width: i === lines - 1 ? '75%' : width, height }}
          />
        ))}
      </div>
    );
  }

  const skeletonClasses = cn(baseClasses, variantClasses, className);
  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (count === 1) {
    return <div className={skeletonClasses} style={style} {...props} />;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={skeletonClasses} style={style} {...props} />
      ))}
    </div>
  );
};

export { Skeleton };
export default Skeleton;
