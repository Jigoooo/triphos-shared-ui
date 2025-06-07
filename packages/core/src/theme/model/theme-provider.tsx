import type { ReactNode } from 'react';

import type { Theme } from './theme-type.ts';
import { ThemeContext } from './theme-context.tsx';
import { createTheme } from '@/theme/lib/create-theme.ts';

export function ThemeProvider({ theme, children }: { theme?: Theme; children: ReactNode }) {
  const defaultTheme = createTheme();

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
