import { Typography } from '@/ui/typography';
import type { CheckboxLabelProps } from '../model/checkbox-type.ts';

export function CheckboxLabel({ label, labelStyle, disabled }: CheckboxLabelProps) {
  return (
    <Typography
      style={{
        userSelect: 'none',
        fontSize: '0.9rem',
        color: disabled ? '#999999' : '#666666',
        ...labelStyle,
      }}
    >
      {label}
    </Typography>
  );
}
