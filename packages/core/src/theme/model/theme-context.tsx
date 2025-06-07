import { createContext, use } from 'react';
import type { ThemeContextType } from './theme-type.ts';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useThemeContext() {
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return themeContext;
}
