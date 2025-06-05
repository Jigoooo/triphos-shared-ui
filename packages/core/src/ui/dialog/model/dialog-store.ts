import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type { DialogStates, DialogStoreInterface } from './dialog-type.ts';
import { DialogType } from './dialog-type.ts';

const dialogInitialState: DialogStates = {
  dialogOpen: false,
  dialogConfig: {
    title: '',
    contents: '',
    confirmText: '확인',
    cancelText: '취소',
    withCancel: false,
    overlayClose: false,
    dialogType: DialogType.INFO,
    onConfirm: () => {},
    onCancel: () => {},
  },
};

const useDialogStore = create<DialogStoreInterface>()((setState, getState) => {
  return {
    ...dialogInitialState,
    actions: {
      open: (dialogInfos) => {
        setState((state) => ({
          ...state,
          dialogOpen: true,
          dialogConfig: {
            ...dialogInitialState.dialogConfig,
            ...dialogInfos,
            withCancel: dialogInfos.cancelText !== undefined ? true : !!dialogInfos.withCancel,
            onConfirm: () => {
              if (dialogInfos.onConfirm) dialogInfos.onConfirm();
              getState().actions.close();
            },
            onCancel: () => {
              if (dialogInfos.onCancel) dialogInfos.onCancel();
              getState().actions.close();
            },
          },
        }));
      },
      openAsync: (dialogInfos) =>
        new Promise((resolve) => {
          setState((state) => ({
            ...state,
            dialogOpen: true,
            dialogConfig: {
              ...dialogInitialState.dialogConfig,
              ...dialogInfos,
              withCancel: dialogInfos.cancelText !== undefined ? true : !!dialogInfos.withCancel,
              onConfirm: () => {
                if (dialogInfos.onConfirm) dialogInfos.onConfirm();
                getState().actions.close();
                resolve(true);
              },
              onCancel: () => {
                if (dialogInfos.onCancel) dialogInfos.onCancel();
                getState().actions.close();
                resolve(false);
              },
            },
          }));
        }),
      close: () => {
        setState(() => ({ ...dialogInitialState.dialogConfig, dialogOpen: false }));
      },
      success: (dialogInfos) => {
        getState().actions.open({ ...dialogInfos, dialogType: DialogType.SUCCESS });
      },
      successAsync: (dialogInfos) => {
        return getState().actions.openAsync({ ...dialogInfos, dialogType: DialogType.SUCCESS });
      },
      error: (dialogInfos) => {
        getState().actions.open({ ...dialogInfos, dialogType: DialogType.ERROR });
      },
      errorAsync: (dialogInfos) => {
        return getState().actions.openAsync({ ...dialogInfos, dialogType: DialogType.ERROR });
      },
      warning: (dialogInfos) => {
        getState().actions.open({ ...dialogInfos, dialogType: DialogType.WARNING });
      },
      warningAsync: (dialogInfos) => {
        return getState().actions.openAsync({ ...dialogInfos, dialogType: DialogType.WARNING });
      },
      info: (dialogInfos) => {
        getState().actions.open({ ...dialogInfos, dialogType: DialogType.INFO });
      },
      infoAsync: (dialogInfos) => {
        return getState().actions.openAsync({ ...dialogInfos, dialogType: DialogType.INFO });
      },
    },
  };
});

export const useDialogOpen = () => useDialogStore((state) => state.dialogOpen);
export const useDialogConfig = () => useDialogStore(useShallow((state) => state.dialogConfig));
export const dialog = useDialogStore.getState().actions;
