import type { ForwardRefComponent, MotionProps } from 'framer-motion';
import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react';

export type FlexRowProps<E extends ElementType> =
  E extends ForwardRefComponent<any, any>
    ? HTMLAttributes<HTMLElement> &
        MotionProps & { as: E; ref?: Ref<any> | null; children?: ReactNode }
    : HTMLAttributes<HTMLElement> & { as?: E; ref?: Ref<any> | null; children?: ReactNode };

export type FlexColumnProps<E extends ElementType> =
  E extends ForwardRefComponent<any, any>
    ? HTMLAttributes<HTMLElement> &
        MotionProps & { as: E; ref?: Ref<any> | null; children?: ReactNode }
    : HTMLAttributes<HTMLElement> & { as?: E; ref?: Ref<any> | null; children?: ReactNode };
