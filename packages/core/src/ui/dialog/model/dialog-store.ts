import { create } from 'zustand';

import { type DialogStates, type DialogStore, DialogType } from './dialog-type.ts';

const dialogInitialState: DialogStates = {
  dialogOpen: false,
  dialogConfig: {
    title: '',
    content: '',
    confirmText: '확인',
    cancelText: '취소',
    withCancel: false,
    overlayClose: false,
    dialogType: DialogType.INFO,
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const useDialogStore = create<DialogStore>()((setState, getState) => {
  return {
    ...dialogInitialState,
    actions: {
      open: (dialogConfig) => {
        setState((state) => ({
          ...state,
          dialogOpen: true,
          dialogConfig: {
            ...dialogInitialState.dialogConfig,
            ...dialogConfig,
            withCancel: dialogConfig.cancelText !== undefined ? true : !!dialogConfig.withCancel,
            onConfirm: () => {
              if (dialogConfig.onConfirm) dialogConfig.onConfirm();
              // getState().actions.close();
            },
            onCancel: () => {
              if (dialogConfig.onCancel) dialogConfig.onCancel();
              // getState().actions.close();
            },
          },
        }));
      },
      openAsync: (dialogConfig) =>
        new Promise((resolve) => {
          setState((state) => ({
            ...state,
            dialogOpen: true,
            dialogConfig: {
              ...dialogInitialState.dialogConfig,
              ...dialogConfig,
              withCancel: dialogConfig.cancelText !== undefined ? true : !!dialogConfig.withCancel,
              onConfirm: () => {
                if (dialogConfig.onConfirm) dialogConfig.onConfirm();
                // getState().actions.close();
                resolve(true);
              },
              onCancel: () => {
                if (dialogConfig.onCancel) dialogConfig.onCancel();
                // getState().actions.close();
                resolve(false);
              },
            },
          }));
        }),
      close: () => {
        setState(() => ({ ...dialogInitialState.dialogConfig, dialogOpen: false }));
      },
      success: (dialogConfig) => {
        getState().actions.open({ ...dialogConfig, dialogType: DialogType.SUCCESS });
      },
      successAsync: (dialogConfig) => {
        return getState().actions.openAsync({ ...dialogConfig, dialogType: DialogType.SUCCESS });
      },
      error: (dialogConfig) => {
        getState().actions.open({ ...dialogConfig, dialogType: DialogType.ERROR });
      },
      errorAsync: (dialogConfig) => {
        return getState().actions.openAsync({ ...dialogConfig, dialogType: DialogType.ERROR });
      },
      warning: (dialogConfig) => {
        getState().actions.open({ ...dialogConfig, dialogType: DialogType.WARNING });
      },
      warningAsync: (dialogConfig) => {
        return getState().actions.openAsync({ ...dialogConfig, dialogType: DialogType.WARNING });
      },
      info: (dialogConfig) => {
        getState().actions.open({ ...dialogConfig, dialogType: DialogType.INFO });
      },
      infoAsync: (dialogConfig) => {
        return getState().actions.openAsync({ ...dialogConfig, dialogType: DialogType.INFO });
      },
    },
  };
});

export const dialog = useDialogStore.getState().actions;
