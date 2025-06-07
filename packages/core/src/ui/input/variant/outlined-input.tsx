import type { ExtendedInputProps } from '../model/input-type.ts';
import { InputStyle } from '../model/input-type.ts';
import { BaseInput } from '../ui/input.tsx';

export function OutlinedInput(props: ExtendedInputProps) {
  return <BaseInput {...props} inputStyle={InputStyle.OUTLINED} />;
}
