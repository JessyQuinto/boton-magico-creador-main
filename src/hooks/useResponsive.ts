import { useState, useEffect } from 'react';

interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = (breakpoints: Partial<BreakpointConfig> = {}) => {
  const config = { ...defaultBreakpoints, ...breakpoints };
  
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const currentBreakpoint = (() => {
    if (windowSize.width < config.sm) return 'xs';
    if (windowSize.width < config.md) return 'sm';
    if (windowSize.width < config.lg) return 'md';
    if (windowSize.width < config.xl) return 'lg';
    if (windowSize.width < config['2xl']) return 'xl';
    return '2xl';
  })();

  return {
    windowSize,
    isMobile: windowSize.width < config.md,
    isTablet: windowSize.width >= config.md && windowSize.width < config.lg,
    isDesktop: windowSize.width >= config.lg,
    currentBreakpoint,
    isAbove: (breakpoint: keyof BreakpointConfig) => windowSize.width >= config[breakpoint],
    isBelow: (breakpoint: keyof BreakpointConfig) => windowSize.width < config[breakpoint],
  };
};
