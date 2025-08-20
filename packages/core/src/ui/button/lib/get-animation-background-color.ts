import { darken, rgba } from 'polished';

import { ButtonStyle } from '../model/button-type.ts';

export const getAnimationBackgroundColor = (
  buttonStyle: ButtonStyle,
  animationColor: string,
): { hoverBackgroundColor: string; tapBackgroundColor: string } => {
  switch (buttonStyle) {
    case ButtonStyle.SOLID: {
      return {
        hoverBackgroundColor: darken(0.08, animationColor),
        tapBackgroundColor: darken(0.15, animationColor),
      };
    }
    case ButtonStyle.OUTLINED: {
      return {
        hoverBackgroundColor: rgba(animationColor, 0.08),
        tapBackgroundColor: rgba(animationColor, 0.12),
      };
    }
    default: {
      return {
        hoverBackgroundColor: darken(0.08, animationColor),
        tapBackgroundColor: darken(0.15, animationColor),
      };
    }
  }
};
