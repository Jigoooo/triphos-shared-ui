import '@/app/providers/css';

import { ModalContextWrapper } from '@jigoooo/shared-ui';

import { AlertProvider, LoadingProvider, ThemeProvider } from '@/app/providers';
import { Main } from '@/pages/main';

export default function App() {
  return (
    <ThemeProvider>
      <ModalContextWrapper>
        <Main />
        <LoadingProvider />
        <AlertProvider />
      </ModalContextWrapper>
    </ThemeProvider>
  );
}
