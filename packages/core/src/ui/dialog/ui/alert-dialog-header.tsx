import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function AlertDialogHeader({
  title,
  isEmptyContents,
}: {
  title?: string;
  isEmptyContents: boolean;
}) {
  return (
    <FlexRow
      style={{
        gap: '0.25rem',
        width: '100%',
        alignItems: 'center',
        marginBottom: isEmptyContents ? '0.7rem' : 0,
      }}
    >
      <Typography style={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'pre-line' }}>
        {title}
      </Typography>
    </FlexRow>
  );
}
