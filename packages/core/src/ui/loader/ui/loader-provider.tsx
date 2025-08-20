import { FloatingPortal } from '@floating-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';

import { GlobalLoader } from './global-loader.tsx';
import { LoaderOverlay } from './loader-overlay.tsx';
import { useLoaderStore } from '../model/loader-store';

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
