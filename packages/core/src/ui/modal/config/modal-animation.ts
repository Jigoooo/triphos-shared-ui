import type { TargetAndTransition, Transition } from 'framer-motion';
import { type CSSProperties } from 'react';

import type { AnimationType } from '@/ui/modal/model/modal-type.ts';

export const getModalAnimation = (safeAreaInsets: {
  top: number;
  bottom: number;
}): Record<
  AnimationType,
  {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
    transition: Transition;
    style: CSSProperties;
  }
> => {
  return {
    'slide-up': {
      initial: { opacity: 0, x: '-50%', y: '-45%' },
      animate: { opacity: 1, x: '-50%', y: '-50%' },
      exit: { opacity: 0, x: '-50%', y: '-45%' },
      transition: { duration: 0.1 },
      style: {
        top: '50%',
        left: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'slide-right': {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
      style: {
        top: safeAreaInsets.top,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      },
    },
  };
};
