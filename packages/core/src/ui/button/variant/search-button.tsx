import { IoSearchSharp } from 'react-icons/io5';

import type { ButtonProps } from '../model/button-type.ts';
import { Button } from '../ui/button.tsx';

export function SearchButton({ style, ...props }: Omit<ButtonProps, 'children'>) {
  return (
    <Button.Solid
      style={{
        ...{ width: '2.125rem', padding: 0, backgroundColor: '#555555' },
        ...style,
      }}
      {...props}
    >
      <IoSearchSharp style={{ fontSize: '1.1rem' }} />
    </Button.Solid>
  );
}
