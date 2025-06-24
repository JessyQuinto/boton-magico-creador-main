import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "brown";
  showText?: boolean;
  className?: string;
}

const Logo = ({ 
  size = "md", 
  variant = "default", 
  showText = true, 
  className 
}: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  };

  const iconColorClass = {
    default: "text-amber-600",
    white: "text-white",
    brown: "text-amber-900"
  };

  const textColorClass = {
    default: "text-primary-text",
    white: "text-white",
    brown: "text-amber-900"
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Logo SVG */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-full h-full", iconColorClass[variant])}
        >
          {/* Fondo circular con gradiente café */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="url(#brownGradient)"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Hoja de cacao estilizada */}
          <path
            d="M20 28C20 22 24 18 32 18C40 18 44 22 44 28C44 34 40 38 32 45C24 38 20 34 20 28Z"
            fill="url(#leafGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Venas de la hoja */}
          <path
            d="M32 20V42M26 25L32 30M38 25L32 30M26 35L32 40M38 35L32 40"
            stroke="url(#veinGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Granos de cacao pequeños */}
          <circle cx="24" cy="50" r="2.5" fill="url(#beanGradient)" />
          <circle cx="32" cy="52" r="2.5" fill="url(#beanGradient)" />
          <circle cx="40" cy="50" r="2.5" fill="url(#beanGradient)" />
          
          {/* Gradientes */}
          <defs>
            <linearGradient id="brownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="50%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#D2691E" />
            </linearGradient>
            
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#228B22" />
              <stop offset="50%" stopColor="#32CD32" />
              <stop offset="100%" stopColor="#90EE90" />
            </linearGradient>
            
            <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006400" />
              <stop offset="100%" stopColor="#228B22" />
            </linearGradient>
            
            <linearGradient id="beanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="50%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#A0522D" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Brillo decorativo */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full blur-sm" />
      </div>

      {/* Texto del logo */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold leading-tight tracking-tight",
            textSizeClasses[size],
            textColorClass[variant]
          )}>
            Chocó Artesanal
          </h1>
          <p className={cn(
            "text-xs font-medium leading-none opacity-80",
            textColorClass[variant],
            size === "sm" ? "text-[10px]" : "text-xs"
          )}>
            Tesoros del Pacífico
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
