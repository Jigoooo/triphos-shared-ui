import { FaRegSave } from 'react-icons/fa';

import { Button, FlexRow, Typography } from '@/ui';
import type { ButtonProps } from '../model/button-type.ts';

export function FileDownloadButton({ style, ...props }: Omit<ButtonProps, 'children'>) {
  return (
    <Button.Outlined
      style={{
        ...{ color: '#666666', borderColor: '#333333' },
        ...style,
      }}
      {...props}
    >
      <FlexRow style={{ alignItems: 'center', gap: 6 }}>
        <FaRegSave style={{ fontSize: '1rem', color: '#333333' }} />
        <Typography style={{ fontSize: '0.82rem', color: '#333333' }}>파일</Typography>
      </FlexRow>
    </Button.Outlined>
  );
}
