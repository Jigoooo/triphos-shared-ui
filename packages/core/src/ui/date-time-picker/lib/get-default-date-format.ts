import { type DatePickerMode } from '../model/picker-type';

export function getDefaultDateFormat(mode: DatePickerMode, inputDateFormat?: string) {
  if (inputDateFormat) {
    return inputDateFormat;
  }

  switch (mode) {
    case 'day':
      return 'yyyy-MM-dd';
    case 'month':
      return 'yyyy-MM';
    case 'year':
      return 'yyyy';
    default:
      return 'yyyy-MM-dd';
  }
}
