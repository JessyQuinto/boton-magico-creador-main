
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  width?: number;
  height?: number;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

const ResponsiveImage = ({ 
  src, 
  alt, 
  className, 
  placeholder,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width,
  height,
  aspectRatio = "landscape",
  ...props 
}: ResponsiveImageProps & React.HTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === "eager");
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === "eager") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video", 
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]"
  };

  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmMmYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM4ODZmNjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4=";

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const shouldShowImage = isInView && !hasError;
  const imageSrc = shouldShowImage ? src : (placeholder || defaultPlaceholder);

  return (
    <div className={cn(
      "relative overflow-hidden bg-primary-background",
      aspectRatioClasses[aspectRatio],
      className
    )}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500 ease-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
        {...props}
      />
      
      {!isLoaded && shouldShowImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-background via-secondary/10 to-primary-background animate-pulse" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-background text-secondary">
          <span className="text-sm font-medium">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
