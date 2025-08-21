import { type BottomSheetDefaultOptionProps } from '../model/bottom-sheet-type.ts';
import { SolidButton } from '@/ui/button';

export function BottomSheetDefaultOption<TValue extends string | number>({
  option,
  isSelected,
  ...props
}: BottomSheetDefaultOptionProps<TValue>) {
  return (
    <SolidButton
      key={option.value}
      style={{
        justifyContent: 'flex-start',
        paddingBlock: '1.2rem',
        paddingInline: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '0.5rem',
        backgroundColor: isSelected ? '#f0f0f0' : '#ffffff',
        cursor: 'pointer',
        textAlign: 'left',
        flexShrink: 0,
        color: '#333333',
      }}
      {...props}
    >
      {option.label}
    </SolidButton>
  );
}
