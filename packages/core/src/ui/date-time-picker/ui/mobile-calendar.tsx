import { useEffect, useState } from 'react';

import { DayCalendar } from './day-calendar.tsx';
import { MonthCalendar } from './month-calendar.tsx';
import { YearCalendar } from './year-calendar.tsx';
import {
  type CalendarProps,
  type DatePickerMode,
  type MobilePickerProps,
} from '../model/picker-type.ts';

export function MobileCalendar({
  mode,
  initialValue,
  onChange,
  minDate,
  maxDate,
}: MobilePickerProps) {
  const [displayMode, setDisplayMode] = useState<DatePickerMode>(mode);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialValue ?? null);
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(initialValue ?? new Date());

  useEffect(() => {
    setInternalCurrentDate(selectedDate ?? new Date());
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

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
    mode,
    minDate,
    maxDate,
    selectedDate,
    currentDate: internalCurrentDate,
    handleNavigationDateChange,
    handleSelection,
    displayMode,
    setDisplayMode,
  };

  return (
    <div
      style={{
        padding: '1.2rem',
        maxWidth: '25rem',
        maxHeight: 'calc(100vh - 6.25rem)',
        margin: '0 auto',
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
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
