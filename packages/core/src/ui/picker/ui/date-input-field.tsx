import { useEffect, useState } from 'react';
import { format, isAfter, isBefore } from 'date-fns';

import { LuCalendar } from 'react-icons/lu';

import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';
import { Input } from '@/ui/input';

export function DateInputField({
  selectedDate,
  handleDateClick,
  handleInputClick,
  minDate,
  maxDate,
}: {
  selectedDate: Date | null;
  handleDateClick: (date: Date) => void;
  handleInputClick: () => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  // isInputMode 일 때: 연, 월, 일을 각각의 상태로 관리
  const [yearInput, setYearInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [dayInput, setDayInput] = useState('');

  // selectedDate가 바뀌면 각 input에 반영
  useEffect(() => {
    if (selectedDate) {
      setYearInput(format(selectedDate, 'yyyy'));
      setMonthInput(format(selectedDate, 'MM'));
      setDayInput(format(selectedDate, 'dd'));
    }
  }, [selectedDate]);

  // 모든 입력창이 blur될 때 날짜를 재구성
  const handleBlur = () => {
    const year = parseInt(yearInput, 10);
    const month = parseInt(monthInput, 10);
    const day = parseInt(dayInput, 10);

    if (month < 1 || month > 12) {
      if (selectedDate) {
        setMonthInput(format(selectedDate, 'MM'));
      }
      return;
    }

    const constructedDate = new Date(year, month - 1, day);
    if (
      constructedDate.getFullYear() !== year ||
      constructedDate.getMonth() !== month - 1 ||
      constructedDate.getDate() !== day
    ) {
      if (selectedDate) {
        setDayInput(format(selectedDate, 'dd'));
      }
      return;
    }

    if (maxDate && isAfter(constructedDate, maxDate)) {
      if (selectedDate) {
        setYearInput(format(selectedDate, 'yyyy'));
        setMonthInput(format(selectedDate, 'MM'));
        setDayInput(format(selectedDate, 'dd'));
      } else {
        setYearInput(format(new Date(), 'yyyy'));
        setMonthInput(format(new Date(), 'MM'));
        setDayInput(format(new Date(), 'dd'));
        handleDateClick(new Date());
      }
      return;
    }
    if (minDate && isBefore(constructedDate, minDate)) {
      if (selectedDate) {
        setYearInput(format(selectedDate, 'yyyy'));
        setMonthInput(format(selectedDate, 'MM'));
        setDayInput(format(selectedDate, 'dd'));
      } else {
        setYearInput(format(new Date(), 'yyyy'));
        setMonthInput(format(new Date(), 'MM'));
        setDayInput(format(new Date(), 'dd'));
        handleDateClick(new Date());
      }
      return;
    }

    handleDateClick(constructedDate);
  };

  return (
    <FlexRow
      style={{
        alignItems: 'center',
        width: '8.75rem',
        borderRadius: '0.25rem',
        height: '2.375rem',
        border: '1px solid #d9d9d9',
        paddingLeft: '0.25rem',
        paddingRight: '0.5rem',
        justifyContent: 'space-between',
      }}
    >
      <Input.Outlined
        style={{
          boxShadow: 'none',
          width: '2.5rem',
          textAlign: 'center',
          padding: 0,
        }}
        value={yearInput}
        onChange={(e) => setYearInput(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
        maxLength={4}
        isFocusEffect={false}
      />
      <Typography>-</Typography>
      <Input.Outlined
        style={{
          boxShadow: 'none',
          width: '1.25rem',
          textAlign: 'center',
          padding: 0,
        }}
        value={monthInput}
        onChange={(e) => setMonthInput(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
        maxLength={2}
        isFocusEffect={false}
      />
      <Typography>-</Typography>
      <Input.Outlined
        style={{
          boxShadow: 'none',
          width: '1.25rem',
          textAlign: 'center',
          padding: 0,
        }}
        value={dayInput}
        onChange={(e) => setDayInput(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
        maxLength={2}
        isFocusEffect={false}
      />
      <div style={{ width: 10 }} />
      <LuCalendar style={{ fontSize: '1.2rem' }} onClick={handleInputClick} />
    </FlexRow>
  );
}
