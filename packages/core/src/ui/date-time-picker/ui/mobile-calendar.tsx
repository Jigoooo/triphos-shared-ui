import { useEffect, useState } from 'react';

import { DayCalendar } from './day-calendar.tsx';
import { MonthCalendar } from './month-calendar.tsx';
import { YearCalendar } from './year-calendar.tsx';
import { type DatePickerMode, type MobilePickerProps } from '../model/picker-type.ts';

export function MobileCalendar({
  mode,
  value,
  onChange,
  minDate,
  maxDate,
  closeDatePicker,
}: MobilePickerProps) {
  const [displayMode, setDisplayMode] = useState<DatePickerMode>(mode);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(value ?? new Date());

  useEffect(() => {
    setInternalCurrentDate(selectedDate ?? new Date());
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    closeDatePicker();

    if (onChange) {
      onChange(date);
    }
    setSelectedDate(date);
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

  switch (displayMode) {
    case 'year':
      return <YearCalendar {...enhancedProps} />;
    case 'month':
      return <MonthCalendar {...enhancedProps} />;
    case 'day':
    default:
      return <DayCalendar {...enhancedProps} />;
  }
}
