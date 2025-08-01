import type { Theme, ThemeInput } from '../model/theme-type';
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

export function createTheme<TCustom extends Record<string, any> = Record<string, never>>(
  themeInput: ThemeInput<TCustom> = {} as ThemeInput<TCustom>,
): Theme<TCustom> {
  const { colors: inputColors, typography: inputTypography, ...otherInputs } = themeInput;

  // Merge colors
  const mergedColors = deepMerge(themeBase.colors, inputColors || {});

  // Merge typography
  const mergedTypography = deepMerge(themeBase.typography, inputTypography || {});

  // Extract custom properties that should go in the root level
  const customRootProps = Object.entries(otherInputs).reduce(
    (acc, [key, value]) => {
      if (key !== 'colors' && key !== 'typography') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  return {
    ...customRootProps,
    colors: {
      ...mergedColors,
      primaryColor: mergedColors.primary?.['400'] || themeBase.colors.primary['400'],
      successColor: mergedColors.success?.['400'] || themeBase.colors.success['400'],
      warningColor: mergedColors.warning?.['400'] || themeBase.colors.warning['400'],
      errorColor: mergedColors.error?.['400'] || themeBase.colors.error['400'],
    },
    typography: mergedTypography,
  } as Theme<TCustom>;
}
