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

export function createTheme<TCustomColors = Record<string, never>>(
  themeInput: ThemeInput<TCustomColors> = {} as ThemeInput<TCustomColors>,
): Theme<TCustomColors> {
  const mergedTheme = deepMerge(themeBase, themeInput);

  return {
    ...mergedTheme,
    colors: {
      ...mergedTheme.colors,
      primaryColor: mergedTheme.colors.primary['400'],
      successColor: mergedTheme.colors.success['400'],
      warningColor: mergedTheme.colors.warning['400'],
      errorColor: mergedTheme.colors.error['400'],
    },
  } as Theme<TCustomColors>;
}
