import { createContext, use } from 'react';
import type { ThemeContextType } from './theme-type.ts';

export const ThemeContext = createContext<ThemeContextType<any> | null>(null);

export function useThemeContext<TCustom extends Record<string, any> = Record<string, never>>() {
  const themeContext = use(ThemeContext) as ThemeContextType<TCustom> | null;

  if (!themeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return themeContext;
}
