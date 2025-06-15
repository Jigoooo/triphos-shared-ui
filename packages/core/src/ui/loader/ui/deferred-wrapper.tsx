import { useEffect, useState } from 'react';

import type { DeferredWrapperProps } from '../model/loader-type.ts';

export function DeferredWrapper({ deferredDuration = 300, children }: DeferredWrapperProps) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, deferredDuration);

    return () => clearTimeout(timeout);
  }, [deferredDuration]);

  if (!showLoader) {
    return;
  }

  return <>{children}</>;
}
