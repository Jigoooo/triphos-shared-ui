import {
  flip,
  FloatingOverlay,
  FloatingPortal,
  offset,
  size,
  useClick,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { format, subDays } from 'date-fns';
import { useHandleClickOutsideRef } from 'hooks';
import { useEffect } from 'react';

import { LuCalendar } from 'react-icons/lu';

import { Calendar } from './calendar.tsx';
import { DateInputField } from './date-input-field.tsx';
import { getDefaultDateFormat } from '../lib/get-default-date-format.ts';
import type { DatePickerProps } from '../model/picker-type.ts';
import { useDatePicker } from '../model/use-date-picker.ts';
import { zIndex } from '@/constants';
import { OutlinedInput } from '@/ui/input';
import { FlexColumn } from '@/ui/layout';

export function DatePicker({
  mode = 'day',
  strategy = 'absolute',
  placement = 'bottom-start',
  isInputMode = false,
  value,
  onChange,
  dateFormat,
  minDate,
  maxDate,
  onOpen,
  InputComponent,
  endDecorator,
  containerStyle,
  inputStyle,
}: DatePickerProps) {
  const applyDateFormat = getDefaultDateFormat(mode, dateFormat);

  const { selectedDate, showDatePicker, setShowDatePicker, currentDate, handleDateClick } =
    useDatePicker({ date: value, onChange });
  const datePickerRef = useHandleClickOutsideRef({
    condition: showDatePicker,
    outsideClickAction: () => {
      if (strategy === 'absolute') {
        setShowDatePicker(false);
      }
    },
  });

  useEffect(() => {
    if (onOpen) {
      onOpen(showDatePicker);
    }
  }, [onOpen, showDatePicker]);

  const { refs, floatingStyles, context } = useFloating({
    open: showDatePicker,
    onOpenChange: setShowDatePicker,
    strategy,
    placement,
    transform: false,
    middleware: [
      offset({
        mainAxis: 4,
      }),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${Math.min(Math.max(rects.reference.width, 280), 330)}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const handleInputClick = () => setShowDatePicker((prev) => !prev);
  const inputSelectedDateString = selectedDate ? format(selectedDate, applyDateFormat) : '';

  return (
    <FlexColumn ref={datePickerRef} style={{ position: 'relative', ...containerStyle }}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {!isInputMode ? (
          InputComponent ? (
            InputComponent({
              dateString: inputSelectedDateString,
              openDatePicker: handleInputClick,
            })
          ) : (
            <OutlinedInput
              style={{
                cursor: 'pointer',
                ...inputStyle,
              }}
              value={inputSelectedDateString}
              onClick={handleInputClick}
              readOnly
              endDecorator={!endDecorator ? <LuCalendar /> : endDecorator}
            />
          )
        ) : (
          <DateInputField
            selectedDate={selectedDate}
            handleDateClick={handleDateClick}
            handleInputClick={handleInputClick}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
      </div>
      {showDatePicker &&
        (strategy === 'fixed' ? (
          <FloatingPortal>
            <FloatingOverlay
              lockScroll
              style={{ zIndex: zIndex.anchorOverlay }}
              onClick={() => setShowDatePicker(false)}
            />
            <Calendar
              mode={mode}
              setFloating={refs.setFloating}
              floatingStyles={floatingStyles}
              getFloatingProps={getFloatingProps}
              handleDateClick={handleDateClick}
              selectedDate={selectedDate}
              currentDate={currentDate}
              minDate={mode === 'day' && minDate ? subDays(minDate, 1) : minDate}
              maxDate={maxDate}
            />
          </FloatingPortal>
        ) : (
          <Calendar
            mode={mode}
            setFloating={refs.setFloating}
            floatingStyles={floatingStyles}
            getFloatingProps={getFloatingProps}
            handleDateClick={handleDateClick}
            selectedDate={selectedDate}
            currentDate={currentDate}
            minDate={mode === 'day' && minDate ? subDays(minDate, 1) : minDate}
            maxDate={maxDate}
          />
        ))}
    </FlexColumn>
  );
}
