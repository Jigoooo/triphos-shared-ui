import { motion } from 'framer-motion';

import { colors } from '@/constants';
import type { ButtonProps } from '../model/button-type.ts';
import { ButtonStyle } from '../model/button-type.ts';
import {
  buttonDisabledStyle,
  buttonWithTypeStyles,
  defaultButtonStyle,
} from '@/ui/button/lib/button-styles.ts';
import { getAnimationBackgroundColor } from '@/ui/button/lib/get-animation-background-color.ts';
import { SolidButton } from '../variant/solid-button.tsx';
import { OutlinedButton } from '../variant/outlined-button.tsx';
import { useButtonInteraction } from '../model/use-button-interaction.ts';

export function BaseButton({
  buttonStyle = ButtonStyle.SOLID,
  children,
  style,
  onClick,
  ...props
}: ButtonProps) {
  const backgroundColor = style?.backgroundColor ?? colors.primary[400];
  const color = style?.color ?? colors.primary[400];
  const animationColor = buttonStyle === ButtonStyle.OUTLINED ? color : backgroundColor;
  const animationBackgroundColor = getAnimationBackgroundColor(buttonStyle, animationColor);

  const { buttonRef, handleMouseDown, handleMouseUp, handleMouseLeave } = useButtonInteraction({
    onClick,
    onMouseDown: props.onMouseDown,
    onMouseLeave: props.onMouseLeave,
    onMouseUp: props.onMouseUp,
  });

  return (
    <motion.button
      ref={buttonRef}
      className='selection-none'
      style={{
        ...defaultButtonStyle,
        ...buttonWithTypeStyles[buttonStyle],
        ...(props.disabled ? buttonDisabledStyle[buttonStyle] : {}),
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

export const Button = Object.assign(BaseButton, {
  Solid: SolidButton,
  Outlined: OutlinedButton,
});
