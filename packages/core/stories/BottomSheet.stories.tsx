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
      <div style={{ width: '300px', padding: '20px' }}>
        <BottomSheetWithInput
          placeholder='Select an option'
          bottomSheetContent={({ close }) => {
            return (
              <div style={{ padding: '20px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                  Select Option
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        console.log('Selected:', option.label);
                        close();
                      }}
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
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
        <div style={{ width: '300px', padding: '20px' }}>
          <BottomSheetWithInput
            value={selectedCountry}
            placeholder='Select your country'
            bottomSheetMaxHeight='60vh'
            bottomSheetContent={({ close }) => {
              return (
                <div style={{ padding: '20px' }}>
                  <h2 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                    Select Country
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      paddingRight: '12px',
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
                          padding: '12px 16px',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
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
        <div style={{ width: '300px', padding: '20px' }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Open Bottom Sheet
          </button>

          <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>
                Terms and Conditions
              </h2>
              <div style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '12px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
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
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
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
