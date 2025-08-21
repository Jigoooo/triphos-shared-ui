import { type InputProps, InputType } from '../model/input-type.ts';
import { BaseInput } from '../ui/input.tsx';

export function SoftInput(props: InputProps) {
  return <BaseInput {...props} inputType={InputType.SOFT} />;
}
