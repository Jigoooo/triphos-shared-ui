import type { ReferenceType, VirtualElement } from '@floating-ui/react';
import type { CSSProperties, HTMLProps, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { HiChevronUpDown } from 'react-icons/hi2';

import { FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';
import type { CustomContainerRendererProps } from '@/ui/select/model/select-type.ts';

export function SelectContainer<ValueType extends string | number>({
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
  customContainerRenderer,
  isOpen = false,
  selectedValue,
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
  isOpen?: boolean;
  customContainerRenderer?: (props: CustomContainerRendererProps<ValueType>) => ReactNode;
  selectedValue: ValueType;
}) {
  if (customContainerRenderer) {
    return (
      <>
        {customContainerRenderer({
          ref,
          isOpen,
          selectedLabel,
          selectedValue,
          toggleSelectBox,
          getReferenceProps,
        })}
      </>
    );
  }

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
