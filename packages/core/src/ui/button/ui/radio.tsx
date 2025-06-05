import { motion } from 'framer-motion';

import { Typography, useRadioGroupContext } from '@/ui';
import { colors } from '@/constants';

export function Radio({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  const { name, selectedRadio, handleSelectedRadio, groupDisabled } = useRadioGroupContext();

  const disabledValue = disabled || groupDisabled;

  return (
    <label
      key={value}
      style={{
        ...{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: disabledValue ? 'not-allowed' : 'pointer',
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
          width: '1.4rem',
          height: '1.4rem',
          borderRadius: '50%',
          border: '2px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          borderColor: disabledValue
            ? '#cccccc'
            : selectedRadio === value
              ? colors.primary[400]
              : '#cccccc',
        }}
        transition={{ duration: 0.2 }}
      >
        {selectedRadio === value && (
          <motion.div
            style={{
              width: '0.7rem',
              height: '0.7rem',
              borderRadius: '50%',
              backgroundColor: disabledValue ? '#cccccc' : colors.primary[400],
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
      <Typography style={{ fontSize: '0.9rem', color: disabledValue ? '#cccccc' : '#333333' }}>
        {label}
      </Typography>
    </label>
  );
}
