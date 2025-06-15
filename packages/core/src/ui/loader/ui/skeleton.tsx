import { motion } from 'framer-motion';

import type { SkeletonProps } from '../model/loader-type.ts';

// const skeletonAnimation = {
//   animate: {
//     opacity: [0.4, 0.8, 0.4],
//   },
//   transition: {
//     duration: 1.5,
//     repeat: Infinity,
//     ease: 'easeInOut',
//   },
// };

//const shimmerAnimation = {
//   animate: { backgroundPosition: ['-200px 0', '200px 0'] },
//   transition: { duration: 1.2, repeat: Infinity, ease: 'linear' }
// };

//const breatheAnimation = {
//   animate: { opacity: [0.3, 0.8, 0.3], scale: [0.98, 1, 0.98] },
//   transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
// };

//const pulseAnimation = {
//   animate: { scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] },
//   transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
// };

// export function Skeleton({ style }: { style?: CSSProperties }) {
//   return (
//     <motion.div
//       {...skeletonAnimation}
//       style={{
//         width: '2.5rem',
//         height: '2.5rem',
//         backgroundColor: '#e0e0e0',
//         ...style,
//       }}
//     />
//   );
// }

const shimmerAnimation = {
  animate: {
    x: ['-100%', '100%'],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
    delay: 0.5, // MUI의 0.5s delay
  },
};

export function Skeleton({
  style = {},
  baseColor = 'rgba(0, 0, 0, 0.08)',
  shimmerColor = 'rgba(0, 0, 0, 0.04)',
}: SkeletonProps) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: baseColor,
        ...style,
      }}
    >
      {/* MUI의 ::after 요소 역할 */}
      <motion.div
        {...shimmerAnimation}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          transform: 'translateX(-100%)',
        }}
      />
    </div>
  );
}
