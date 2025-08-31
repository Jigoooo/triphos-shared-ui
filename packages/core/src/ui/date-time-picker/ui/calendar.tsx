import { useState } from 'react';

import { DayCalendar } from './day-calendar.tsx';
import { MonthCalendar } from './month-calendar.tsx';
import { YearCalendar } from './year-calendar.tsx';
import { type CalendarProps, type DatePickerMode, type PickerProps } from '../model/picker-type.ts';
import { zIndex } from '@/constants';

export function Calendar({ setFloating, floatingStyles, getFloatingProps, ...props }: PickerProps) {
  const { mode, currentDate, handleDateClick } = props;

  const [displayMode, setDisplayMode] = useState<DatePickerMode>(mode);
  const [internalCurrentDate, setInternalCurrentDate] = useState(currentDate);

  const handleNavigationDateChange = (date: Date) => {
    setInternalCurrentDate(date);
  };

  const handleSelection = (date: Date) => {
    setInternalCurrentDate(date);

    const shouldClose = displayMode === mode;
    if (shouldClose) {
      handleDateClick(date);
    }
  };

  const enhancedProps = {
    ...props,
    currentDate: internalCurrentDate,
    handleNavigationDateChange,
    handleSelection,
    displayMode,
    setDisplayMode,
  };

  return (
    <div
      ref={setFloating}
      style={{
        ...{
          marginTop: '0.5rem',
          paddingBlock: '0.75rem',
          paddingInline: '0.625rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.625rem',
          boxShadow: '0 0.125rem 0.625rem rgba(0, 0, 0, 0.2)',
          zIndex: zIndex.datePicker,
        },
        ...floatingStyles,
      }}
      {...getFloatingProps()}
    >
      <SwitchCalendar {...enhancedProps} />
    </div>
  );
}

function SwitchCalendar({
  displayMode,
  ...props
}: CalendarProps & { displayMode: DatePickerMode }) {
  switch (displayMode) {
    case 'year':
      return <YearCalendar {...props} />;
    case 'month':
      return <MonthCalendar {...props} />;
    case 'day':
    default:
      return <DayCalendar {...props} />;
  }
}
