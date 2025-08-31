import { format, subDays } from 'date-fns';

import { LuCalendar } from 'react-icons/lu';

import { MobileCalendar } from './mobile-calendar.tsx';
import { getDefaultDateFormat } from '../lib/get-default-date-format.ts';
import { type MobileDatePickerProps } from '../model/picker-type.ts';
import { useBottomSheet } from '@/ui/bottom-sheet';
import { OutlinedInput } from '@/ui/input';
import { FlexColumn, FlexRow } from '@/ui/layout';

export function MobileDatePicker({
  mode = 'day',
  value,
  onChange,
  dateFormat,
  minDate,
  maxDate,
  style,
  endDecorator,
  ...props
}: MobileDatePickerProps) {
  const applyDateFormat = getDefaultDateFormat(mode, dateFormat);
  const inputSelectedDateString = value ? format(value, applyDateFormat) : '';

  const mobileDatePickerBottomSheet = useBottomSheet();
  const openMobileDatePickerBottomSheet = () => {
    return mobileDatePickerBottomSheet.open(({ close }) => {
      return (
        <MobileCalendar
          mode={mode}
          value={value}
          onChange={onChange}
          minDate={mode === 'day' && minDate ? subDays(minDate, 1) : minDate}
          maxDate={maxDate}
          closeDatePicker={close}
        />
      );
    });
  };

  return (
    <FlexColumn>
      <OutlinedInput
        style={{
          cursor: 'pointer',
          ...style,
        }}
        value={inputSelectedDateString}
        onClick={openMobileDatePickerBottomSheet}
        readOnly
        endDecorator={
          !endDecorator ? (
            <FlexRow style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <LuCalendar style={{ fontSize: '1.1rem' }} />
            </FlexRow>
          ) : (
            endDecorator
          )
        }
        {...props}
      />
    </FlexColumn>
  );
}
