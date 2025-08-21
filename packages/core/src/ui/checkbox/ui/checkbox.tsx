import { useMemo } from 'react';

import { AnimatedCheckbox } from './animated-checkbox.tsx';
import { CheckboxLabel } from './checkbox-label.tsx';
import { NoAnimatedCheckbox } from './no-animated-checkbox.tsx';
import type { CheckboxProps } from '../model/checkbox-type.ts';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';

const validateSize = (size: string | number, fallback: string): string => {
  if (typeof size === 'number') {
    return size > 0 ? `${size}px` : fallback;
  }

  const validCssSize = /^[0-9]+(\.[0-9]+)?(px|rem|em|%)$/.test(size.trim());
  return validCssSize ? size : fallback;
};

export function Checkbox({
  checkIconColor,
  checkboxSize = '1.125rem',
  checkIconSize = '0.65rem',
  label = '',
  labelStyle,
  labelPosition = 'right',
  checked,
  checkboxCheckedColor,
  checkboxColor,
  isPartial = false,
  onChange,
  disabled = false,
  isActiveAnimation = true,
  wrapperStyle,
  checkboxStyle,
  checkboxBorderWidth = 1,
}: CheckboxProps) {
  const { theme } = useThemeContext();
  const effectiveColor = checkboxCheckedColor || theme.colors.primaryColor;

  const validatedSizes = useMemo(
    () => ({
      checkboxSize: validateSize(checkboxSize, '1.125rem'),
      checkIconSize: validateSize(checkIconSize, '0.75rem'),
    }),
    [checkboxSize, checkIconSize],
  );

  const handleToggle = () => {
    if (disabled) return;

    onChange?.(!checked);
  };

  const checkboxSharedProps = useMemo(
    () => ({
      checkboxStyle,
      isPartial,
      checkboxSize: validatedSizes.checkboxSize,
      checkIconSize: validatedSizes.checkIconSize,
      disabled,
      checked,
      checkboxCheckedColor: effectiveColor,
      checkboxColor,
      checkIconColor,
      checkboxBorderWidth,
    }),
    [
      isPartial,
      checkboxStyle,
      validatedSizes.checkboxSize,
      validatedSizes.checkIconSize,
      disabled,
      checked,
      effectiveColor,
      checkboxColor,
      checkIconColor,
    ],
  );

  return (
    <FlexRow
      role='checkbox'
      aria-checked={isPartial ? 'mixed' : checked}
      aria-disabled={disabled}
      aria-label={label || undefined}
      tabIndex={disabled ? -1 : 0}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.375rem',
        cursor: disabled ? 'default' : 'pointer',
        ...wrapperStyle,
      }}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={() => {}}
        style={{ display: 'none' }}
        aria-hidden='true'
      />
      {!!label && labelPosition === 'left' && (
        <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />
      )}
      {isActiveAnimation ? (
        <AnimatedCheckbox {...checkboxSharedProps} />
      ) : (
        <NoAnimatedCheckbox {...checkboxSharedProps} />
      )}
      {!!label && labelPosition === 'right' && (
        <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />
      )}
    </FlexRow>
  );
}
