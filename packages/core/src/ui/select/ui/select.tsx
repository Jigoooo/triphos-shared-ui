import type { KeyboardEvent, CSSProperties, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Strategy, Placement } from '@floating-ui/react';
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

import { zIndex } from '@/constants';
import { useHandleClickOutsideRef } from 'hooks';
import type {
  CustomContainerRendererProps,
  CustomOptionRendererProps,
  SelectOption,
} from '../model/select-type.ts';
import { SelectItems } from './select-items.tsx';
import { SelectContainer } from './select-container.tsx';

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
  checkIconSize,
  customContainerRenderer,
  customOptionRenderer,
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
  checkIconSize?: string | number;
  customContainerRenderer?: (props: CustomContainerRendererProps) => ReactNode;
  customOptionRenderer?: (props: CustomOptionRendererProps<ValueType>) => ReactNode;
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
        customContainerRenderer={customContainerRenderer}
        isOpen={isOpen}
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
                checkIconSize={checkIconSize}
                customOptionRenderer={customOptionRenderer}
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
              checkIconSize={checkIconSize}
              customOptionRenderer={customOptionRenderer}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
