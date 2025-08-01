import { FlexRow } from '@/ui/layout';
import type { CheckboxProps } from '../model/checkbox-type.ts';
import { CheckboxLabel } from './checkbox-label.tsx';
import { AnimatedCheckbox } from './animated-checkbox.tsx';
import { NoAnimatedCheckbox } from './no-animated-checkbox.tsx';
import { useThemeContext } from '@/theme';

export function Checkbox({
  style,
  checkIconColor,
  checkboxSize = '1.125rem',
  checkIconSize = '0.75rem',
  label = '',
  labelStyle,
  checked,
  checkboxCheckedColor,
  checkboxColor,
  isPartial = false,
  onClick,
  disabled = false,
  isActiveAnimation = true,
  containerStyle,
  ...checkboxProps
}: CheckboxProps) {
  const { theme } = useThemeContext();
  const effectiveColor = checkboxCheckedColor || theme.colors.primaryColor;

  return (
    <FlexRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.375rem',
        cursor: 'pointer',
      }}
      onClick={(e) => !disabled && onClick && onClick(e)}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={() => {}}
        style={{ ...style, display: 'none' }}
        {...checkboxProps}
      />
      {isActiveAnimation ? (
        <AnimatedCheckbox
          containerStyle={containerStyle}
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          checkboxCheckedColor={effectiveColor}
          checkboxColor={checkboxColor}
          checkIconColor={checkIconColor}
        />
      ) : (
        <NoAnimatedCheckbox
          containerStyle={containerStyle}
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          checkboxCheckedColor={effectiveColor}
          checkboxColor={checkboxColor}
          checkIconColor={checkIconColor}
        />
      )}
      {!!label && <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />}
    </FlexRow>
  );
}
