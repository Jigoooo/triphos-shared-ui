import { DialogType } from '../model/dialog-type.ts';
import { colors } from '@/constants';

export const dialogColors: Record<DialogType, string> = {
  [DialogType.INFO]: colors.primary[400],
  [DialogType.SUCCESS]: colors.success[400],
  [DialogType.WARNING]: colors.warning[500],
  [DialogType.ERROR]: colors.error[400],
} as const;
