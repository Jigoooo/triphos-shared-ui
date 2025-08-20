import { type ButtonProps, ButtonType } from '../model/button-type.ts';
import { BaseButton } from '../ui/button.tsx';

export function SolidButton(props: Omit<ButtonProps, 'buttonType'>) {
  return <BaseButton {...props} buttonType={ButtonType.SOLID} />;
}
