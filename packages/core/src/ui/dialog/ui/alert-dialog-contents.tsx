import type { ReactNode } from 'react';

import { FlexColumn } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function AlertDialogContents({ contents }: { contents?: ReactNode }) {
  return (
    <>
      {contents ? (
        <FlexColumn
          style={{
            paddingTop: '0.5rem',
            paddingBottom: '1.5rem',
            whiteSpace: 'pre-line',
            overflowY: 'auto',
            marginBottom: '0.4rem',
          }}
        >
          {typeof contents === 'string' ? (
            <Typography style={{ fontSize: '0.92rem', paddingRight: '0.75rem' }}>
              {contents}
            </Typography>
          ) : (
            contents
          )}
        </FlexColumn>
      ) : (
        <div style={{ height: '0.4rem' }}></div>
      )}
    </>
  );
}
