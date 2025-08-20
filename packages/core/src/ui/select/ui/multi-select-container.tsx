import type { ReferenceType, VirtualElement } from '@floating-ui/react';
import { motion } from 'framer-motion';
import { type HTMLProps, useEffect, useRef, useState } from 'react';

import { HiChevronUpDown } from 'react-icons/hi2';
import { LuX } from 'react-icons/lu';

import type { MultiSelectOption } from '../model/select-type.ts';
import { useThemeContext } from '@/theme';
import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function MultiSelectContainer({
  ref,
  label,
  selectedOptions = [],
  deleteValue,
  isAllSelected,
  toggleSelectBox,
  containerWidth,
  containerHeight,
  getReferenceProps,
}: {
  ref?: ((node: ReferenceType | null) => void) & ((node: Element | VirtualElement | null) => void);
  label?: string;
  selectedOptions: MultiSelectOption[];
  deleteValue: (option: MultiSelectOption) => void;
  isAllSelected: boolean;
  toggleSelectBox: () => void;
  containerWidth?: string | number;
  containerHeight: string | number;
  getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>;
}) {
  const { theme } = useThemeContext();

  const selectedOptionsContainerRef = useRef<HTMLDivElement>(null);
  const [optionsContainerWidth, setOptionsContainerWidth] = useState(0);

  useEffect(() => {
    if (selectedOptionsContainerRef.current) {
      setOptionsContainerWidth(selectedOptionsContainerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (selectedOptionsContainerRef.current) {
        setOptionsContainerWidth(selectedOptionsContainerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FlexRow
      ref={ref}
      as={motion.div}
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        paddingLeft: label ? 12 : 6,
        paddingRight: 6,
        paddingBlock: 4,
        height: containerHeight,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 3px rgba(50, 50, 50, 0.1)',
        border: '1px solid #cccccc',
        borderRadius: 4,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={toggleSelectBox}
      whileHover={{ backgroundColor: '#f4f4f4' }}
      transition={{ duration: 0.14 }}
      {...getReferenceProps()}
    >
      <FlexRow
        ref={selectedOptionsContainerRef}
        style={{ alignItems: 'center', gap: 6, flexGrow: 1 }}
      >
        {label && (
          <>
            <Typography
              style={{
                fontSize: '0.8rem',
                color: '#333333',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Typography>
            <div
              style={{ height: 20, width: 1, alignSelf: 'center', backgroundColor: '#cccccc' }}
            ></div>
          </>
        )}
        {isAllSelected ? (
          <FlexRow
            style={{
              flexGrow: 1,
              width: '100%',
              paddingBlock: 2,
              paddingInline: 6,
              borderRadius: 4,
              border: '1px solid #cccccc',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary[300],
              gap: 6,
            }}
          >
            <Typography
              style={{
                fontWeight: 600,
                fontSize: '0.92rem',
                color: '#ffffff',
              }}
            >
              전체
            </Typography>
          </FlexRow>
        ) : (
          <FlexRow
            className={'no-scrollbar'}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              maxWidth:
                containerWidth && optionsContainerWidth
                  ? `${optionsContainerWidth - 120}px`
                  : '100%',
              gap: 4,
            }}
          >
            {selectedOptions.map((selectedOption, index) => {
              return (
                <FlexRow
                  key={index}
                  style={{
                    paddingBlock: 1,
                    paddingInline: 6,
                    borderRadius: 4,
                    border: '1px solid #cccccc',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.primary[300],
                    gap: 6,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '0.92rem',
                      color: '#ffffff',
                    }}
                  >
                    {selectedOption.label}
                  </Typography>
                  <LuX
                    style={{ fontSize: '0.94rem', color: '#ffffff', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteValue(selectedOption);
                    }}
                  />
                </FlexRow>
              );
            })}
          </FlexRow>
        )}
      </FlexRow>
      <FlexRow
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HiChevronUpDown style={{ fontSize: '1.3rem', color: '#888888' }} />
      </FlexRow>
    </FlexRow>
  );
}
