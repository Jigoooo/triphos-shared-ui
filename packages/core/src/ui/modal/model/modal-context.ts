import { type ReactNode, createContext, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

import type { ModalContextType, ModalRenderProps } from './modal-type.ts';

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = ({
  isPossibleOverlayClose = false,
}: {
  isPossibleOverlayClose?: boolean;
} = {}) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return {
    ...context,
    open: (render: (props: ModalRenderProps) => ReactNode) => {
      const id = uuidV4();
      context.handleIsPossibleOverlayClose(id, isPossibleOverlayClose);
      context.open(id, render);
      return id;
    },
    close: (id: string) => {
      context.close(id);
    },
  };
};
