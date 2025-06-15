import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';
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

  const id = useMemo(() => uuidV4(), []);

  useEffect(() => {
    context.handleIsPossibleOverlayClose(id, isPossibleOverlayClose);
  }, [id, isPossibleOverlayClose]);

  return {
    ...context,
    open: (render: (props: ModalRenderProps) => ReactNode) => {
      context.open(id, render);
    },
    close: () => {
      context.close(id);
    },
    id,
  };
};
