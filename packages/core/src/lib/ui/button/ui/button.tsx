import { motion } from 'framer-motion';
import type { CSSProperties, MouseEvent } from 'react';
import { useRef, useState } from 'react';
import { darken, lighten } from 'polished';

import { isLightColor } from '@/lib/lib';
import { colors } from '@/lib/constants';
import { useWindowsStyle } from '@/lib/hooks';
import type { ButtonProps } from '../model/button-type.ts';
import { ButtonStyle } from '../model/button-type.ts';

const defaultButtonStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingInline: '0.8rem',
  paddingBlock: '0.4rem',
  borderRadius: '0.4rem',
  cursor: 'pointer',
  fontSize: '0.84rem',
  fontWeight: 500,
  height: '2rem',
  lineHeight: 0,
  width: 'auto',
} as const;

const buttonStyles: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    backgroundColor: colors.primary[400],
    color: 'white',
    border: 'none',
  },
  [ButtonStyle.OUTLINED]: {
    backgroundColor: '#ffffff',
    color: colors.primary[400],
    border: `1px solid ${colors.primary[400]}`,
  },
} as const;

const buttonDisabledStyle: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    color: '#aaaaaa',
  },
  [ButtonStyle.OUTLINED]: {
    cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    borderColor: '#bebebe',
    color: '#bbbbbb',
  },
} as const;

const getAnimationBackgroundColor = (
  buttonStyle: ButtonStyle,
  animationColor: string,
): { hoverBackgroundColor: string; tapBackgroundColor: string } => {
  switch (buttonStyle) {
    case ButtonStyle.SOLID: {
      return {
        hoverBackgroundColor: darken(0.1, animationColor),
        tapBackgroundColor: darken(0.2, animationColor),
      };
    }
    case ButtonStyle.OUTLINED: {
      return {
        hoverBackgroundColor: isLightColor(animationColor)
          ? lighten(0.24, animationColor)
          : lighten(0.54, animationColor),
        tapBackgroundColor: isLightColor(animationColor)
          ? lighten(0.28, animationColor)
          : lighten(0.5, animationColor),
      };
    }
    default: {
      return {
        hoverBackgroundColor: darken(0.1, animationColor),
        tapBackgroundColor: darken(0.2, animationColor),
      };
    }
  }
};

function BaseButton({
  buttonStyle = ButtonStyle.SOLID,
  children,
  style,
  onClick,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const windowsStyle = useWindowsStyle();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isInside = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    }
    return false;
  };

  const backgroundColor = style?.backgroundColor ?? colors.primary[400];
  const color = style?.color ?? colors.primary[400];
  const animationColor = buttonStyle === ButtonStyle.OUTLINED ? color : backgroundColor;

  const animationBackgroundColor = getAnimationBackgroundColor(buttonStyle, animationColor);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);

    if (props.onMouseDown) {
      props.onMouseDown(e);
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);

    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    if (isPressed && isInside(e) && onClick) {
      onClick(e);
    }
    setIsPressed(false);

    if (props.onMouseUp) {
      props.onMouseUp(e);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className='selection-none'
      style={{
        ...defaultButtonStyle,
        ...buttonStyles[buttonStyle],
        ...(props.disabled ? buttonDisabledStyle[buttonStyle] : {}),
        ...windowsStyle,
        ...style,
      }}
      variants={{
        hover: { backgroundColor: animationBackgroundColor.hoverBackgroundColor, scale: 1.01 },
        tap: { backgroundColor: animationBackgroundColor.tapBackgroundColor, scale: 0.99 },
        none: {},
      }}
      whileHover={props.disabled ? 'none' : 'hover'}
      whileTap={props.disabled ? 'none' : 'tap'}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClickCapture={(event) => event.stopPropagation()}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function SolidButton(props: Omit<ButtonProps, 'buttonStyle'>) {
  return <BaseButton {...props} buttonStyle={ButtonStyle.SOLID} />;
}

function OutlinedButton(props: Omit<ButtonProps, 'buttonStyle'>) {
  return <BaseButton {...props} buttonStyle={ButtonStyle.OUTLINED} />;
}

export const Button = Object.assign(BaseButton, {
  Solid: SolidButton,
  Outlined: OutlinedButton,
});
