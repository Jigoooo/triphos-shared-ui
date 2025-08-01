import type { Theme, ThemeInput, CustomColorValue } from '../model/theme-type';
import { themeBase } from '../config/theme-base.ts';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];

    if (sourceValue !== undefined) {
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        key in result &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], sourceValue);
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

// Default typography config
const defaultTypography = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
};

export function createTheme<
  TCustomColors extends Record<string, CustomColorValue> = Record<string, never>,
>(themeInput: ThemeInput<TCustomColors> = {} as ThemeInput<TCustomColors>): Theme<TCustomColors> {
  const { colors: inputColors, typography: inputTypography } = themeInput;

  const mergedColors = deepMerge(themeBase.colors, inputColors || {});

  const mergedTypography = deepMerge(
    themeBase.typography || defaultTypography,
    inputTypography || {},
  );

  return {
    colors: {
      ...mergedColors,
      primaryColor: mergedColors.primary?.['400'] || themeBase.colors.primary['400'],
      successColor: mergedColors.success?.['400'] || themeBase.colors.success['400'],
      warningColor: mergedColors.warning?.['400'] || themeBase.colors.warning['400'],
      errorColor: mergedColors.error?.['400'] || themeBase.colors.error['400'],
    },
    typography: mergedTypography,
  } as Theme<TCustomColors>;
}
