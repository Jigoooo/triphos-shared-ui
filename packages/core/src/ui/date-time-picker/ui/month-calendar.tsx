import {
  addYears,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  isSameYear,
  setMonth,
  startOfMonth,
  subYears,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo } from 'react';

import { CalendarNextButton } from './calendar-next-button.tsx';
import { CalendarPrevButton } from './calendar-prev-button.tsx';
import { type CalendarProps } from '../model/picker-type.ts';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function MonthCalendar({
  mode,
  selectedDate,
  currentDate,
  minDate,
  maxDate,
  setDisplayMode,
  handleNavigationDateChange,
  handleSelection,
}: CalendarProps) {
  const { theme } = useThemeContext();

  const months = useMemo(() => {
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i, 1);
      monthNames.push(format(date, 'MMM', { locale: ko }));
    }
    return monthNames;
  }, []);

  const handlePrevYear = () => {
    const newDate = subYears(currentDate, 1);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handleNextYear = () => {
    const newDate = addYears(currentDate, 1);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handleMonthClick = (monthIndex: number) => {
    const newDate = setMonth(currentDate, monthIndex);

    handleSelection(newDate);

    // If the external mode is 'day', navigate to day view after selecting month
    if (mode === 'day') {
      setDisplayMode('day');
    }
    // If mode === 'month', handleSelection will close the picker
  };

  let disablePrev = false;
  let disableNext = false;

  if (minDate && isBefore(subYears(currentDate, 1), startOfMonth(minDate))) {
    disablePrev = true;
  }
  if (maxDate && isAfter(addYears(currentDate, 1), startOfMonth(maxDate))) {
    disableNext = true;
  }

  const isMonthDisabled = (monthIndex: number) => {
    const targetDate = setMonth(currentDate, monthIndex);

    if (minDate && isBefore(targetDate, startOfMonth(minDate))) {
      return true;
    }
    if (maxDate && isAfter(targetDate, startOfMonth(maxDate))) {
      return true;
    }
    return false;
  };

  const isMonthSelected = (monthIndex: number) => {
    if (!selectedDate) return false;
    const targetDate = setMonth(currentDate, monthIndex);
    return isSameMonth(targetDate, selectedDate) && isSameYear(targetDate, selectedDate);
  };

  return (
    <>
      <FlexRow
        style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
      >
        <CalendarPrevButton onPrev={handlePrevYear} disablePrev={disablePrev} />
        <Typography
          style={{ fontSize: '0.96rem', fontWeight: 600, lineHeight: 2, cursor: 'pointer' }}
          onClick={() => setDisplayMode('year')}
        >
          {format(currentDate, 'yyyy년', { locale: ko })}
        </Typography>
        <CalendarNextButton onNext={handleNextYear} disableNext={disableNext} />
      </FlexRow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {months.map((month, index) => {
          const isDisabled = isMonthDisabled(index);
          const isSelected = isMonthSelected(index);

          const backgroundColor = isSelected ? theme.colors.primary[500] : 'transparent';
          const textColor = isSelected ? '#ffffff' : isDisabled ? '#cccccc' : '#333333';

          return (
            <div
              key={month}
              onClick={() => {
                if (!isDisabled) {
                  handleMonthClick(index);
                }
              }}
              style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDisabled ? undefined : 'pointer',
                borderRadius: '0.5rem',
                backgroundColor,
                color: textColor,
                fontSize: '0.9rem',
                fontWeight: isSelected ? 600 : 400,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {month}
            </div>
          );
        })}
      </div>
    </>
  );
}
