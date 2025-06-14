import type { ButtonProps } from '../model/button-type.ts';
import { ButtonStyle } from '../model/button-type.ts';
import { BaseButton } from '../ui/button.tsx';

export function OutlinedButton(props: Omit<ButtonProps, 'buttonStyle'>) {
  return <BaseButton {...props} buttonStyle={ButtonStyle.OUTLINED} />;
}
