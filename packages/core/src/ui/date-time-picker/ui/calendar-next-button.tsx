import { LuChevronRight } from 'react-icons/lu';

import { OutlinedButton } from '@/ui/button';

export function CalendarNextButton({
  onNext,
  disableNext,
}: {
  onNext: () => void;
  disableNext: boolean;
}) {
  return (
    <OutlinedButton
      style={{
        height: '1.875rem',
        paddingInline: '0.375rem',
        color: '#bbbbbb',
        borderColor: disableNext ? '#efefef' : '#dddddd',
        backgroundColor: disableNext ? '#efefef' : '#ffffff',
      }}
      disabledStyle={{
        opacity: 1,
      }}
      onClick={onNext}
      disabled={disableNext}
    >
      <LuChevronRight style={{ fontSize: '1rem', color: disableNext ? '#bbbbbb' : '#555555' }} />
    </OutlinedButton>
  );
}
