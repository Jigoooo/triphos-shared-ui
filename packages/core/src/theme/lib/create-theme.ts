import { themeBase } from '../config/theme-base.ts';
import type { Theme, ThemeInput, CustomThemeExtensions } from '../model/theme-type';

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

export function createTheme<TCustomTheme extends CustomThemeExtensions = Record<string, never>>(
  themeInput: ThemeInput<TCustomTheme> = {} as ThemeInput<TCustomTheme>,
): Theme<TCustomTheme> {
  const { colors: inputColors, typography: inputTypography } = themeInput;

  const mergedColors = deepMerge(themeBase.colors, inputColors || {});

  const mergedTypography = deepMerge(themeBase.typography, inputTypography || {});

  return {
    colors: {
      ...mergedColors,
      primaryColor: mergedColors.primary?.['400'] || themeBase.colors.primary['400'],
      successColor: mergedColors.success?.['400'] || themeBase.colors.success['400'],
      warningColor: mergedColors.warning?.['400'] || themeBase.colors.warning['400'],
      errorColor: mergedColors.error?.['400'] || themeBase.colors.error['400'],
    },
    typography: mergedTypography,
  } as Theme<TCustomTheme>;
}
