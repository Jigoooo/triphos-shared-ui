import { MoonLoader } from 'react-spinners';

import { loadingStyles } from './loading-styles.ts';
import { Typography, useLoading } from '@/ui';

export function MoonLoading() {
  const loadingState = useLoading();

  return (
    <div className={'selection-none'} style={{ ...loadingStyles.loader, ...{ gap: 8 } }}>
      <MoonLoader color={'#0ce3b8'} size={60} />
      <Typography style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 500 }}>
        {loadingState.loadingText}
      </Typography>
    </div>
  );
}
