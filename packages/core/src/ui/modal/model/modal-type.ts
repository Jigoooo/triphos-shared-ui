import type { CSSProperties, ReactNode, RefObject } from 'react';

import type { CloseIconButtonProps } from '@/ui/icon';

export type ModalItem = {
  id: string;
  render: (props: ModalRenderProps) => ReactNode;
  order: number;
};

export type ModalRenderProps = {
  overlayRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  close: () => void;
};

export type IsPossibleOverlayClose = {
  [key: string]: boolean;
};

export type ModalContextType = {
  modalIds: { id: string }[];
  open: (id: string, render: (props: ModalRenderProps) => ReactNode) => void;
  close: (id: string) => void;
  handleIsPossibleOverlayClose: (id: string, possible: boolean) => void;
};

export type ModalLayoutProps = {
  overlayRef: RefObject<HTMLDivElement | null>;
  close: () => void;
  headerVisible?: boolean;
  drag?: boolean;
  title?: string;
  titleIcon?: ReactNode;
  subTitle?: string;
  containerStyle?: CSSProperties;
  headerContainerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  closeIconProps?: Omit<CloseIconButtonProps, 'close'>;
  withHeader?: boolean;
  children: ReactNode;
};
