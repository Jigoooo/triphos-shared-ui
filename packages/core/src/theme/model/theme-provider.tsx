import '../../../public/css/index.css';
import '../../../public/css/code.css';
import '../../../public/css/font.css';
import '../../../public/css/loader.css';

import type { ReactNode } from 'react';

import { ThemeContext } from './theme-context.tsx';
import type { Theme } from './theme-type.ts';
import { createTheme } from '../lib/create-theme.ts';

export function ThemeProvider<
  TCustomColors extends Record<string, string> = Record<string, never>,
>({ theme, children }: { theme?: Theme<TCustomColors>; children: ReactNode }) {
  const defaultTheme = createTheme<TCustomColors>();

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
