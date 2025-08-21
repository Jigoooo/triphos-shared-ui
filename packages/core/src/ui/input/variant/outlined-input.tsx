import { type InputProps, InputType } from '../model/input-type.ts';
import { BaseInput } from '../ui/input.tsx';

export function OutlinedInput(props: InputProps) {
  return <BaseInput {...props} inputType={InputType.OUTLINED} />;
}
