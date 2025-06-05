import { toast } from 'sonner';

import type { TEditCell } from '../model/table-type.ts';
import { createValidator } from '@/lib/lib';
import { Input } from '@/lib/ui';

export function InputNumberEditCell<TData>({
  inputRef,
  cellData,
  setCellData,
  tableStyle,
  exitEditMode,
}: TEditCell<TData>) {
  return (
    <Input.Outlined
      ref={inputRef}
      style={{
        height: tableStyle.tableHeaderHeight,
        fontSize: '0.8rem',
        width: '100%',
        borderRadius: 0,
        boxShadow: 'none',
      }}
      value={cellData ?? ''}
      onChange={(event) => {
        const valueWithValidated = createValidator(event.target.value)
          .isNumber({ message: '숫자만 입력할 수 있습니다.' })
          .validate();

        if (valueWithValidated.error) {
          toast.error(valueWithValidated.errorMessage);
          return;
        }

        setCellData(Number(valueWithValidated.value));
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          exitEditMode();
        }
      }}
    />
  );
}
