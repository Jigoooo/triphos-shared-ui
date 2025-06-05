import { colors } from '@/constants';
import { FlexRow } from '@/ui/view';
import type { CheckboxProps } from '../model/checkbox-type.ts';
import { CheckboxLabel } from './checkbox-label.tsx';
import { AnimatedCheckbox } from './animated-checkbox.tsx';
import { NoAnimatedCheckbox } from './no-animated-checkbox.tsx';

export function Checkbox({
  checkboxSize = '1.125rem',
  checkIconSize = '0.75rem',
  label = '',
  labelStyle,
  checked,
  color = colors.primary[400],
  isPartial = false,
  onClick,
  disabled = false,
  isActiveAnimation = true,
  ...checkboxProps
}: CheckboxProps) {
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
        style={{ display: 'none' }}
        {...checkboxProps}
      />
      {isActiveAnimation ? (
        <AnimatedCheckbox
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          color={color}
        />
      ) : (
        <NoAnimatedCheckbox
          isPartial={isPartial}
          checkboxSize={checkboxSize}
          checkIconSize={checkIconSize}
          disabled={disabled}
          checked={checked}
          color={color}
        />
      )}
      {!!label && <CheckboxLabel label={label} labelStyle={labelStyle} disabled={disabled} />}
    </FlexRow>
  );
}
