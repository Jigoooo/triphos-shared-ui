import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';

import type { DividerProps } from '@/ui/divider';

export type ContextMenuWrapperProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export type ContextMenuDividerProps = DividerProps;

export type ContextMenuItemProps = HTMLAttributes<HTMLElement> & {
  title: string;
  icon?: ReactNode;
};
