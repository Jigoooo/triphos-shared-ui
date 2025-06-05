import type { CSSProperties } from 'react';

import { Typography } from '@/ui/view';

export function CheckboxLabel({
  label,
  labelStyle,
  disabled,
}: {
  label: string;
  labelStyle?: CSSProperties;
  disabled?: boolean;
}) {
  return (
    <Typography
      style={{
        userSelect: 'none',
        fontSize: '0.9rem',
        color: disabled ? '#999999' : '#666666',
        fontWeight: 500,
        ...labelStyle,
      }}
    >
      {label}
    </Typography>
  );
}
