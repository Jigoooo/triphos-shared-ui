import type { CSSProperties, ReactNode, RefObject } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

import { CloseIcon, FlexColumn, FlexRow, Typography } from '@/lib/ui';

const modalContainerDefaultStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  paddingInline: '1rem',
  paddingBlock: '0.75rem',
  width: '37.5rem',
  height: '18.75rem',
  borderRadius: '0.375rem',
  gap: '0.375rem',
};

export function ModalLayout({
  overlayRef,
  close,
  drag = true,
  title = '',
  subTitle = '',
  containerStyle,
  titleStyle,
  children,
}: {
  overlayRef: RefObject<HTMLDivElement | null>;
  close: () => void;
  drag?: boolean;
  title?: string;
  subTitle?: string;
  containerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  withHeader?: boolean;
  children: ReactNode;
}) {
  const dragControls = useDragControls();
  const modalRef = useRef<HTMLDivElement>(null);

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  });

  const updateConstraints = useCallback(() => {
    if (overlayRef.current && modalRef.current) {
      const overlayRect = overlayRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      const margin = 20;

      // transform: translate(-50%, -50%)을 고려한 실제 모달 중심점 계산
      const modalCenterX = modalRect.left + modalRect.width / 2;
      const modalCenterY = modalRect.top + modalRect.height / 2;

      // 모달 중심점이 이동할 수 있는 범위 계산
      const minCenterX = overlayRect.left + modalRect.width / 2 + margin;
      const maxCenterX = overlayRect.right - modalRect.width / 2 - margin;
      const minCenterY = overlayRect.top + modalRect.height / 2 + margin;
      const maxCenterY = overlayRect.bottom - modalRect.height / 2 - margin;

      // 현재 중심점에서 각 방향으로 이동할 수 있는 거리
      const canMoveUp = Math.max(0, modalCenterY - minCenterY);
      const canMoveDown = Math.max(0, maxCenterY - modalCenterY);
      const canMoveLeft = Math.max(0, modalCenterX - minCenterX);
      const canMoveRight = Math.max(0, maxCenterX - modalCenterX);

      setConstraints({
        top: -canMoveUp,
        bottom: canMoveDown,
        left: -canMoveLeft,
        right: canMoveRight,
      });
    }
  }, [overlayRef]);

  useLayoutEffect(() => {
    updateConstraints();

    window.addEventListener('resize', updateConstraints);

    return () => {
      window.removeEventListener('resize', updateConstraints);
    };
  }, [updateConstraints]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <FlexColumn
      ref={modalRef}
      as={motion.div}
      style={{
        ...modalContainerDefaultStyle,
        ...containerStyle,
      }}
      drag={drag}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={constraints}
      dragMomentum={false}
      dragElastic={0}
    >
      <FlexRow
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
        }}
        as={motion.div}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <FlexColumn style={{ gap: '0.2rem', userSelect: 'none' }}>
          <Typography style={{ fontSize: '1.2rem', fontWeight: 700, ...titleStyle }}>
            {title}
          </Typography>
          <Typography style={{ fontSize: '0.9rem', color: '#888888' }}>{subTitle}</Typography>
        </FlexColumn>
        <FlexColumn style={{ height: '100%', justifyContent: 'flex-start' }}>
          <CloseIcon close={close} />
        </FlexColumn>
      </FlexRow>
      {/*<Divider />*/}
      <FlexColumn style={{ flexGrow: 1, overflow: 'auto' }}>{children}</FlexColumn>
    </FlexColumn>
  );
}
