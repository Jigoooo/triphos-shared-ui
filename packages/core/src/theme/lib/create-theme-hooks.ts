import { useThemeContext as useBaseThemeContext } from '../model/theme-context';
import type { CustomThemeExtensions } from '../model/theme-type.ts';

/**
 * Creates a typed useTheme hook with custom colors and typography
 * @example
 * // In your app's theme config file
 * type MyCustomTheme = {
 *   colors: { point1: string; point2: string; };
 *   typography: { fontWeight: { bold: number; } };
 * };
 * export const useTheme = createUseTheme<MyCustomTheme>();
 *
 * // In components
 * const { theme } = useTheme(); // Fully typed with custom colors and typography
 */
export function createUseTheme<
  TCustomTheme extends CustomThemeExtensions = Record<string, never>,
>() {
  return function useTheme() {
    return useBaseThemeContext<TCustomTheme>();
  };
}
