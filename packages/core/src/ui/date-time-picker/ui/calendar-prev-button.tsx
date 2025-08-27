import { LuChevronLeft } from 'react-icons/lu';

import { OutlinedButton } from '@/ui/button';

export function CalendarPrevButton({
  onPrev,
  disablePrev,
}: {
  onPrev: () => void;
  disablePrev: boolean;
}) {
  return (
    <OutlinedButton
      style={{
        height: '1.875rem',
        paddingInline: '0.375rem',
        color: '#bbbbbb',
        borderColor: '#e4e4e4',
      }}
      disabledStyle={{
        opacity: 1,
      }}
      onClick={onPrev}
      disabled={disablePrev}
    >
      <LuChevronLeft style={{ fontSize: '1rem', color: disablePrev ? '#bbbbbb' : '#666666' }} />
    </OutlinedButton>
  );
}
