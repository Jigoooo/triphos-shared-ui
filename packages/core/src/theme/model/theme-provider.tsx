import '../../../public/css/index.css';
import '../../../public/css/code.css';
import '../../../public/css/loader.css';

import type { ReactNode } from 'react';

import { ThemeContext } from './theme-context.tsx';
import type { Theme, CustomThemeExtensions } from './theme-type.ts';
import { createTheme } from '../lib/create-theme.ts';

export function ThemeProvider<TCustomTheme extends CustomThemeExtensions = Record<string, never>>({
  theme,
  children,
}: {
  theme?: Theme<TCustomTheme>;
  children: ReactNode;
}) {
  const defaultTheme = createTheme<TCustomTheme>();

  return (
    <ThemeContext
      value={{
        theme: theme ?? defaultTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
}
