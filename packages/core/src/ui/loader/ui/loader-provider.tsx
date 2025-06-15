import { AnimatePresence } from 'framer-motion';
import { FloatingPortal } from '@floating-ui/react';
import { useShallow } from 'zustand/react/shallow';

import { useLoaderStore } from '../model/loader-store';
import { LoaderOverlay } from './loader-overlay.tsx';
import { GlobalLoader } from './global-loader.tsx';

export function LoaderProvider() {
  const loadingState = useLoaderStore(useShallow((state) => state));

  return (
    <FloatingPortal>
      <AnimatePresence initial={false}>
        {loadingState.isLoading && loadingState.isActiveOverlay && <LoaderOverlay />}

        {loadingState.isLoading && <GlobalLoader loaderText={loadingState.loaderText} />}
      </AnimatePresence>
    </FloatingPortal>
  );
}
