type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorPalette = Record<ColorScale, string>;

// Base colors that are always required
type BaseColors = {
  primary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
};

// Allow custom colors to be added
export type ThemeBaseInput<TCustomColors = Record<string, never>> = {
  colors: BaseColors & TCustomColors;
};

export type ThemeInput<TCustomColors = Record<string, never>> = {
  colors?: Partial<BaseColors> & TCustomColors;
};

// Theme with custom colors
export type Theme<TCustomColors = Record<string, never>> = {
  colors: {
    primaryColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
    primary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
  } & TCustomColors;
};

export type ThemeContextType<TCustomColors = Record<string, never>> = {
  theme: Theme<TCustomColors>;
};
