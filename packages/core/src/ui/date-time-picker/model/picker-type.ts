import type { Placement, Strategy } from '@floating-ui/react';
import type { CSSProperties, HTMLProps, ReactNode } from 'react';

export type TimePart = 'hours' | 'minutes' | 'seconds';

export type DatePickerMode = 'year' | 'month' | 'day';

export type DatePickerProps = {
  mode?: DatePickerMode;
  strategy?: Strategy;
  placement?: Placement;
  width?: number | string;
  isInputMode?: boolean;
  dateString?: string;
  onChange?: (dateString: string) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  openListener?: (isShowDatePicker: boolean) => void;
  endDecorator?: ReactNode;
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  InputComponent?: ({
    dateString,
    openDatePicker,
  }: {
    dateString: string;
    openDatePicker: () => void;
  }) => ReactNode;
};

export type PickerProps = {
  mode: DatePickerMode;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  handleDateClick: (date: Date) => void;
  selectedDate: Date | null;
  currentDate: Date;
  minDate?: Date;
  maxDate?: Date;
};
