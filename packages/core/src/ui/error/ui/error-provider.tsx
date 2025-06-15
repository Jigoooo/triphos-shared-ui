import { ErrorBoundary } from 'react-error-boundary';

import { ComponentErrorPage } from './component-error-page';
import type { ErrorProviderProps } from '../model/error-type.ts';

export function ErrorProvider({ children }: ErrorProviderProps) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <ComponentErrorPage {...props} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
