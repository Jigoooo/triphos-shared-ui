import { motion } from 'framer-motion';

import {
  buttonDisabledStyle,
  getButtonWithTypeStyles,
  defaultButtonStyle,
  getButtonAnimationBackgroundColor,
  getDefaultButtonVariants,
  getDefaultButtonTransition,
} from '../config/button-styles.ts';
import { type ButtonProps, ButtonStyle } from '../model/button-type.ts';
import { useButtonInteraction } from '../model/use-button-interaction.ts';
import { OutlinedButton } from '../variant/outlined-button.tsx';
import { SolidButton } from '../variant/solid-button.tsx';
import { useThemeContext } from '@/theme';

export function BaseButton({
  buttonStyle,
  customVariants,
  customTransition,
  animationColor,
  children,
  style,
  disabledStyle,
  onClick,
  ...props
}: ButtonProps) {
  const { theme } = useThemeContext();

  const applyButtonType = buttonStyle ?? theme.components.button.type;

  const backgroundColor = style?.backgroundColor ?? theme.colors.primaryColor;
  const color = style?.color ?? theme.colors.primaryColor;
  const defaultAnimationColor = applyButtonType === ButtonStyle.OUTLINED ? color : backgroundColor;
  const animationBackgroundColor = getButtonAnimationBackgroundColor(
    applyButtonType,
    animationColor ?? defaultAnimationColor,
  );

  const defaultButtonVariants = getDefaultButtonVariants(
    animationBackgroundColor.hoverBackgroundColor,
    animationBackgroundColor.tapBackgroundColor,
  );

  const defaultButtonTransition = getDefaultButtonTransition();

  const { buttonRef, handleDoubleClick, handleMouseDown, handleMouseUp, handleMouseLeave } =
    useButtonInteraction({
      onClick,
      onDoubleClick: props.onDoubleClick,
      onMouseDown: props.onMouseDown,
      onMouseLeave: props.onMouseLeave,
      onMouseUp: props.onMouseUp,
    });

  return (
    <motion.button
      ref={buttonRef}
      style={{
        ...defaultButtonStyle,
        ...getButtonWithTypeStyles(theme)[applyButtonType],
        ...(props.disabled ? { ...buttonDisabledStyle[applyButtonType], ...disabledStyle } : {}),
        originX: 0.5,
        originY: 0.5,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
        position: 'relative',
        ...style,
      }}
      variants={customVariants ? customVariants : defaultButtonVariants}
      transition={customTransition ? customTransition : defaultButtonTransition}
      whileHover={props.disabled ? 'none' : 'hover'}
      whileTap={props.disabled ? 'none' : 'tap'}
      onDoubleClick={handleDoubleClick}
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
