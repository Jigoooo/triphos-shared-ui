import { type DialogConfig, DialogType } from '../model/dialog-type.ts';
import { useGetDialogButtonColor } from '../model/use-get-dialog-button-color.ts';
import { Button } from '@/ui/button';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

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
            minWidth: '4rem',
            color: '#bbbbbb',
            borderColor: '#bbbbbb',
          }}
          onClick={() => {
            // window.history.back();
            dialogConfig?.onCancel?.();
          }}
        >
          <Typography style={{ color: '#555555', fontSize: '0.9rem' }}>
            {dialogConfig.cancelText}
          </Typography>
        </Button.Outlined>
      )}
      <Button.Solid
        style={{
          minWidth: '4rem',
          fontSize: '0.9rem',
          backgroundColor: dialogColor,
        }}
        onClick={() => {
          // window.history.back();
          dialogConfig?.onConfirm?.();
        }}
      >
        {dialogConfig.confirmText}
      </Button.Solid>
    </FlexRow>
  );
}
