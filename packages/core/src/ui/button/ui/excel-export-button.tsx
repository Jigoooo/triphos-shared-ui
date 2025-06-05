import { MdOutlineFileDownload } from 'react-icons/md';

import { Button, FlexRow, Typography } from '@/ui';
import type { ButtonProps } from '../model/button-type.ts';

export function ExcelExportButton({ style, ...props }: Omit<ButtonProps, 'children'>) {
  return (
    <Button.Outlined
      style={{
        ...{ color: '#666666', borderColor: '#333333' },
        ...style,
      }}
      {...props}
    >
      <FlexRow style={{ alignItems: 'center', gap: 4 }}>
        <MdOutlineFileDownload style={{ fontSize: '1.2rem', color: '#333333' }} />
        <Typography style={{ fontSize: '0.82rem', color: '#333333' }}>Excel Export</Typography>
      </FlexRow>
    </Button.Outlined>
  );
}
