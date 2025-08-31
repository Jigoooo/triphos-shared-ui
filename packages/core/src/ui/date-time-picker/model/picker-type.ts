import type { Placement, Strategy } from '@floating-ui/react';
import type { CSSProperties, HTMLProps, ReactNode } from 'react';

import { type InputProps } from '@/ui/input';

export type TimePart = 'hours' | 'minutes' | 'seconds';

export type DatePickerMode = 'year' | 'month' | 'day';

type BaseDatePickerProps = {
  mode?: DatePickerMode;
  value?: Date;
  onChange?: (value: Date) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
};

export type DatePickerProps = BaseDatePickerProps & {
  style?: CSSProperties;
  strategy?: Strategy;
  placement?: Placement;
  width?: number | string;
  isInputMode?: boolean;
  onOpen?: (isShowDatePicker: boolean) => void;
  endDecorator?: ReactNode;
  containerStyle?: CSSProperties;
  InputComponent?: ({
    dateString,
    openDatePicker,
  }: {
    dateString: string;
    openDatePicker: () => void;
  }) => ReactNode;
};

export type MobileDatePickerProps = InputProps & BaseDatePickerProps;

type BasePickerProps = {
  mode: DatePickerMode;
  minDate?: Date;
  maxDate?: Date;
};

export type PickerProps = BasePickerProps & {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  handleDateClick: (date: Date) => void;
  selectedDate: Date | null;
  currentDate: Date;
};

export type MobilePickerProps = BasePickerProps & {
  value?: Date;
  onChange?: (value: Date) => void;
  closeDatePicker: () => void;
};

export type CalendarProps = Omit<
  PickerProps,
  'setFloating' | 'floatingStyles' | 'getFloatingProps' | 'handleDateClick'
> & {
  setDisplayMode: (mode: DatePickerMode) => void;
  handleNavigationDateChange?: (date: Date) => void;
  handleSelection: (date: Date) => void;
};
