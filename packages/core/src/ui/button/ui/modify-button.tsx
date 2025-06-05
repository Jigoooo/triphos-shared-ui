import { Button } from './button.tsx';
import type { ButtonProps } from '../model/button-type.ts';

export function ModifyButton({ style, ...props }: Omit<ButtonProps, 'children'>) {
  return (
    <Button.Outlined
      style={{
        ...{ width: '100%', height: '1.9rem' },
        ...style,
      }}
      {...props}
    >
      수정
    </Button.Outlined>
  );
}
