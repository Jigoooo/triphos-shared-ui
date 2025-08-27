import { addMonths, format, isAfter, isBefore, startOfMonth, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

import { LuMoveLeft, LuMoveRight } from 'react-icons/lu';

import {
  getCellBackgroundColor,
  getCellBorderRadius,
  getCellTextColor,
} from '../config/date-picker-style.ts';
import { generateDaysArray } from '../lib/generate-days-array.ts';
import type { PickerProps } from '../model/picker-type.ts';
import { zIndex } from '@/constants';
import { useThemeContext } from '@/theme';
import { Button } from '@/ui/button';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
export function Calendar({
  // mode,
  setFloating,
  floatingStyles,
  getFloatingProps,
  handleDateClick,
  handlePrevMonth,
  handleNextMonth,
  selectedDate,
  currentDate,
  minDate,
  maxDate,
}: PickerProps) {
  const { theme } = useThemeContext();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = generateDaysArray(year, month);
  const isSameMonth = (date: Date) => date.getMonth() === month;

  const handlePaddingDateClick = (date: Date) => {
    if (isBefore(date, startOfMonth(new Date(year, month)))) {
      handlePrevMonth();
    } else {
      handleNextMonth();
    }
    handleDateClick(date);
  };

  let disablePrev = false;
  let disableNext = false;
  if (minDate && isBefore(subMonths(currentDate, 1), minDate)) {
    disablePrev = true;
  }
  if (maxDate && isAfter(addMonths(currentDate, 1), maxDate)) {
    disableNext = true;
  }

  return (
    <div
      ref={setFloating}
      style={{
        ...{
          marginTop: 8,
          paddingBlock: 12,
          paddingInline: 10,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          zIndex: zIndex.datePicker,
        },
        ...floatingStyles,
      }}
      {...getFloatingProps()}
    >
      <FlexRow style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Button.Outlined
          style={{ height: 30, paddingInline: 6, color: '#bbbbbb', borderColor: '#e4e4e4' }}
          onClick={handlePrevMonth}
          disabled={disablePrev}
        >
          <LuMoveLeft style={{ fontSize: '1rem', color: disablePrev ? '#cccccc' : '#666666' }} />
        </Button.Outlined>
        <Typography style={{ fontSize: '0.96rem', fontWeight: 600, lineHeight: 2 }}>
          {format(currentDate, 'yyyy년 MMMM', { locale: ko })}
        </Typography>
        <Button.Outlined
          style={{ height: 30, paddingInline: 6, color: '#bbbbbb', borderColor: '#e4e4e4' }}
          onClick={handleNextMonth}
          disabled={disableNext}
        >
          <LuMoveRight style={{ fontSize: '1rem', color: disableNext ? 'lightgrey' : '#666666' }} />
        </Button.Outlined>
      </FlexRow>
      <FlexRow style={{ width: '100%', justifyContent: 'space-around', marginBottom: 8 }}>
        {weekDays.map((day) => (
          <div key={day}>
            <Typography style={{ fontSize: '1rem', fontWeight: 700 }}>{day}</Typography>
          </div>
        ))}
      </FlexRow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map((day, index) => {
          const isDisabled =
            !!day &&
            ((minDate ? isBefore(day, minDate) : false) ||
              (maxDate ? isAfter(day, maxDate) : false));
          const currentMonth = !!day && isSameMonth(day);
          const borderRadius = getCellBorderRadius(day, selectedDate);
          const backgroundColor = getCellBackgroundColor(
            day,
            selectedDate,
            theme.colors.primary[500],
          );
          const textColor = getCellTextColor(day, selectedDate, currentMonth, isDisabled);
          return (
            <div key={index} style={{ gridColumn: 'span 1', aspectRatio: '1' }}>
              <div
                onClick={() => {
                  if (day && !isDisabled) {
                    if (currentMonth) {
                      handleDateClick(day);
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
                }}
              >
                {day ? format(day, 'd') : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
