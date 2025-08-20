import { motion } from 'framer-motion';

import {
  buttonDisabledStyle,
  getButtonWithTypeStyles,
  defaultButtonStyle,
  getButtonAnimationBackgroundColor,
  getDefaultButtonVariants,
  getDefaultButtonTransition,
} from '../config/button-styles.ts';
import { type ButtonProps, ButtonType } from '../model/button-type.ts';
import { useButtonInteraction } from '../model/use-button-interaction.ts';
import { OutlinedButton } from '../variant/outlined-button.tsx';
import { SolidButton } from '../variant/solid-button.tsx';
import { useThemeContext } from '@/theme';
import { PlainButton } from '@/ui/button/variant/plain-button.tsx';

export function BaseButton({
  ref,
  buttonType,
  customVariants,
  customTransition,
  animationBackgroundColor,
  children,
  style,
  disabledStyle,
  onClick,
  ...props
}: ButtonProps) {
  const { theme } = useThemeContext();

  const applyButtonType = buttonType ?? theme.components.button.type;

  const backgroundColor = style?.backgroundColor ?? theme.colors.primaryColor;
  const color = style?.color ?? theme.colors.primaryColor;
  const defaultAnimationColor = applyButtonType === ButtonType.OUTLINED ? color : backgroundColor;
  const applyAnimationBackgroundColor = getButtonAnimationBackgroundColor(
    applyButtonType,
    animationBackgroundColor ?? defaultAnimationColor,
  );

  const defaultButtonVariants = getDefaultButtonVariants(
    applyAnimationBackgroundColor.hoverBackgroundColor,
    applyAnimationBackgroundColor.tapBackgroundColor,
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
      ref={(buttonElementRef) => {
        if (typeof ref === 'function' && ref) {
          ref(buttonElementRef);
        } else if (ref) {
          ref.current = buttonElementRef;
        }

        buttonRef.current = buttonElementRef;
      }}
      style={{
        ...defaultButtonStyle,
        ...getButtonWithTypeStyles(theme)[applyButtonType],
        ...(props.disabled ? { ...buttonDisabledStyle[applyButtonType], ...disabledStyle } : {}),
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
  Plain: PlainButton,
});
