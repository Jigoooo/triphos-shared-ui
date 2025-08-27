import { type DialogConfig, DialogType } from '../model/dialog-type.ts';
import { useGetDialogButtonColor } from '../model/use-get-dialog-button-color.ts';
import { Button } from '@/ui/button';
import { FlexRow } from '@/ui/layout';

export function AlertDialogActions({ dialogConfig }: { dialogConfig: DialogConfig }) {
  const dialogColor = useGetDialogButtonColor(dialogConfig.dialogType || DialogType.INFO);

  return (
    <FlexRow
      style={{
        gap: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {dialogConfig.withCancel && (
        <Button.Outlined
          style={{
            minWidth: '4.5rem',
            fontSize: '0.9rem',
            color: '#333333',
            borderColor: '#dddddd',
          }}
          animationBackgroundColor={'#bbbbbb'}
          onClick={() => {
            window.history.back();
            setTimeout(() => {
              dialogConfig?.onCancel?.();
            }, 30);
          }}
        >
          {dialogConfig.cancelText}
        </Button.Outlined>
      )}
      <Button.Solid
        style={{
          minWidth: '4.5rem',
          fontSize: '0.9rem',
          backgroundColor: dialogColor,
          boxShadow: '0 6px 14px rgba(17, 24, 39, 0.12)',
        }}
        onClick={() => {
          window.history.back();
          setTimeout(() => {
            dialogConfig?.onConfirm?.();
          }, 30);
        }}
      >
        {dialogConfig.confirmText}
      </Button.Solid>
    </FlexRow>
  );
}
