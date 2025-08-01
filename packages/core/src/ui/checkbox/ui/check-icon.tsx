import CheckSolid from '../../../../public/images/check-solid.svg?react';
import type { CheckboxIconProps } from '../model/checkbox-type.ts';
import { useThemeContext } from '@/theme';

export function CheckIcon({
  checkIconSize,
  checkIconColor = '#ffffff',
  disabled = false,
}: CheckboxIconProps) {
  const { theme } = useThemeContext();

  return (
    <CheckSolid
      style={{
        width: checkIconSize,
        height: checkIconSize,
        fill: disabled ? theme.colors.primaryColor : checkIconColor,
        stroke: disabled ? theme.colors.primaryColor : checkIconColor,
        strokeWidth: '1.875rem',
      }}
    />
  );
}
