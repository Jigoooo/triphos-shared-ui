import { type Transition } from 'framer-motion';
import { type CSSProperties } from 'react';

export const getAccordionItemHeaderStyle = ({
  isOpen,
  hover,
  style,
}: {
  isOpen: boolean;
  hover: boolean;
  style?: CSSProperties;
}): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  padding: '0.875rem 1rem',
  borderRadius: '12px',
  background: isOpen ? '#F8FAFF' : hover ? '#FBFCFE' : '#FFFFFF',
  border: isOpen ? '1px solid #E1E8FF' : '1px solid #ECEEF3',
  boxShadow: isOpen || hover ? '0 4px 14px rgba(20, 29, 58, 0.06)' : '0 0 0 rgba(0,0,0,0)',
  transition:
    'background 160ms ease, box-shadow 160ms ease, border-color 160ms ease, transform 120ms ease',
  cursor: 'pointer',
  ...style,
});

export const getAccordionItemIconStyle = ({
  isOpen,
  hover,
}: {
  isOpen: boolean;
  hover: boolean;
}): CSSProperties => ({
  width: '1.75rem',
  height: '1.75rem',
  minWidth: '1.75rem',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  background: isOpen ? '#EEF2FF' : hover ? '#F3F5F9' : 'transparent',
  border: isOpen ? '1px solid #DDE5FF' : '1px solid transparent',
  transition: 'background 160ms ease, transform 200ms ease, border-color 160ms ease',
  transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
});

export const accordionItemTitleStyle: CSSProperties = {
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: '#1F2430',
  userSelect: 'none',
};

export const accordionItemIconStyle: CSSProperties = {
  fontSize: '1.3rem',
  color: '#3A3F4B',
};

export const accordionItemContentStyle: CSSProperties = {
  padding: '0.5rem 0',
};

export const accordionDefaultTransition: Transition = { duration: 0.22, ease: 'easeInOut' };
