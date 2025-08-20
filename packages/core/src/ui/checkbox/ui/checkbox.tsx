import { AnimatedCheckbox } from './animated-checkbox.tsx';
import { CheckboxLabel } from './checkbox-label.tsx';
import { NoAnimatedCheckbox } from './no-animated-checkbox.tsx';
import type { CheckboxProps } from '../model/checkbox-type.ts';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';

export function Checkbox({
  style,
  checkIconColor,
  checkboxSize = '1.125rem',
  checkIconSize = '0.75rem',
  label = '',
  labelStyle,
  labelPosition = 'right',
  checked,
  checkboxCheckedColor,
  checkboxColor,
  isPartial = false,
  onChange,
  onClick,
  disabled = false,
  isActiveAnimation = true,
  wrapperStyle,
  checkboxStyle,
  ...props
}: CheckboxProps) {
  const { theme } = useThemeContext();
  const effectiveColor = checkboxCheckedColor || theme.colors.primaryColor;

  const handleToggle = (e: React.MouseEvent) => {
    if (disabled) return;

    if (onChange) {
      onChange(!checked);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <FlexRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.375rem',
        cursor: disabled ? 'default' : 'pointer',
        ...wrapperStyle,
      }}
      onClick={handleToggle}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={() => {}}
        style={{ ...style, display: 'none' }}
        {...props}
      />
      {!!label && labelPosition === 'left' && (
        <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />
      )}
      {isActiveAnimation ? (
        <AnimatedCheckbox
          checkboxStyle={checkboxStyle}
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
          checkboxStyle={checkboxStyle}
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
      {!!label && labelPosition === 'right' && (
        <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />
      )}
    </FlexRow>
  );
}
