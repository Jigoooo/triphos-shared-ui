import { useState } from 'react';

import { DayCalendar } from './day-calendar.tsx';
import { MonthCalendar } from './month-calendar.tsx';
import { YearCalendar } from './year-calendar.tsx';
import type { DatePickerMode, PickerProps } from '../model/picker-type.ts';

export function Calendar(props: PickerProps) {
  const { mode } = props;

  const [displayMode, setDisplayMode] = useState<DatePickerMode>(mode);

  switch (displayMode) {
    case 'year':
      return <YearCalendar setDisplayMode={setDisplayMode} {...props} />;
    case 'month':
      return <MonthCalendar setDisplayMode={setDisplayMode} {...props} />;
    case 'day':
    default:
      return <DayCalendar setDisplayMode={setDisplayMode} {...props} />;
  }
}
