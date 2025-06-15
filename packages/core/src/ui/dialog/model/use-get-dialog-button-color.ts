import { useThemeContext } from '@/theme';
import { DialogType } from '../model/dialog-type.ts';

export function useGetDialogButtonColor(dialogType: DialogType) {
  const { theme } = useThemeContext();

  const dialogColor: Record<DialogType, string> = {
    [DialogType.INFO]: theme.colors.primaryColor,
    [DialogType.SUCCESS]: theme.colors.successColor,
    [DialogType.WARNING]: theme.colors.warningColor,
    [DialogType.ERROR]: theme.colors.errorColor,
  } as const;

  return dialogColor[dialogType] || theme.colors.primaryColor;
}
