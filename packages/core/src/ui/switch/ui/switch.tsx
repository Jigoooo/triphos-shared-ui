import { useEffect, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';

import { Typography } from '@/ui/typography';
import type { SwitchProps } from '../model/switch-type.ts';
import { useResponsiveSize } from '../model/use-responsive-size.ts';
import { useThemeContext } from '@/theme';

export function Switch({
  isActiveAnimation = true,
  containerStyle,
  label,
  labelStyle,
  isOn,
  onClick,
  width = '2.125rem',
  height = '1.24rem',
  barColor,
  disabled = false,
}: SwitchProps) {
  const { theme } = useThemeContext();
  const dimensions = useResponsiveSize(width, height);

  const applyBarColor = barColor || theme.colors.primaryColor;

  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInit(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,
        cursor: disabled ? 'default' : 'pointer',
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
            },
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      )}
      <LayoutGroup>
        <motion.div
          key={isInit && isActiveAnimation ? 'switch' : 'no-switch'}
          layout={isInit && isActiveAnimation}
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
            backgroundColor: disabled ? '#e0e0e0' : isOn ? applyBarColor : '#e4e4e4',
            padding: dimensions.padding,
            cursor: disabled ? 'default' : 'pointer',
            justifyContent: isOn ? 'flex-end' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <motion.div
            layoutId={isInit && isActiveAnimation ? 'switch-thumb' : 'no-switch-thumb'}
            transition={
              isInit && isActiveAnimation
                ? { type: 'spring', stiffness: 700, damping: 35 }
                : { duration: 0 }
            }
            style={{
              width: dimensions.circleSize,
              height: dimensions.circleSize,
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.06)',
            }}
          />
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
