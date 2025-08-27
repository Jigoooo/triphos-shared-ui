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
        borderColor: '#bbbbbb',
        backgroundColor: '#ffffff',
      }}
      disabledStyle={{
        opacity: 1,
      }}
      onClick={onPrev}
      disabled={disablePrev}
    >
      <LuChevronLeft style={{ fontSize: '1rem', color: disablePrev ? '#bbbbbb' : '#555555' }} />
    </OutlinedButton>
  );
}
