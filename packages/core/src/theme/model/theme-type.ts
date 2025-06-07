type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorPalette = Record<ColorScale, string>;

export type ThemeBaseInput = {
  colors: {
    primary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
  };
};

export type ThemeInput = {
  colors?: {
    primary?: ColorPalette;
    success?: ColorPalette;
    warning?: ColorPalette;
    error?: ColorPalette;
  };
};

export type Theme = {
  colors: {
    primaryColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
    primary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
  };
};

export type ThemeContextType = {
  theme: Theme;
};
