import { type MouseEvent, useCallback, useState } from 'react';

import { LuChevronDown } from 'react-icons/lu';

import { BottomSheet } from './bottom-sheet';
import { type BottomSheetWithInputProps } from '../model/bottom-sheet-type.ts';
import { OutlinedInput } from '@/ui/input';

export function BottomSheetWithInput({
  bottomSheetContent,
  bottomSheetMaxHeight,
  bottomSheetDragThreshold,
  onClick,
  ...props
}: BottomSheetWithInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      setIsOpen(true);
      onClick?.(e);
    },
    [onClick],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <OutlinedInput
        readOnly
        role='combobox'
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-label='Select option'
        onClick={handleClick}
        endDecorator={<LuChevronDown aria-hidden='true' />}
        isFocusEffect={false}
        style={{
          width: '100%',
        }}
        {...props}
      />
      <BottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        maxHeight={bottomSheetMaxHeight}
        dragThreshold={bottomSheetDragThreshold}
      >
        {typeof bottomSheetContent === 'function'
          ? bottomSheetContent({ close: handleClose })
          : bottomSheetContent}
      </BottomSheet>
    </>
  );
}
