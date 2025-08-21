import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

import {
  defaultLinkSize,
  defaultLinkVariant,
  defaultUnderline,
  getLinkBaseStyle,
  getLinkHoverStyle,
  getLinkFocusStyle,
  getExternalIconStyle,
  getLoadingSpinnerStyle,
} from '../config/link-style.ts';
import type { LinkProps } from '../model/link-type.ts';
import { useRootRemPx } from '@/hooks/style/use-root-rem-px';

const ExternalIcon = ({ size, remPx }: { size: number | string; remPx: number }) => (
  <ExternalLink style={getExternalIconStyle(size, remPx)} />
);

const LoadingSpinner = ({ size, remPx }: { size: number | string; remPx: number }) => (
  <motion.span
    style={getLoadingSpinnerStyle(size, remPx)}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

export function Link({
  style,
  children,
  disabled = false,
  variant = defaultLinkVariant,
  underline = defaultUnderline,
  size = defaultLinkSize,
  loading = false,
  external = false,
  ...props
}: LinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const remPx = useRootRemPx();

  const baseStyle = getLinkBaseStyle({
    disabled,
    variant,
    size,
    underline,
    style,
    remPx,
  });

  const hoverStyle = isHovered && !disabled ? getLinkHoverStyle(variant, underline) : {};
  const focusStyle = isFocused && !disabled ? getLinkFocusStyle() : {};

  const finalStyle = {
    ...baseStyle,
    ...hoverStyle,
    ...focusStyle,
  };

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled && !loading) {
      setIsHovered(false);
    }
  };

  const handleFocus = () => {
    if (!disabled && !loading) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (!disabled && !loading) {
      setIsFocused(false);
    }
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={finalStyle}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size={size} remPx={remPx} />}
      {children}
      {external && !loading && <ExternalIcon size={size} remPx={remPx} />}
    </a>
  );
}
