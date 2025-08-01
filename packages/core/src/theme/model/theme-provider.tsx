import '../../../public/css/index.css';
import '../../../public/css/code.css';
import '../../../public/css/font.css';
import '../../../public/css/loader.css';

import type { ReactNode } from 'react';

import type { Theme, CustomColorValue } from './theme-type.ts';
import { ThemeContext } from './theme-context.tsx';
import { createTheme } from '../lib/create-theme.ts';

export function ThemeProvider<
  TCustomColors extends Record<string, CustomColorValue> = Record<string, never>,
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
