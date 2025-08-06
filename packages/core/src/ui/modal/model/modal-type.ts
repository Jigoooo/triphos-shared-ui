import type { CSSProperties, ReactNode, Ref } from 'react';

export type ModalItem = {
  id: string;
  render: (props: ModalRenderProps) => ReactNode;
  order: number;
};

export type ModalRenderProps = {
  overlayRef: Ref<HTMLDivElement>;
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
  overlayRef: Ref<HTMLDivElement>;
  close: () => void;
  headerVisible?: boolean;
  drag?: boolean;
  title?: string;
  titleIcon?: ReactNode;
  subTitle?: string;
  containerStyle?: CSSProperties;
  headerContainerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  withHeader?: boolean;
  children: ReactNode;
};
