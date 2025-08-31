import type { CSSProperties, ReactNode, RefObject } from 'react';

import type { CloseIconButtonProps } from '@/ui/icon';

export type ModalConfig = {
  animation: 'slide-up' | 'slide-right';
};

export type AnimationType = 'slide-up' | 'slide-right';

export type ModalItem = {
  id: string;
  render: (props: ModalRenderProps) => ReactNode;
  order: number;
  config?: {
    animation: AnimationType;
  };
};

export type ModalRenderProps = {
  overlayRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  close: () => void;
  closeAsync: () => Promise<void>;
  closeWithoutHistory?: () => void;
};

export type IsPossibleOverlayClose = {
  [key: string]: boolean;
};

export type ModalContextType = {
  modalIds: { id: string }[];
  open: (id: string, render: (props: ModalRenderProps) => ReactNode, config?: ModalConfig) => void;
  closeAsync: () => Promise<void>;
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
  children: ReactNode;
};
