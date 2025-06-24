
import React from 'react';
import { cn } from '@/lib/utils';

interface ContenedorProps {
  children: React.ReactNode;
  className?: string;
}

const Contenedor: React.FC<ContenedorProps> = ({ children, className }) => {
  return (
    <div className={cn("max-w-[960px] mx-auto px-5", className)}>
      {children}
    </div>
  );
};

// Exportamos ambos nombres para mantener compatibilidad
export default Contenedor;
export { Contenedor as Container };
