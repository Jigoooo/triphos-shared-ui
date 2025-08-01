import { useThemeContext as useBaseThemeContext } from '../model/theme-context';

/**
 * Creates a typed useTheme hook with custom colors
 * @example
 * // In your app's theme config file
 * type MyCustomColors = { point1: string; point2: string; };
 * export const useTheme = createUseTheme<MyCustomColors>();
 *
 * // In components
 * const { theme } = useTheme(); // Fully typed with custom colors
 */
export function createUseTheme<
  TCustomColors extends Record<string, string> = Record<string, never>,
>() {
  return function useTheme() {
    return useBaseThemeContext<TCustomColors>();
  };
}
