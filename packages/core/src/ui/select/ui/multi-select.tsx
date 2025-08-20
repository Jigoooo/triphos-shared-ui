import {
  type Strategy,
  type Placement,
  flip,
  FloatingOverlay,
  FloatingPortal,
  offset,
  size,
  useClick,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useHandleClickOutsideRef } from 'hooks';
import { useEffect, useState, type KeyboardEvent } from 'react';

import { MultiSelectContainer } from './multi-select-container.tsx';
import { MultiSelectItems } from './multi-select-items.tsx';
import type { MultiSelectOption } from '../model/select-type.ts';
import { zIndex } from '@/constants';

export function MultiSelect<ValuesType extends (string | number)[]>({
  strategy = 'absolute',
  placement = 'bottom',
  label = '',
  values,
  onChange,
  options,
  containerWidth,
  containerMinWidth = '10rem',
  containerHeight = '2rem',
  isAutocomplete = false,
  openListener,
}: {
  strategy?: Strategy;
  placement?: Placement;
  label?: string;
  values: ValuesType;
  onChange: (value: ValuesType) => void;
  options: MultiSelectOption[];
  containerWidth?: string | number;
  containerMinWidth?: string | number;
  containerHeight?: string | number;
  isAutocomplete?: boolean;
  openListener?: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openListener) {
      openListener(isOpen);
    }
  }, [isOpen]);

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

  const selectedOptions = options
    .filter((option) => values.includes(option.value))
    .map((option) => option);

  const toggleSelectBox = () => setIsOpen(!isOpen);

  const isAllSelected = selectedOptions.length === 0 || selectedOptions.length === options.length;

  useEffect(() => {
    if (isAllSelected) {
      onChange([...options.map((option) => option.value)] as ValuesType);
    }
  }, [isAllSelected]);

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
        const isExist = values.includes(getFilteredOptions()[highlightedIndex].value);

        if (isExist) {
          onChange(
            values.filter(
              (value) => value !== getFilteredOptions()[highlightedIndex].value,
            ) as ValuesType,
          );
        } else {
          onChange([...values, getFilteredOptions()[highlightedIndex].value] as ValuesType);
        }
      }
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
      }}
      className='selection-none'
    >
      <MultiSelectContainer
        ref={refs.setReference}
        label={label}
        selectedOptions={selectedOptions}
        deleteValue={(option) => {
          onChange(values.filter((value) => value !== option.value) as ValuesType);

          if (values.length === 0) {
            onChange([...options.map((option) => option.value)] as ValuesType);
          }
        }}
        isAllSelected={isAllSelected}
        toggleSelectBox={toggleSelectBox}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        getReferenceProps={getReferenceProps}
      />
      <AnimatePresence>
        {isOpen &&
          (strategy === 'fixed' ? (
            <FloatingPortal>
              <FloatingOverlay
                lockScroll
                style={{ zIndex: zIndex.anchorOverlay }}
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <MultiSelectItems
                setFloating={refs.setFloating}
                floatingStyles={floatingStyles}
                getFloatingProps={getFloatingProps}
                options={getFilteredOptions()}
                selectedValues={values}
                selectValue={(newValues) => {
                  onChange(newValues);
                }}
                isAutocomplete={isAutocomplete}
                filterText={filterText}
                handleFilterText={handleFilterText}
                handleKeyDown={handleKeyDown}
                highlightedIndex={highlightedIndex}
              />
            </FloatingPortal>
          ) : (
            <MultiSelectItems
              setFloating={refs.setFloating}
              floatingStyles={floatingStyles}
              getFloatingProps={getFloatingProps}
              options={getFilteredOptions()}
              selectedValues={values}
              selectValue={(newValues) => {
                onChange(newValues);
              }}
              isAutocomplete={isAutocomplete}
              filterText={filterText}
              handleFilterText={handleFilterText}
              handleKeyDown={handleKeyDown}
              highlightedIndex={highlightedIndex}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
