import { useState } from 'react';

import { DayCalendar } from './day-calendar.tsx';
import { MonthCalendar } from './month-calendar.tsx';
import { YearCalendar } from './year-calendar.tsx';
import type { DatePickerMode, PickerProps } from '../model/picker-type.ts';

export function Calendar(props: PickerProps) {
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
