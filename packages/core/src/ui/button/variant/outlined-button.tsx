import { type ButtonProps, ButtonType } from '../model/button-type.ts';
import { BaseButton } from '../ui/button.tsx';

export function OutlinedButton(props: Omit<ButtonProps, 'buttonType'>) {
  return <BaseButton {...props} buttonType={ButtonType.OUTLINED} />;
}
