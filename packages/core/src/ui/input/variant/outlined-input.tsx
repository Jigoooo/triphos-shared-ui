import { type InputProps, InputStyle } from '../model/input-type.ts';
import { BaseInput } from '../ui/input.tsx';

export function OutlinedInput(props: InputProps) {
  return <BaseInput {...props} inputStyle={InputStyle.OUTLINED} />;
}
