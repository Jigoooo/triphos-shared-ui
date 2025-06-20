import type { CSSProperties } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

import { FlexColumn, FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';
import { CloseIconButton } from '@/ui/icon';
import type { ModalLayoutProps } from '../model/modal-type.ts';

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
  headerVisible = true,
  drag = true,
  title = '',
  titleIcon,
  subTitle = '',
  containerStyle,
  headerContainerStyle,
  titleStyle,
  children,
}: ModalLayoutProps) {
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

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // 모달 외부의 모든 요소를 비활성화
    const allElements = document.querySelectorAll('*');
    const originalTabIndexes = new Map();

    allElements.forEach((element) => {
      if (!modal.contains(element) && element !== modal) {
        const currentTabIndex = element.getAttribute('tabindex');
        originalTabIndexes.set(element, currentTabIndex);
        element.setAttribute('tabindex', '-1');
      }
    });

    // 모달 내부 포커스 가능한 요소들
    const getFocusableElements = () => {
      return modal.querySelectorAll(
        'input:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      ) as NodeListOf<HTMLElement>;
    };

    // 첫 번째 요소에 포커스
    const focusFirstElement = () => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    };

    // 지연 후 포커스 (렌더링 완료 대기)
    setTimeout(focusFirstElement, 150);

    // 탭 키 처리
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement as HTMLElement,
        );
        let nextIndex;

        if (e.shiftKey) {
          // Shift + Tab (역방향)
          nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        } else {
          // Tab (정방향)
          nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
        }

        focusableElements[nextIndex].focus();
      } else if (e.key === 'Escape') {
        close();
      }
    };

    // 전역 키보드 이벤트
    document.addEventListener('keydown', handleKeyDown, true);

    // 정리
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);

      // 원래 tabindex 복원
      originalTabIndexes.forEach((originalValue, element) => {
        if (originalValue === null) {
          element.removeAttribute('tabindex');
        } else {
          element.setAttribute('tabindex', originalValue);
        }
      });
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
      tabIndex={-1}
    >
      {headerVisible && (
        <FlexRow
          style={{
            width: '100%',
            justifyContent: 'space-between',
            cursor: 'grab',
            ...headerContainerStyle,
          }}
          tabIndex={-1}
          as={motion.div}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <FlexColumn style={{ gap: '0.2rem', userSelect: 'none' }}>
            <FlexRow style={{ alignItems: 'center' }}>
              {titleIcon && titleIcon}
              <Typography style={{ fontSize: '1.2rem', fontWeight: 700, ...titleStyle }}>
                {title}
              </Typography>
            </FlexRow>
            <Typography style={{ fontSize: '0.9rem', color: '#888888' }}>{subTitle}</Typography>
          </FlexColumn>
          <FlexColumn
            style={{ height: '100%', justifyContent: 'flex-start', paddingTop: '0.4rem' }}
          >
            <CloseIconButton close={close} />
          </FlexColumn>
        </FlexRow>
      )}

      <FlexColumn style={{ flexGrow: 1, overflow: 'auto' }}>{children}</FlexColumn>
    </FlexColumn>
  );
}
