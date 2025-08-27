import { addMonths, format, isValid, parse, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';

export function useDatePicker({
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
