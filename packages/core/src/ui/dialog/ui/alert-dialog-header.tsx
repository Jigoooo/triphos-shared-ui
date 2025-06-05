import { FlexRow, Typography } from '@/ui/view';

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
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: isEmptyContents ? '0.5rem' : 0,
      }}
    >
      <Typography style={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'pre-line' }}>
        {title}
      </Typography>
    </FlexRow>
  );
}
