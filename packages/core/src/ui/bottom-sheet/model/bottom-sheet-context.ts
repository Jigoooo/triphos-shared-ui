import { type ReactNode, createContext, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  type BottomSheetConfig,
  type BottomSheetContextType,
  type BottomSheetRenderProps,
} from './bottom-sheet-type.ts';

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  return {
    ...context,
    open: (render: (props: BottomSheetRenderProps) => ReactNode, config?: BottomSheetConfig) => {
      const id = uuidV4();
      context.open(id, render, config);
      return id;
    },
  };
};
