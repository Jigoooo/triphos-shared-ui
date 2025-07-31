import type { Placement, Strategy } from '@floating-ui/react';
import type { CSSProperties, ReactNode } from 'react';

export type TimePart = 'hours' | 'minutes' | 'seconds';

export type DatePickerProps = {
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
