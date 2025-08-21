import { type CSSProperties } from 'react';

import { zIndex } from '@/constants';

export const bottomSheetOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: zIndex.anchorOverlay,
};

export const getBottomSheetContainerStyle = ({
  maxHeight,
}: {
  maxHeight: number | string;
}): CSSProperties => {
  return {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: maxHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
    zIndex: zIndex.anchor,
    display: 'flex',
    flexDirection: 'column',
  };
};

export const getBottomSheetStyle = ({ bottomInset }: { bottomInset: string | number }) => {
  return {
    flex: 1,
    overflow: 'hidden',
    minHeight: 0,
    paddingBottom: bottomInset,
  };
};

export const bottomSheetGrabContainerStyle: CSSProperties = {
  width: '100%',
  flexShrink: 0,
  cursor: 'grab',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  touchAction: 'none',
};

export const bottomSheetGrabStyle: CSSProperties = {
  width: '3rem',
  height: '0.25rem',
  backgroundColor: '#ddd',
  borderRadius: '0.125rem',
  margin: '0 auto',
};
