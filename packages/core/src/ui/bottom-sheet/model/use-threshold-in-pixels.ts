import { useRootRemPx } from '@/hooks';

type Target = { offsetHeight: number } | null | undefined;

export function useThresholdInPixels(threshold: string | number, sheetEl?: Target) {
  const remPx = useRootRemPx(16);

  if (typeof threshold === 'number') return threshold;

  const trimmed = threshold.trim();
  const value = parseFloat(trimmed);
  const unit = trimmed.replace(/[0-9.-]/g, ''); // "%", "rem", "px" 또는 ""

  if (unit === '%') {
    if (sheetEl?.offsetHeight != null) {
      return (sheetEl.offsetHeight * value) / 100;
    }
    return 0; // 기준 없으면 보수적 fallback
  }

  if (unit === 'rem') {
    return value * remPx; // CSR에서 실제 rem, SSR에선 ssrFallback을 기반
  }

  // px 또는 단위 없음 → px
  return value;
}
