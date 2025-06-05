import type { ButtonProps } from '../model/button-type.ts';
import { ButtonStyle } from '../model/button-type.ts';
import { BaseButton } from '../ui/button.tsx';

export function SolidButton(props: Omit<ButtonProps, 'buttonStyle'>) {
  return <BaseButton {...props} buttonStyle={ButtonStyle.SOLID} />;
}
