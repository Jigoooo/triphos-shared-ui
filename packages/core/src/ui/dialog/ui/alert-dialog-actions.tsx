import type { DialogInfoStates } from '../model/dialog-type.ts';
import type { DialogType } from '../model/dialog-type.ts';
import { FlexRow, Typography } from '@/ui/view';
import { Button } from '@/ui/button';
import { detectDeviceTypeAndOS } from '@/lib';
import { dialogColors } from '../config/dialog-colors.ts';

const { isMobile } = detectDeviceTypeAndOS();

export function AlertDialogActions({ dialogInfos }: { dialogInfos: DialogInfoStates }) {
  const dialogColor = dialogColors[dialogInfos.dialogType as DialogType];

  return (
    <FlexRow
      style={{
        gap: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {dialogInfos.withCancel && (
        <Button.Outlined
          style={{
            minWidth: '4rem',
            color: '#bbbbbb',
            borderColor: '#bbbbbb',
          }}
          onClick={() => {
            dialogInfos?.onCancel?.();

            if (isMobile) {
              window.history.back();
            }
          }}
        >
          <Typography style={{ color: '#555555', fontSize: '0.9rem', fontWeight: 500 }}>
            {dialogInfos.cancelText}
          </Typography>
        </Button.Outlined>
      )}
      <Button.Solid
        style={{
          minWidth: '4rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          backgroundColor: dialogColor,
        }}
        onClick={() => {
          if (isMobile) {
            window.history.back();
          }

          setTimeout(() => dialogInfos?.onConfirm?.(), 10);
        }}
      >
        {dialogInfos.confirmText}
      </Button.Solid>
    </FlexRow>
  );
}
