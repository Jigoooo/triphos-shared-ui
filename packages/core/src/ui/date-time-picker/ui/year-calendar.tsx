import { addYears, getYear, isSameYear, setYear, subYears } from 'date-fns';

import { CalendarNextButton } from './calendar-next-button.tsx';
import { CalendarPrevButton } from './calendar-prev-button.tsx';
import type { DatePickerMode, PickerProps } from '../model/picker-type.ts';
import { zIndex } from '@/constants';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function YearCalendar({
  mode,
  setFloating,
  floatingStyles,
  getFloatingProps,
  selectedDate,
  currentDate,
  minDate,
  maxDate,
  setDisplayMode,
  handleNavigationDateChange,
  handleSelection,
}: PickerProps & {
  setDisplayMode: (mode: DatePickerMode) => void;
  handleNavigationDateChange?: (date: Date) => void;
  handleSelection?: (date: Date) => void;
}) {
  const { theme } = useThemeContext();

  const currentYear = currentDate.getFullYear();
  const startYear = Math.floor(currentYear / 12) * 12;

  const handlePrevYears = () => {
    const newDate = subYears(currentDate, 12);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handleNextYears = () => {
    const newDate = addYears(currentDate, 12);
    if (handleNavigationDateChange) {
      handleNavigationDateChange(newDate);
    }
  };

  const handleYearClick = (year: number) => {
    const newDate = setYear(currentDate, year);

    if (handleSelection) {
      handleSelection(newDate);
    }

    // Navigate to appropriate view based on external mode
    if (mode === 'day') {
      setDisplayMode('month');
    } else if (mode === 'month') {
      setDisplayMode('month');
    }
    // If mode === 'year', handleSelection will close the picker
  };

  let disablePrev = false;
  let disableNext = false;

  const minYear = minDate ? getYear(minDate) : undefined;
  const maxYear = maxDate ? getYear(maxDate) : undefined;

  if (minYear !== undefined && startYear <= minYear) {
    disablePrev = true;
  }
  if (maxYear !== undefined && startYear + 11 >= maxYear) {
    disableNext = true;
  }

  const isYearDisabled = (year: number) => {
    if (minYear !== undefined && year < minYear) {
      return true;
    }

    return maxYear !== undefined && year > maxYear;
  };

  const isYearSelected = (year: number) => {
    if (!selectedDate) return false;
    return isSameYear(setYear(currentDate, year), selectedDate);
  };

  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

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
          minWidth: '17.5rem',
        },
        ...floatingStyles,
      }}
      {...getFloatingProps()}
    >
      <FlexRow
        style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
      >
        <CalendarPrevButton onPrev={handlePrevYears} disablePrev={disablePrev} />
        <Typography style={{ fontSize: '0.96rem', fontWeight: 600, lineHeight: 2 }}>
          {`${startYear} - ${startYear + 11}`}
        </Typography>
        <CalendarNextButton onNext={handleNextYears} disableNext={disableNext} />
      </FlexRow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {years.map((year) => {
          const isDisabled = isYearDisabled(year);
          const isSelected = isYearSelected(year);

          const borderRadius = '0.5rem';
          const backgroundColor = isSelected ? theme.colors.primary[500] : 'transparent';
          const textColor = isSelected ? '#ffffff' : isDisabled ? '#cccccc' : '#333333';

          return (
            <div
              key={year}
              onClick={() => {
                if (!isDisabled) {
                  handleYearClick(year);
                }
              }}
              style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDisabled ? undefined : 'pointer',
                borderRadius,
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
              {year}
            </div>
          );
        })}
      </div>
    </div>
  );
}
