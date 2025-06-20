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

/**
 * Skeleton loader component with shimmer animation effect
 *
 * Creates a loading placeholder with a smooth shimmer animation that slides
 * horizontally across the element. Useful for indicating loading states
 * before content is available.
 *
 * @component
 * @example
 * // Basic usage
 * <Skeleton style={{ width: '200px', height: '20px', borderRadius: '4px' }} />
 *
 * @example
 * // Custom colors
 * <Skeleton
 *   baseColor="#f0f0f0"
 *   shimmerColor="#e0e0e0"
 *   style={{ width: '100%', height: '40px' }}
 * />
 *
 * @example
 * // Profile skeleton
 * <div>
 *   <Skeleton style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
 *   <Skeleton style={{ width: '120px', height: '16px', marginTop: '8px' }} />
 *   <Skeleton style={{ width: '80px', height: '14px', marginTop: '4px' }} />
 * </div>
 *
 * @param {Object} props - Component props
 * @param {React.CSSProperties} [props.style={}] - Custom CSS styles to apply to the skeleton container
 * @param {string} [props.baseColor='#f5f5f9'] - Background color of the skeleton element
 * @param {string} [props.shimmerColor='#ececec'] - Color of the shimmer effect that slides across
 */

export function Skeleton({
  style = {},
  baseColor = 'rgba(0, 0, 0, 0.08)',
  shimmerColor = 'rgba(0, 0, 0, 0.04)',
  // baseColor = '#f5f5f9',
  // shimmerColor = '#ececec',
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
      <div
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
