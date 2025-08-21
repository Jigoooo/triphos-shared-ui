import { type CSSProperties } from 'react';

import { zIndex } from '@/constants';

export const getTooltipStyle = ({
  style,
  floatingStyles,
}: {
  style?: CSSProperties;
  floatingStyles?: CSSProperties;
}): CSSProperties => {
  return {
    userSelect: 'none',
    color: 'white',
    borderRadius: '0.25rem',
    whiteSpace: 'nowrap',
    zIndex: zIndex.tooltip,
    margin: '0.25rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingBlock: '0.14rem',
    paddingInline: '0.6rem',
    fontWeight: 400,
    fontSize: '0.78rem',
    ...style,
    ...floatingStyles,
  };
};
