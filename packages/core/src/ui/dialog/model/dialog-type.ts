import type { ReactNode } from 'react';

export type DialogInfoStates = {
  title?: string;
  contents?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  withCancel?: boolean;
  overlayClose?: boolean;
  dialogType?: DialogType;
};
export type DialogStates = {
  dialogOpen: boolean;
  dialogConfig: DialogInfoStates;
};

type DialogActions = {
  open: (openDialog: DialogInfoStates) => void;
  openAsync: (openDialog: DialogInfoStates) => Promise<boolean>;
  close: () => void;
  success: (openDialog: DialogInfoStates) => void;
  successAsync: (openDialog: DialogInfoStates) => Promise<boolean>;
  error: (openDialog: DialogInfoStates) => void;
  errorAsync: (openDialog: DialogInfoStates) => Promise<boolean>;
  warning: (openDialog: DialogInfoStates) => void;
  warningAsync: (openDialog: DialogInfoStates) => Promise<boolean>;
  info: (openDialog: DialogInfoStates) => void;
  infoAsync: (openDialog: DialogInfoStates) => Promise<boolean>;
};

export type DialogStoreInterface = DialogStates & {
  actions: DialogActions;
};

export enum DialogType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
