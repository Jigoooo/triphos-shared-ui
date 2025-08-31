import {
  addMonths,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo } from 'react';

import { CalendarNextButton } from './calendar-next-button.tsx';
import { CalendarPrevButton } from './calendar-prev-button.tsx';
import {
  getCellBackgroundColor,
  getCellBorderRadius,
  getCellTextColor,
} from '../config/date-picker-style.ts';
import { generateDaysArray } from '../lib/generate-days-array.ts';
import { type CalendarProps } from '../model/picker-type.ts';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function DayCalendar({
  selectedDate,
  currentDate,
  minDate,
  maxDate,
  setDisplayMode,
  handleNavigationDateChange,
  handleSelection,
}: CalendarProps) {
  const { theme } = useThemeContext();

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { locale: ko });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      days.push(format(date, 'EEEEE', { locale: ko }));
    }
    return days;
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = generateDaysArray(year, month);
  const isSameMonth = (date: Date) => date.getMonth() === month;

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handlePaddingDateClick = (date: Date) => {
    if (isBefore(date, startOfMonth(new Date(year, month)))) {
      handlePrevMonth();
    } else {
      handleNextMonth();
    }
    handleSelection(date);
  };

  let disablePrev = false;
  let disableNext = false;

  if (minDate) {
    const prevMonth = subMonths(currentDate, 1);
    const lastDayOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);
    if (isBefore(lastDayOfPrevMonth, minDate)) {
      disablePrev = true;
    }
  }

  if (maxDate) {
    const nextMonth = addMonths(currentDate, 1);
    const firstDayOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    if (isAfter(firstDayOfNextMonth, maxDate)) {
      disableNext = true;
    }
  }

  return (
    <>
      <FlexRow
        style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
      >
        <CalendarPrevButton onPrev={handlePrevMonth} disablePrev={disablePrev} />
        <Typography
          style={{ fontSize: '0.96rem', fontWeight: 600, lineHeight: 2, cursor: 'pointer' }}
          onClick={() => setDisplayMode('month')}
        >
          {format(currentDate, 'yyyy년 MMMM', { locale: ko })}
        </Typography>
        <CalendarNextButton onNext={handleNextMonth} disableNext={disableNext} />
      </FlexRow>
      <FlexRow style={{ width: '100%', justifyContent: 'space-around', marginBottom: '0.5rem' }}>
        {weekDays.map((day, index) => (
          <div key={index}>
            <Typography style={{ fontSize: '1rem', fontWeight: 700 }}>{day}</Typography>
          </div>
        ))}
      </FlexRow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map((day, index) => {
          const isSelected = !!selectedDate && isSameDay(day, selectedDate);
          const isDisabled =
            !!day &&
            ((minDate ? isBefore(day, minDate) : false) ||
              (maxDate ? isAfter(day, maxDate) : false));
          const isCurrentMonth = !!day && isSameMonth(day);
          const borderRadius = getCellBorderRadius(day, selectedDate);
          const backgroundColor = getCellBackgroundColor(
            day,
            selectedDate,
            theme.colors.primary[500],
          );
          const textColor = getCellTextColor(day, selectedDate, isCurrentMonth, isDisabled);

          return (
            <div key={index} style={{ gridColumn: 'span 1', aspectRatio: '1' }}>
              <div
                onClick={() => {
                  if (day && !isDisabled) {
                    if (isCurrentMonth) {
                      handleSelection(day);
                    } else {
                      handlePaddingDateClick(day);
                    }
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: day && !isDisabled ? 'pointer' : undefined,
                  borderRadius,
                  backgroundColor,
                  color: textColor,
                  position: 'relative',
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? 700 : !isDisabled ? 500 : 400,
                }}
              >
                {day ? format(day, 'd') : ''}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
