import type { CSSProperties, HTMLProps, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

import { FiSearch } from 'react-icons/fi';

import type { MultiSelectOption } from '../model/select-type.ts';
import { zIndex } from '@/constants';
import { Input } from '@/ui/input';
import { FlexRow } from '@/ui/layout';
import { Checkbox } from '@/ui/checkbox';
import { Typography } from '@/ui/typography';

export function MultiSelectItems<ValuesType extends (string | number)[]>({
  setFloating,
  floatingStyles,
  getFloatingProps,
  selectValue,
  selectedValues,
  options,
  isAutocomplete,
  filterText,
  handleFilterText,
  handleKeyDown,
  highlightedIndex,
}: {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  selectValue: (value: ValuesType) => void;
  selectedValues: ValuesType;
  options: MultiSelectOption[];
  isAutocomplete: boolean;
  filterText: string;
  handleFilterText: (text: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  highlightedIndex: number | null;
}) {
  return (
    <motion.div
      ref={setFloating}
      className='shadow-scroll'
      style={{
        ...{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: 4,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          maxHeight: 300,
          overflowY: 'auto',
          zIndex: zIndex.selectBoxItem,
          padding: 6,
        },
        ...floatingStyles,
      }}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{ duration: 0.14, ease: 'easeInOut' }}
      {...getFloatingProps()}
    >
      {isAutocomplete && (
        <Input.Underline
          onKeyDown={handleKeyDown}
          startDecorator={<FiSearch style={{ color: '#999999', fontSize: '1.1rem' }} />}
          value={filterText}
          onChange={(event) => {
            handleFilterText(event.target.value);
          }}
          onClick={(event) => event.stopPropagation()}
          isFocusEffect={false}
          style={{ width: '100%', backgroundColor: 'transparent', height: 32, marginBottom: 6 }}
          placeholder={'Search Option'}
        />
      )}
      {options.map((option, index) => (
        <FlexRow
          as={motion.div}
          key={option.value}
          style={{
            alignItems: 'center',
            height: 38,
            cursor: 'pointer',
            paddingInline: 8,
            paddingBlock: 2,
            backgroundColor: highlightedIndex === index ? '#f4f4f4' : '#ffffff',
            borderRadius: 6,
          }}
          onClick={() => {
            if (selectedValues.includes(option.value)) {
              selectValue(selectedValues.filter((value) => value !== option.value) as ValuesType);
            } else {
              selectValue([...selectedValues, option.value] as ValuesType);
            }

            if (selectedValues.length === 0) {
              selectValue([...options.map((option) => option.value)] as ValuesType);
            }
          }}
          whileHover={{ backgroundColor: '#f4f4f4' }}
        >
          <Checkbox
            checked={selectedValues.includes(option.value)}
            onClick={(e) => e.preventDefault()}
          />
          <Typography
            style={{
              fontSize: '0.94rem',
              padding: '2px 8px',
              borderRadius: 4,
              color: '#000000',
            }}
          >
            {option.label}
          </Typography>
        </FlexRow>
      ))}
    </motion.div>
  );
}
