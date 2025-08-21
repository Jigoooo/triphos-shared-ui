import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';

import {
  defaultSwitchDisableTransition,
  defaultSwitchTransition,
  getSwitchBarStyle,
  getSwitchContainerStyle,
  getSwitchLabelStyle,
  getSwitchThumbStyle,
} from '../config/switch-style.ts';
import type { SwitchProps } from '../model/switch-type.ts';
import { useSwitchResponsiveSize } from '../model/use-switch-responsive-size.ts';
import { useThemeContext } from '@/theme';
import { Typography } from '@/ui/typography';

export function Switch({
  isActiveAnimation = true,
  animationDelay = 300,
  containerStyle,
  label,
  labelStyle,
  labelDirection = 'right',
  isOn,
  onClick,
  width = '2.125rem',
  height = '1.24rem',
  barColor,
  disabled = false,
}: SwitchProps) {
  const { theme } = useThemeContext();
  const dimensions = useSwitchResponsiveSize(width, height);
  const switchId = useId();

  const applyBarColor = barColor || theme.colors.primaryColor;

  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInit(true);
    }, animationDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [animationDelay]);

  const containerStyleConst = getSwitchContainerStyle({ disabled, containerStyle });
  const labelStyleConst = getSwitchLabelStyle({ disabled, labelStyle });
  const barStyleConst = getSwitchBarStyle({ dimensions, disabled, isOn, barColor: applyBarColor });
  const thumbStyleConst = getSwitchThumbStyle(dimensions);

  return (
    <div style={containerStyleConst} onClick={disabled ? undefined : onClick}>
      {label && labelDirection === 'left' && (
        <Typography style={labelStyleConst}>{label}</Typography>
      )}
      <LayoutGroup>
        <motion.div
          key={isInit && isActiveAnimation ? `switch-${switchId}` : `no-switch-${switchId}`}
          layout={isInit && isActiveAnimation}
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) {
              onClick();
            }
          }}
          style={barStyleConst}
        >
          <motion.div
            layoutId={
              isInit && isActiveAnimation
                ? `switch-thumb-${switchId}`
                : `no-switch-thumb-${switchId}`
            }
            transition={
              isInit && isActiveAnimation ? defaultSwitchTransition : defaultSwitchDisableTransition
            }
            style={thumbStyleConst}
          />
        </motion.div>
      </LayoutGroup>
      {label && labelDirection === 'right' && (
        <Typography style={labelStyleConst}>{label}</Typography>
      )}
    </div>
  );
}
