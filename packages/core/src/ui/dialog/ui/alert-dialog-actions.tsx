import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';
import { Button } from '@/ui/button';
import type { DialogConfig } from '../model/dialog-type.ts';
import { DialogType } from '../model/dialog-type.ts';
import { useGetDialogButtonColor } from '../model/use-get-dialog-button-color.ts';

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
            dialogConfig?.onCancel?.();

            // if (isMobile) {
            //   window.history.back();
            // }
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
          // if (isMobile) {
          //   window.history.back();
          // }

          setTimeout(() => dialogConfig?.onConfirm?.(), 10);
        }}
      >
        {dialogConfig.confirmText}
      </Button.Solid>
    </FlexRow>
  );
}
