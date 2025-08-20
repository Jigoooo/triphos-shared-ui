import { motion } from 'framer-motion';

import { useRadioGroupContext } from '../model/radio-group-context.ts';
import type { RadioProps } from '../model/radio-type.ts';
import { useThemeContext } from '@/theme';
import { Typography } from '@/ui/typography';

export function Radio({
  label,
  value,
  disabled = false,
  size = 1.4,
  color,
  labelColor = '#333333',
  style,
  iconStyle,
  dotStyle,
}: RadioProps) {
  const { theme } = useThemeContext();

  const effectiveColor = color || theme.colors.primaryColor;

  const { name, selectedRadio, handleSelectedRadio, groupDisabled } = useRadioGroupContext();

  const disabledValue = disabled || groupDisabled;

  const indicatorSize = size * 0.5;

  return (
    <label
      key={value}
      style={{
        ...{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: disabledValue ? 'default' : 'pointer',
          ...style,
        },
      }}
    >
      <input
        type='radio'
        name={name}
        value={value}
        checked={selectedRadio === value}
        onChange={() => {
          handleSelectedRadio(value);
        }}
        disabled={disabledValue}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
          borderRadius: '50%',
          border: '2px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...iconStyle,
        }}
        animate={{
          borderColor: disabledValue
            ? '#cccccc'
            : selectedRadio === value
              ? theme.colors.primaryColor
              : '#cccccc',
        }}
        transition={{ duration: 0.2 }}
      >
        {selectedRadio === value && (
          <motion.div
            style={{
              width: `${indicatorSize}rem`,
              height: `${indicatorSize}rem`,
              borderRadius: '50%',
              backgroundColor: disabledValue ? '#cccccc' : effectiveColor,
              ...dotStyle,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
      <Typography style={{ fontSize: '0.9rem', color: disabledValue ? '#cccccc' : labelColor }}>
        {label}
      </Typography>
    </label>
  );
}
