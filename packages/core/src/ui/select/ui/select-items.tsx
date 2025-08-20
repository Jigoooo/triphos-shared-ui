import { motion } from 'framer-motion';
import type { CSSProperties, HTMLProps, KeyboardEvent, ReactNode } from 'react';

import { FiSearch } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';

import type { CustomOptionRendererProps, SelectOption } from '../model/select-type.ts';
import { zIndex } from '@/constants';
import { Input } from '@/ui/input';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function SelectItems<ValueType extends string | number>({
  setFloating,
  floatingStyles,
  getFloatingProps,
  selectValue,
  selectedValue,
  options,
  isAutocomplete,
  filterText,
  handleFilterText,
  handleKeyDown,
  highlightedIndex,
  itemContainerStyle,
  itemLabelContainerStyle,
  itemLabelStyle,
  checkIconSize = '1.2rem',
  customOptionRenderer,
}: {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  selectValue: (value: ValueType) => void;
  selectedValue: ValueType;
  options: SelectOption<ValueType>[];
  isAutocomplete: boolean;
  filterText: string;
  handleFilterText: (text: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  highlightedIndex: number | null;
  itemContainerStyle?: CSSProperties;
  itemLabelContainerStyle?: CSSProperties;
  itemLabelStyle?: CSSProperties;
  checkIconSize?: string | number;
  customOptionRenderer?: (props: CustomOptionRendererProps<ValueType>) => ReactNode;
}) {
  return (
    <motion.div
      ref={setFloating}
      className='shadow-scroll'
      style={{
        ...{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '0.25rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          maxHeight: '20rem',
          overflowY: 'auto',
          zIndex: zIndex.selectBoxItem,
          padding: isAutocomplete ? 0 : '0.375rem',
          ...itemContainerStyle,
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
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
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
        </div>
      )}
      {options.map((option, index) => {
        const isSelected = selectedValue === option.value;
        const isHighlighted = highlightedIndex === index;

        if (customOptionRenderer) {
          return (
            <div key={option.value}>
              {customOptionRenderer({
                option,
                index,
                isSelected,
                isHighlighted,
                onSelect: selectValue,
              })}
            </div>
          );
        }

        return (
          <FlexRow
            as={motion.div}
            key={option.value}
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '2.375rem',
              cursor: 'pointer',
              marginInline: isAutocomplete ? '0.375rem' : 0,
              paddingBlock: '0.25rem',
              paddingInline: '0.5rem',
              backgroundColor: isSelected ? '#efefef' : isHighlighted ? '#f4f4f4' : '#ffffff',
              borderRadius: '0.25rem',
              ...itemLabelContainerStyle,
            }}
            onClick={() => selectValue(option.value)}
            whileHover={{ backgroundColor: '#f4f4f4' }}
          >
            <Typography
              style={{
                fontSize: '0.94rem',
                borderRadius: '0.25rem',
                color: '#000000',
                ...itemLabelStyle,
              }}
            >
              {option.label}
            </Typography>
            {isSelected && <IoMdCheckmark size={checkIconSize} style={{ color: '#333333' }} />}
          </FlexRow>
        );
      })}
    </motion.div>
  );
}
