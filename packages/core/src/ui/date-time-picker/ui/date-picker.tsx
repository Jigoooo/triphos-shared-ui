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
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isValid,
  parse,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useHandleClickOutsideRef } from 'hooks';
import { type CSSProperties, type HTMLProps, useEffect, useState } from 'react';

import { LuCalendar, LuMoveLeft, LuMoveRight } from 'react-icons/lu';

import { DateInputField } from './date-input-field.tsx';
import type { DatePickerProps } from '../model/picker-type.ts';
import { zIndex } from '@/constants';
import { useThemeContext } from '@/theme';
import { Button } from '@/ui/button';
import { OutlinedInput } from '@/ui/input';
import { FlexColumn, FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

// 헬퍼: 달력에 표시할 날짜 배열 생성
function generateDaysArray(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const daysInMonth = eachDayOfInterval({ start, end });
  const startPaddingDays = Array.from({ length: getDay(start) })
    .map((_, index) => subDays(start, index + 1))
    .reverse();
  const endPaddingDays = Array.from({ length: 6 - getDay(end) }).map((_, index) =>
    addDays(end, index + 1),
  );
  return [...startPaddingDays, ...daysInMonth, ...endPaddingDays];
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜 피커 훅 (선택 날짜, 현재 표시 월 등 관리)
function useDatePicker({
  dateString,
  onChange,
  dateFormat,
}: {
  dateString?: string;
  onChange?: (dateString: string) => void;
  dateFormat: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dateString && isValid(parse(dateString, dateFormat, new Date()))
      ? parse(dateString, dateFormat, new Date())
      : null,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (dateString && isValid(parse(dateString, dateFormat, new Date()))) {
      setSelectedDate(parse(dateString, dateFormat, new Date()));
    }
  }, [dateString, dateFormat]);

  useEffect(() => {
    if (!showDatePicker) {
      setCurrentDate(selectedDate || new Date());
    }
  }, [selectedDate, showDatePicker]);

  const handleDateClick = (date: Date) => {
    setShowDatePicker(false);
    if (onChange) {
      onChange(format(date, dateFormat));
    }
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return {
    selectedDate,
    showDatePicker,
    setShowDatePicker,
    currentDate,
    handleDateClick,
    handlePrevMonth,
    handleNextMonth,
  };
}

type PickerProps = {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  handleDateClick: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  selectedDate: Date | null;
  currentDate: Date;
  minDate?: Date;
  maxDate?: Date;
};

// 날짜 셀의 스타일 계산 헬퍼 함수들
function getCellBorderRadius(day: Date | null, selectedDate: Date | null): number {
  if (!day) return 0;
  return selectedDate && selectedDate.toDateString() === day.toDateString() ? 6 : 0;
}
function getCellBackgroundColor(
  day: Date | null,
  selectedDate: Date | null,
  color: string,
): string {
  if (!day) return 'transparent';
  return selectedDate && selectedDate.toDateString() === day.toDateString() ? color : '#ffffff';
}
function getCellTextColor(
  day: Date | null,
  selectedDate: Date | null,
  isCurrentMonth: boolean,
  isDisabled: boolean,
): string {
  if (!day) return 'transparent';
  if (isDisabled) return 'grey';
  if (selectedDate && selectedDate.toDateString() === day.toDateString()) return 'white';
  return isCurrentMonth ? '#333333' : 'lightgrey';
}

// Picker 컴포넌트: 달력 렌더링
function Picker({
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

export function DatePicker({
  strategy = 'absolute',
  placement = 'bottom-start',
  width = 'auto',
  isInputMode = false,
  dateString,
  onChange,
  dateFormat = 'yyyy-MM-dd',
  minDate,
  maxDate,
  openListener,
  InputComponent,
  endDecorator,
  containerStyle,
  inputStyle,
}: DatePickerProps) {
  const {
    selectedDate,
    showDatePicker,
    setShowDatePicker,
    currentDate,
    handleDateClick,
    handlePrevMonth,
    handleNextMonth,
  } = useDatePicker({ dateString, onChange, dateFormat });
  const datePickerRef = useHandleClickOutsideRef({
    condition: showDatePicker,
    outsideClickAction: () => {
      if (strategy === 'absolute') {
        setShowDatePicker(false);
      }
    },
  });

  useEffect(() => {
    if (openListener) {
      openListener(showDatePicker);
    }
  }, [openListener, showDatePicker]);

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
            minWidth: `${Math.min(rects.reference.width, 260)}px`,
            maxWidth: '350px',
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
  const inputSelectedDateString = selectedDate ? format(selectedDate, dateFormat) : '';

  return (
    <FlexColumn ref={datePickerRef} style={{ position: 'relative', width, ...containerStyle }}>
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
                width: width !== 'auto' ? width : '10rem',
                cursor: 'pointer',
                ...inputStyle,
              }}
              value={inputSelectedDateString}
              onClick={handleInputClick}
              readOnly
              endDecorator={
                !endDecorator ? (
                  <FlexRow
                    style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <LuCalendar style={{ fontSize: '1.1rem' }} />
                  </FlexRow>
                ) : (
                  endDecorator
                )
              }
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
            <Picker
              setFloating={refs.setFloating}
              floatingStyles={floatingStyles}
              getFloatingProps={getFloatingProps}
              handleDateClick={handleDateClick}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              selectedDate={selectedDate}
              currentDate={currentDate}
              minDate={minDate ? subDays(minDate, 1) : undefined}
              maxDate={maxDate}
            />
          </FloatingPortal>
        ) : (
          <Picker
            setFloating={refs.setFloating}
            floatingStyles={floatingStyles}
            getFloatingProps={getFloatingProps}
            handleDateClick={handleDateClick}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            selectedDate={selectedDate}
            currentDate={currentDate}
            minDate={minDate ? subDays(minDate, 1) : undefined}
            maxDate={maxDate}
          />
        ))}
    </FlexColumn>
  );
}
