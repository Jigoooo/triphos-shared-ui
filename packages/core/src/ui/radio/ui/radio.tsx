import { motion } from 'framer-motion';

import {
  defaultRadioSize,
  defaultLabelColor,
  getRadioLabelStyle,
  getRadioInputStyle,
  getRadioIconStyle,
  getRadioDotStyle,
  getRadioBorderColor,
  getRadioLabelTextStyle,
} from '../config/radio-style.ts';
import { useRadioGroupContext } from '../model/radio-group-context.ts';
import type { RadioProps } from '../model/radio-type.ts';
import { useThemeContext } from '@/theme';
import { Typography } from '@/ui/typography';

export function Radio({
  label,
  value,
  disabled = false,
  size = defaultRadioSize,
  color,
  labelColor = defaultLabelColor,
  style,
  iconStyle,
  dotStyle,
}: RadioProps) {
  const { theme } = useThemeContext();

  const effectiveColor = color || theme.colors.primaryColor;
  const { name, selectedRadio, handleSelectedRadio, groupDisabled } = useRadioGroupContext();

  const disabledValue = disabled || groupDisabled;
  const isSelected = selectedRadio === value;
  const indicatorSize = size * 0.5;

  const labelStyle = getRadioLabelStyle({
    style,
    disabledValue,
    cursor: 'pointer',
  });

  const inputStyle = getRadioInputStyle();

  const iconStyleCombined = getRadioIconStyle({
    size,
    iconStyle,
  });

  const dotStyleCombined = getRadioDotStyle({
    indicatorSize,
    disabledValue,
    effectiveColor,
    dotStyle,
  });

  const borderColor = getRadioBorderColor({
    disabledValue,
    isSelected,
    primaryColor: theme.colors.primaryColor,
  });

  const textStyle = getRadioLabelTextStyle({
    disabledValue,
    labelColor,
  });

  return (
    <label key={value} style={labelStyle}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => handleSelectedRadio(value)}
        disabled={disabledValue}
        style={inputStyle}
      />
      <motion.div
        style={iconStyleCombined}
        animate={{ borderColor }}
        transition={{ duration: 0.2 }}
      >
        {isSelected && (
          <motion.div
            style={dotStyleCombined}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
      <Typography style={textStyle}>{label}</Typography>
    </label>
  );
}
