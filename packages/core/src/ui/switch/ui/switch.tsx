import { LayoutGroup, motion } from 'framer-motion';

import { colors } from '@/constants';
import { Typography } from '@/ui/view';
import type { SwitchProps } from '../model/switch-type.ts';

export function Switch({
  containerStyle,
  label,
  labelStyle,
  isOn,
  onClick,
  width = 34,
  height = 18,
  disabled = false,
}: SwitchProps) {
  const dimensions = useResponsiveSize(width, height);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...containerStyle,
      }}
      onClick={disabled ? undefined : onClick}
    >
      {label && (
        <Typography
          style={{
            ...{
              userSelect: 'none',
              fontSize: '0.9rem',
              color: disabled ? '#9f9f9f' : '#666666',
              fontWeight: 500,
            },
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      )}
      <LayoutGroup>
        <motion.div
          layout
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) {
              onClick();
            }
          }}
          style={{
            display: 'flex',
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: dimensions.borderRadius,
            backgroundColor: disabled ? '#e0e0e0' : isOn ? colors.primary[400] : '#bbbbbb',
            padding: dimensions.padding,
            cursor: disabled ? 'not-allowed' : 'pointer',
            justifyContent: isOn ? 'flex-end' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <motion.div
            layoutId={'switch-thumb'}
            transition={{ type: 'spring', stiffness: 700, damping: 35 }}
            style={{
              width: dimensions.circleSize,
              height: dimensions.circleSize,
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// 기본 폰트 크기 (보통 16px)
const DEFAULT_FONT_SIZE = 16;

function remToPx(rem: number): number {
  if (!isBrowser()) {
    // SSR 환경에서는 기본값 사용
    return rem * DEFAULT_FONT_SIZE;
  }

  try {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  } catch (error) {
    // 에러 발생시 기본값 사용
    console.warn('Failed to get computed font size, using default:', error);
    return rem * DEFAULT_FONT_SIZE;
  }
}

function convertToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (value.endsWith('rem')) {
    return remToPx(parseFloat(value));
  }

  if (value.endsWith('px')) {
    return parseFloat(value);
  }

  // 숫자 문자열인 경우 px로 가정
  const numericValue = parseFloat(value);
  return isNaN(numericValue) ? 0 : numericValue;
}

// 클라이언트에서 정확한 값으로 업데이트하는 Hook
import { useEffect, useState } from 'react';

export function useResponsiveSize(width: string | number, height: string | number) {
  const [dimensions, setDimensions] = useState(() => {
    const widthPx = convertToPx(width);
    const heightPx = convertToPx(height);
    return {
      width: widthPx,
      height: heightPx,
      padding: heightPx * 0.15,
      circleSize: heightPx * 0.7,
      borderRadius: heightPx / 2,
    };
  });

  useEffect(() => {
    if (!isBrowser()) return;

    // 클라이언트에서 정확한 값으로 재계산
    const widthPx = convertToPx(width);
    const heightPx = convertToPx(height);

    setDimensions({
      width: widthPx,
      height: heightPx,
      padding: heightPx * 0.15,
      circleSize: heightPx * 0.7,
      borderRadius: heightPx / 2,
    });

    // 폰트 크기 변경 감지 (선택사항)
    const handleResize = () => {
      const newWidthPx = convertToPx(width);
      const newHeightPx = convertToPx(height);

      setDimensions({
        width: newWidthPx,
        height: newHeightPx,
        padding: newHeightPx * 0.15,
        circleSize: newHeightPx * 0.7,
        borderRadius: newHeightPx / 2,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return dimensions;
}
