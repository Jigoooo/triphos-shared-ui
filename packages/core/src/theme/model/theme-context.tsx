import { createContext, use } from 'react';

import type { ThemeContextType, CustomThemeExtensions } from './theme-type.ts';

export const ThemeContext = createContext<ThemeContextType<any> | null>(null);

export function useThemeContext<
  TCustomTheme extends CustomThemeExtensions = Record<string, never>,
>() {
  const themeContext = use(ThemeContext) as ThemeContextType<TCustomTheme> | null;

  if (!themeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return themeContext;
}
