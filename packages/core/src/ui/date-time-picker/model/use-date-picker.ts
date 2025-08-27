import { useEffect, useState } from 'react';

export function useDatePicker({
  date,
  onChange,
}: {
  date?: Date;
  onChange?: (value: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ?? null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(date ?? null);
  }, [date]);

  useEffect(() => {
    if (!showDatePicker) {
      setCurrentDate(selectedDate || new Date());
    }
  }, [selectedDate, showDatePicker]);

  const handleDateClick = (date: Date) => {
    setShowDatePicker(false);
    if (onChange) {
      onChange(date);
    }
    setSelectedDate(date);
  };

  return {
    selectedDate,
    showDatePicker,
    setShowDatePicker,
    currentDate,
    handleDateClick,
  };
}
