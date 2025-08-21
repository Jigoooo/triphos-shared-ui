import type { CSSProperties } from 'react';

export const defaultRadioSize = 1.4;
export const defaultLabelColor = '#333333';
export const defaultBorderColor = '#cccccc';
export const defaultDisabledColor = '#cccccc';

export const getRadioLabelStyle = ({
  style,
  disabledValue,
  cursor,
}: {
  style?: CSSProperties;
  disabledValue: boolean;
  cursor: string;
}): CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: disabledValue ? 'default' : cursor,
    ...style,
  };
};

export const getRadioInputStyle = (): CSSProperties => {
  return {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  };
};

export const getRadioIconStyle = ({
  size,
  iconStyle,
}: {
  size: number;
  iconStyle?: CSSProperties;
}): CSSProperties => {
  return {
    width: `${size}rem`,
    height: `${size}rem`,
    borderRadius: '50%',
    border: '2px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...iconStyle,
  };
};

export const getRadioDotStyle = ({
  indicatorSize,
  disabledValue,
  effectiveColor,
  disabledColor = defaultDisabledColor,
  dotStyle,
}: {
  indicatorSize: number;
  disabledValue: boolean;
  effectiveColor: string;
  disabledColor?: string;
  dotStyle?: CSSProperties;
}): CSSProperties => {
  return {
    width: `${indicatorSize}rem`,
    height: `${indicatorSize}rem`,
    borderRadius: '50%',
    backgroundColor: disabledValue ? disabledColor : effectiveColor,
    ...dotStyle,
  };
};

export const getRadioBorderColor = ({
  disabledValue,
  isSelected,
  primaryColor,
  borderColor = defaultBorderColor,
  disabledColor = defaultDisabledColor,
}: {
  disabledValue: boolean;
  isSelected: boolean;
  primaryColor: string;
  borderColor?: string;
  disabledColor?: string;
}): string => {
  if (disabledValue) {
    return disabledColor;
  }
  if (isSelected) {
    return primaryColor;
  }
  return borderColor;
};

export const getRadioLabelTextStyle = ({
  disabledValue,
  labelColor = defaultLabelColor,
  disabledColor = defaultDisabledColor,
}: {
  disabledValue: boolean;
  labelColor?: string;
  disabledColor?: string;
}): CSSProperties => {
  return {
    fontSize: '0.9rem',
    color: disabledValue ? disabledColor : labelColor,
  };
};
