type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorPalette = Record<ColorScale, string>;

// Base colors that are always required
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

export type ThemeBaseInput = {
  colors: BaseColors;
  typography: TypographyType;
};

export type ThemeInput<TCustom extends Record<string, any> = Record<string, never>> = {
  colors?: Partial<BaseColors> & Omit<TCustom, 'typography'>;
  typography?: Partial<TypographyType>;
} & Omit<TCustom, 'colors' | 'typography'>;

// Theme with custom colors and typography
export type Theme<TCustom extends Record<string, any> = Record<string, never>> = {
  colors: {
    primaryColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
    primary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
  } & Omit<TCustom, 'typography'>;
  typography: TypographyType;
} & Omit<TCustom, 'colors' | 'typography'>;

export type ThemeContextType<TCustom extends Record<string, any> = Record<string, never>> = {
  theme: Theme<TCustom>;
};
