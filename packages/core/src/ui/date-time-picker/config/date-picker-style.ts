export function getCellBorderRadius(day: Date | null, selectedDate: Date | null): number {
  if (!day) return 0;
  return selectedDate && selectedDate.toDateString() === day.toDateString() ? 6 : 0;
}

export function getCellBackgroundColor(
  day: Date | null,
  selectedDate: Date | null,
  color: string,
): string {
  if (!day) return 'transparent';
  return selectedDate && selectedDate.toDateString() === day.toDateString() ? color : '#ffffff';
}

export function getCellTextColor(
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
