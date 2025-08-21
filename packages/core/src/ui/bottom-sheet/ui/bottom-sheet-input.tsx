import { type InputProps } from '@jigoooo/shared-ui';
import { type MouseEvent, type ReactNode, useCallback, useState } from 'react';

import { LuChevronDown } from 'react-icons/lu';

import { BottomSheet } from './bottom-sheet';
import { OutlinedInput } from '@/ui/input';

interface BottomSheetInputProps extends InputProps {
  bottomSheetContent: ReactNode | ((props: { close: () => void }) => ReactNode);
  bottomSheetMaxHeight?: string | number;
  bottomSheetDragThreshold?: string | number;
}

export function BottomSheetInput({
  bottomSheetContent,
  bottomSheetMaxHeight,
  bottomSheetDragThreshold,
  onClick,
  ...props
}: BottomSheetInputProps) {
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
        onClick={handleClick}
        endDecorator={<LuChevronDown />}
        isFocusEffect={false}
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
