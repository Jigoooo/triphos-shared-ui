import { FlexRow } from '@/ui/layout';
import type { CheckboxProps } from '../model/checkbox-type.ts';
import { CheckboxLabel } from './checkbox-label.tsx';
import { AnimatedCheckbox } from './animated-checkbox.tsx';
import { NoAnimatedCheckbox } from './no-animated-checkbox.tsx';
import { useThemeContext } from '@/theme';

export function Checkbox({
  style,
  checkboxSize = '1.125rem',
  checkIconSize = '0.75rem',
  label = '',
  labelStyle,
  checked,
  color,
  isPartial = false,
  onClick,
  disabled = false,
  isActiveAnimation = true,
  ...checkboxProps
}: CheckboxProps) {
  const { theme } = useThemeContext();
  const effectiveColor = color || theme.colors.primaryColor;

  return (
    <FlexRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.375rem',
        cursor: 'pointer',
      }}
      onClick={(e) => !disabled && onClick(e)}
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
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          color={effectiveColor}
        />
      ) : (
        <NoAnimatedCheckbox
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          color={effectiveColor}
        />
      )}
      {!!label && <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />}
    </FlexRow>
  );
}
