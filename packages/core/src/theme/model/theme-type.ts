type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorPalette = Record<ColorScale, string>;

type BaseColors = {
  primary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
};

type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export type TypographyType = {
  fontSize?: Record<FontSize, string>;
};

export type CustomThemeExtensions = {
  colors?: Record<string, string>;
  typography?: Record<string, string>;
};

export type ThemeBaseInput = {
  colors: BaseColors;
  typography: TypographyType;
};

export type ExtendedColor<TCustomTheme extends CustomThemeExtensions = Record<string, never>> =
  TCustomTheme extends { colors: Record<string, string> }
    ? TCustomTheme['colors']
    : Record<string, never>;

export type ExtendedTypography<TCustomTheme extends CustomThemeExtensions = Record<string, never>> =
  TCustomTheme extends { typography: Record<string, string> }
    ? TCustomTheme['typography']
    : Record<string, never>;

export type ThemeInput<TCustomTheme extends CustomThemeExtensions = Record<string, never>> = {
  colors?: Partial<BaseColors> & ExtendedColor<TCustomTheme>;
  typography?: Partial<TypographyType> & ExtendedTypography<TCustomTheme>;
};

export type Theme<TCustomTheme extends CustomThemeExtensions = Record<string, never>> = {
  colors: {
    primaryColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
    primary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
  } & ExtendedColor<TCustomTheme>;
  typography: TypographyType & ExtendedTypography<TCustomTheme>;
};

export type ThemeContextType<TCustomTheme extends CustomThemeExtensions = Record<string, never>> = {
  theme: Theme<TCustomTheme>;
};
