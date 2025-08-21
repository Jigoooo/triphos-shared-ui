import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { BottomSheet, type BottomSheetProps, BottomSheetWithInput } from '../src';

const meta = {
  title: 'Design/Molecules/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
    docs: {},
  },
  tags: ['autodocs'],
  args: {
    isOpen: false,
    children: <></>,
    onClose: () => {},
  },
} satisfies Meta<BottomSheetProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ];

    return (
      <div style={{ width: '18.75rem', padding: '1.25rem' }}>
        <BottomSheetWithInput
          placeholder='Select an option'
          bottomSheetContent={({ close }) => {
            return (
              <div style={{ padding: '1.25rem' }}>
                <h2 style={{ marginBottom: '1.25rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
                  Select Option
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        console.log('Selected:', option.label);
                        close();
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        border: '0.0625rem solid #e0e0e0',
                        borderRadius: '0.5rem',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const BottomSheetExample = () => {
      const [selectedCountry, setSelectedCountry] = useState<string>('');
      const countries = [
        'United States',
        'Canada',
        'Mexico',
        'United Kingdom',
        'Germany',
        'France',
        'Italy',
        'Spain',
        'Portugal',
        'Netherlands',
        'Belgium',
        'Sweden',
        'Norway',
        'Denmark',
        'Finland',
        'Poland',
        'Czech Republic',
        'Austria',
        'Switzerland',
        'Greece',
        'Japan',
        'South Korea',
        'China',
        'India',
        'Australia',
      ];

      return (
        <div style={{ width: '18.75rem', padding: '1.25rem' }}>
          <BottomSheetWithInput
            value={selectedCountry}
            placeholder='Select your country'
            bottomSheetMaxHeight='60vh'
            bottomSheetContent={({ close }) => {
              return (
                <div style={{ padding: '1.25rem' }}>
                  <h2 style={{ marginBottom: '1.25rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
                    Select Country
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      paddingRight: '0.75rem',
                    }}
                  >
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountry(country);
                          close();
                        }}
                        style={{
                          padding: '0.75rem 1rem',
                          border: '0.0625rem solid #e0e0e0',
                          borderRadius: '0.5rem',
                          backgroundColor: selectedCountry === country ? '#f0f0f0' : '#ffffff',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCountry !== country) {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCountry !== country) {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                          }
                        }}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }}
          />
        </div>
      );
    };

    return <BottomSheetExample />;
  },
};

export const CustomContent: Story = {
  render: () => {
    const BottomSheetExample = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div style={{ width: '18.75rem', padding: '1.25rem' }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Open Bottom Sheet
          </button>

          <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                Terms and Conditions
              </h2>
              <div style={{ marginBottom: '1.25rem', color: '#666', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '0.0625rem solid #ddd',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    console.log('Accepted!');
                    setIsOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          </BottomSheet>
        </div>
      );
    };

    return <BottomSheetExample />;
  },
};

export default meta;
