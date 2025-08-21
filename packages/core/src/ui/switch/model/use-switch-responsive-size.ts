import { useEffect, useMemo, useState } from 'react';

import { useRootRemPx } from '@/hooks';

function convertToPx(value: string | number, remPx: number): number {
  if (typeof value === 'number') return value;

  const trimmed = value.trim();
  if (trimmed.endsWith('rem')) {
    const n = parseFloat(trimmed);
    return Number.isFinite(n) ? n * remPx : 0;
  }

  if (trimmed.endsWith('px')) {
    const n = parseFloat(trimmed);
    return Number.isFinite(n) ? n : 0;
  }

  // 숫자 문자열인 경우 px로 가정
  const n = parseFloat(trimmed);
  return Number.isFinite(n) ? n : 0;
}

export function useSwitchResponsiveSize(width: string | number, height: string | number) {
  // SSR에선 16을 사용, 클라이언트에서 실제 루트 font-size로 자동 보정
  const remPx = useRootRemPx(16);

  // 초기 계산 (SSR 안전). remPx는 SSR에선 16, CSR에서 업데이트됨
  const [dimensions, setDimensions] = useState(() => {
    const widthPx = convertToPx(width, remPx);
    const heightPx = convertToPx(height, remPx);
    return {
      width: widthPx,
      height: heightPx,
      padding: heightPx * 0.13,
      circleSize: heightPx * 0.8,
      borderRadius: heightPx / 2,
    };
  });

  // 재계산 함수 메모이즈
  const recalc = useMemo(() => {
    return () => {
      const widthPx = convertToPx(width, remPx);
      const heightPx = convertToPx(height, remPx);
      setDimensions({
        width: widthPx,
        height: heightPx,
        padding: heightPx * 0.13,
        circleSize: heightPx * 0.8,
        borderRadius: heightPx / 2,
      });
    };
  }, [width, height, remPx]);

  useEffect(() => {
    // 클라이언트 마운트/width/height/remPx 변경 시 반영
    recalc();

    // 선택: 뷰포트 리사이즈에도 반응 (원 코드 유지)
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recalc]);

  return dimensions;
}
