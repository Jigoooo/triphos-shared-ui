import { motion } from 'framer-motion';

import type { ButtonProps } from '../model/button-type.ts';
import { ButtonStyle } from '../model/button-type.ts';
import {
  buttonDisabledStyle,
  getButtonWithTypeStyles,
  defaultButtonStyle,
} from '../lib/button-styles.ts';
import { getAnimationBackgroundColor } from '../lib/get-animation-background-color.ts';
import { SolidButton } from '../variant/solid-button.tsx';
import { OutlinedButton } from '../variant/outlined-button.tsx';
import { useButtonInteraction } from '../model/use-button-interaction.ts';
import { useThemeContext } from '@/theme';

//<button
//             onClick={onClearAll}
//             style={{
//               fontSize: '0.75rem',
//               color: '#dc2626',
//               backgroundColor: 'transparent',
//               border: 'none',
//               cursor: 'pointer',
//               padding: '0.25rem 0.5rem',
//               borderRadius: '4px',
//               transition: 'background-color 0.2s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = '#fee2e2';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = 'transparent';
//             }}
//           >
//             모두 삭제
//           </button>

export function BaseButton({
  buttonStyle = ButtonStyle.SOLID,
  customVariants,
  animationColor,
  children,
  style,
  disabledStyle,
  onClick,
  ...props
}: ButtonProps) {
  const { theme } = useThemeContext();

  const backgroundColor = style?.backgroundColor ?? theme.colors.primaryColor;
  const color = style?.color ?? theme.colors.primaryColor;
  const defaultAnimationColor = buttonStyle === ButtonStyle.OUTLINED ? color : backgroundColor;
  const animationBackgroundColor = getAnimationBackgroundColor(
    buttonStyle,
    animationColor ?? defaultAnimationColor,
  );

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
        ...getButtonWithTypeStyles(theme)[buttonStyle],
        ...(props.disabled ? { ...buttonDisabledStyle[buttonStyle], ...disabledStyle } : {}),
        ...style,
      }}
      variants={
        customVariants
          ? customVariants
          : {
              hover: { backgroundColor: animationBackgroundColor.hoverBackgroundColor },
              tap: { backgroundColor: animationBackgroundColor.tapBackgroundColor, scale: 0.98 },
              none: {},
            }
      }
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
