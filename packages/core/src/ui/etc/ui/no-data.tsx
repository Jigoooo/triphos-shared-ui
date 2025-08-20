import NoDataIcon from '../../../../public/images/no-data-icon.svg?react';
import type { NoDataProps } from '../model/etc-type.ts';
import { FlexColumn } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function NoData({ emptyMessage }: NoDataProps) {
  return (
    <FlexColumn
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <NoDataIcon style={{ width: 50, height: 50, fill: '#000000' }} />
      <Typography style={{ fontWeight: 600, color: '#000000' }}>{emptyMessage}</Typography>
    </FlexColumn>
  );
}
