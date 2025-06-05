import type { KeyboardEvent, CSSProperties, HTMLProps } from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReferenceType, Strategy, VirtualElement, Placement } from '@floating-ui/react';
import {
  flip,
  FloatingOverlay,
  FloatingPortal,
  offset,
  size,
  useClick,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { HiChevronUpDown } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

import { zIndex } from 'constants';
import { useHandleClickOutsideRef } from 'hooks';
import { FlexRow, Input, Typography } from '@/ui';
import type { SelectOption } from '../model';

export function Select<ValueType extends string | number>({
  strategy = 'absolute',
  placement = 'bottom',
  label = '',
  value,
  onChange,
  options,
  containerWidth,
  containerMinWidth = '10rem',
  containerHeight = '2rem',
  isAutocomplete = false,
  openListener,
  wrapperStyle,
  containerHoverColor,
  containerStyle,
  labelContainerStyle,
  containerIconStyle,
  labelStyle,
  selectedLabelStyle,
  itemContainerStyle,
  itemLabelContainerStyle,
  itemLabelStyle,
}: {
  strategy?: Strategy;
  placement?: Placement;
  label?: string;
  value: ValueType;
  onChange: (value: ValueType) => void;
  options: SelectOption<ValueType>[];
  containerWidth?: string | number;
  containerMinWidth?: string | number;
  containerHeight?: string | number;
  isAutocomplete?: boolean;
  openListener?: (isOpen: boolean) => void;
  wrapperStyle?: CSSProperties;
  containerHoverColor?: string;
  containerStyle?: CSSProperties;
  labelContainerStyle?: CSSProperties;
  containerIconStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  selectedLabelStyle?: CSSProperties;
  itemContainerStyle?: CSSProperties;
  itemLabelContainerStyle?: CSSProperties;
  itemLabelStyle?: CSSProperties;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openListener) {
      openListener(isOpen);
    }
  }, [openListener, isOpen]);

  const ref = useHandleClickOutsideRef<HTMLDivElement>({
    condition: isOpen,
    outsideClickAction: () => {
      if (strategy === 'absolute') {
        setIsOpen(false);
      }
    },
  });
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    strategy,
    placement,
    transform: false,
    middleware: [
      offset({
        mainAxis: 4,
      }),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
            // maxWidth: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const selectedLabel = options.find((option) => option.value === value)?.label || '';

  const toggleSelectBox = () => {
    if (!isOpen && isAutocomplete) {
      setFilterText('');
      setHighlightedIndex(null);
    }
    setIsOpen(!isOpen);
  };

  const handleFilterText = (newFilterText: string) => {
    setFilterText(newFilterText);
    if (!isOpen) {
      setIsOpen(true);
    }
    setHighlightedIndex(null);
  };

  const getFilteredOptions = () => {
    if (!isAutocomplete) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(filterText.toLowerCase()),
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex === null) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) =>
          prev !== null && getFilteredOptions().length - 1 !== prev
            ? Math.min(prev + 1, getFilteredOptions().length - 1)
            : 0,
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlightedIndex === 0) {
        setHighlightedIndex(getFilteredOptions().length - 1);
      } else {
        setHighlightedIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : 0));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex !== null && getFilteredOptions()[highlightedIndex]) {
        onChange(getFilteredOptions()[highlightedIndex].value);
      }
      setIsOpen(false);
      setFilterText('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minWidth: containerMinWidth,
        width: containerWidth || 'auto',
        outline: 'none',
        ...wrapperStyle,
      }}
      className='selection-none'
    >
      <SelectContainer
        ref={refs.setReference}
        label={label}
        selectedLabel={selectedLabel}
        toggleSelectBox={toggleSelectBox}
        containerHeight={containerHeight}
        getReferenceProps={getReferenceProps}
        containerHoverColor={containerHoverColor}
        containerStyle={containerStyle}
        labelContainerStyle={labelContainerStyle}
        labelStyle={labelStyle}
        selectedLabelStyle={selectedLabelStyle}
        containerIconStyle={containerIconStyle}
      />
      <AnimatePresence initial={false}>
        {isOpen &&
          (strategy === 'fixed' ? (
            <FloatingPortal>
              <FloatingOverlay
                lockScroll
                style={{ zIndex: zIndex.anchorOverlay }}
                onClick={() => setIsOpen(false)}
              />
              <SelectItems
                setFloating={refs.setFloating}
                floatingStyles={floatingStyles}
                getFloatingProps={getFloatingProps}
                options={getFilteredOptions()}
                isAutocomplete={isAutocomplete}
                filterText={filterText}
                handleFilterText={handleFilterText}
                handleKeyDown={handleKeyDown}
                selectedValue={value}
                highlightedIndex={highlightedIndex}
                selectValue={(newValue) => {
                  onChange(newValue);
                  setIsOpen(false);
                  setFilterText('');
                }}
                itemContainerStyle={itemContainerStyle}
                itemLabelContainerStyle={itemLabelContainerStyle}
                itemLabelStyle={itemLabelStyle}
              />
            </FloatingPortal>
          ) : (
            <SelectItems
              setFloating={refs.setFloating}
              floatingStyles={floatingStyles}
              getFloatingProps={getFloatingProps}
              options={getFilteredOptions()}
              isAutocomplete={isAutocomplete}
              filterText={filterText}
              handleFilterText={handleFilterText}
              handleKeyDown={handleKeyDown}
              selectedValue={value}
              highlightedIndex={highlightedIndex}
              selectValue={(newValue) => {
                onChange(newValue);
                setIsOpen(false);
                setFilterText('');
              }}
              itemContainerStyle={itemContainerStyle}
              itemLabelContainerStyle={itemLabelContainerStyle}
              itemLabelStyle={itemLabelStyle}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

function SelectContainer({
  ref,
  label,
  selectedLabel,
  toggleSelectBox,
  containerHeight,
  getReferenceProps,
  containerHoverColor = '#f4f4f4',
  containerStyle,
  labelContainerStyle,
  labelStyle,
  selectedLabelStyle,
  containerIconStyle,
}: {
  ref?: ((node: ReferenceType | null) => void) & ((node: Element | VirtualElement | null) => void);
  label?: string;
  selectedLabel?: string;
  toggleSelectBox: () => void;
  containerHeight: string | number;
  getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>;
  containerHoverColor?: string;
  containerStyle?: CSSProperties;
  labelContainerStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  selectedLabelStyle?: CSSProperties;
  containerIconStyle?: CSSProperties;
}) {
  return (
    <FlexRow
      ref={ref}
      as={motion.div}
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        paddingLeft: label ? '0.75rem' : '0.375rem',
        paddingRight: '0.375ren',
        paddingBlock: '0.25rem',
        height: containerHeight,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 3px rgba(50, 50, 50, 0.1)',
        border: `1px solid #cccccc`,
        transition: 'border-color 0.1s ease',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        ...containerStyle,
      }}
      onClick={(event) => {
        event.stopPropagation();
        toggleSelectBox();
      }}
      whileHover={{ backgroundColor: containerHoverColor }}
      transition={{ duration: 0.14 }}
      {...getReferenceProps()}
    >
      <FlexRow
        style={{ alignItems: 'center', gap: '0.5rem', overflow: 'hidden', ...labelContainerStyle }}
      >
        {label && (
          <>
            <Typography style={{ fontSize: '0.8rem', color: '#333333', ...labelStyle }}>
              {label}
            </Typography>
            <div
              style={{ height: 20, width: 1, alignSelf: 'center', backgroundColor: '#cccccc' }}
            ></div>
          </>
        )}
        <Typography
          style={{
            padding: '3px 6px',
            borderRadius: 4,
            fontWeight: 500,
            fontSize: '0.94rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            ...selectedLabelStyle,
          }}
        >
          {selectedLabel}
        </Typography>
      </FlexRow>
      <FlexRow
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          color: '#888888',
          ...containerIconStyle,
        }}
      >
        <HiChevronUpDown />
      </FlexRow>
    </FlexRow>
  );
}

function SelectItems<ValueType extends string | number>({
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
              backgroundColor: highlightedIndex === index ? '#f4f4f4' : '#ffffff',
              borderRadius: '0.375rem',
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
            {selectedValue === option.value && (
              <IoMdCheckmark style={{ fontSize: '1.2rem', color: '#333333' }} />
            )}
          </FlexRow>
        );
      })}
    </motion.div>
  );
}
