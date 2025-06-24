
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-md choco-border border choco-card-bg hover:bg-choco-neutral-border dark:hover:bg-choco-dark-neutral-border transition-all duration-200 shadow-sm hover:shadow-md"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 choco-text-secondary transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-choco-dark-text-secondary transition-colors" />
      )}
    </Button>
  );
};
