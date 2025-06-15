import type { ReactNode } from 'react';

export type ActionsAnimatedProps = {
  padding?: string | number;
  onClick?: () => void;
  children: ReactNode;
};

export type NoDataProps = { emptyMessage: string };
