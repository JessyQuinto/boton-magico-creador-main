
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getImageFallback(category?: string): string {
  const fallbacks = {
    'cesteria': '/placeholder.svg',
    'textiles': '/placeholder.svg',
    'ceramica': '/placeholder.svg',
    'joyeria': '/placeholder.svg',
    'default': '/placeholder.svg'
  };
  
  return fallbacks[category as keyof typeof fallbacks] || fallbacks.default;
}
