import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useThemeContext } from '../src/theme';
import { Button } from '../src/ui/button';
import { Input } from '../src/ui/input';
import { FlexColumn, FlexRow } from '../src/ui/layout';
import { ModalLayout, useModal } from '../src/ui/modal';
import { Typography } from '../src/ui/typography';

const meta: Meta<typeof ModalLayout> = {
  title: 'Design/Molecules/Modal',
  component: ModalLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal 컴포넌트 - 접근성을 고려한 드래그 가능한 모달 다이얼로그',
      },
    },
  },
  // decorators: [
  //   (Story) => (
  //     <ModalContextProvider>
  //       <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
  //         <Story />
  //       </div>
  //     </ModalContextProvider>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof ModalLayout>;

// 기본 모달 예제
const BasicModalDemo = () => {
  const { open } = useModal();
  const { theme } = useThemeContext();

  const openModal = () => {
    open(({ overlayRef, close }) => (
      <ModalLayout
        overlayRef={overlayRef}
        close={close}
        title='기본 모달'
        subTitle='이것은 기본 모달 예제입니다'
      >
        <Typography>모달 내용이 여기에 표시됩니다.</Typography>
        <FlexRow style={{ gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={close}>취소</Button>
          <Button
            onClick={close}
            style={{ backgroundColor: theme.colors.primaryColor, color: 'white' }}
          >
            확인
          </Button>
        </FlexRow>
      </ModalLayout>
    ));
  };

  return <Button onClick={openModal}>기본 모달 열기</Button>;
};

export const Basic: Story = {
  render: () => <BasicModalDemo />,
};

// 드래그 비활성화 모달
const NoDragModalDemo = () => {
  const { open } = useModal();

  const openModal = () => {
    open(({ overlayRef, close }) => (
      <ModalLayout
        overlayRef={overlayRef}
        close={close}
        title='고정 모달'
        subTitle='이 모달은 드래그할 수 없습니다'
        drag={false}
      >
        <Typography>드래그가 비활성화된 모달입니다.</Typography>
        <Typography style={{ color: '#666', marginTop: '0.5rem' }}>
          헤더를 클릭해도 이동할 수 없습니다.
        </Typography>
        <Button onClick={close} style={{ marginTop: '1rem' }}>
          닫기
        </Button>
      </ModalLayout>
    ));
  };

  return <Button onClick={openModal}>고정 모달 열기</Button>;
};

export const NoDrag: Story = {
  render: () => <NoDragModalDemo />,
};

// 큰 크기 모달
const LargeModalDemo = () => {
  const { open } = useModal();
  const { theme } = useThemeContext();

  const openModal = () => {
    open(({ overlayRef, close }) => (
      <ModalLayout
        overlayRef={overlayRef}
        close={close}
        title='상세 정보'
        subTitle='상세한 내용을 확인하세요'
        containerStyle={{
          width: '50rem',
          height: '30rem',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      >
        <FlexColumn style={{ gap: '1rem', height: '100%' }}>
          <Typography style={{ fontWeight: 600 }}>긴 내용의 예제</Typography>
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '1rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '0.25rem',
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <Typography key={i} style={{ marginBottom: '1rem' }}>
                {i + 1}. 이것은 긴 내용의 예제입니다. 스크롤이 가능한 영역에서 많은 내용을 표시할 수
                있습니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            ))}
          </div>
          <FlexRow style={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button onClick={close}>취소</Button>
            <Button
              onClick={close}
              style={{ backgroundColor: theme.colors.primaryColor, color: 'white' }}
            >
              확인
            </Button>
          </FlexRow>
        </FlexColumn>
      </ModalLayout>
    ));
  };

  return <Button onClick={openModal}>큰 모달 열기</Button>;
};

export const Large: Story = {
  render: () => <LargeModalDemo />,
};

// 중첩 모달
const NestedModalDemo = () => {
  const { open } = useModal();
  const { theme } = useThemeContext();

  const openFirstModal = () => {
    open(({ overlayRef, close }) => (
      <ModalLayout
        overlayRef={overlayRef}
        close={close}
        title='첫 번째 모달'
        subTitle='다른 모달을 열 수 있습니다'
      >
        <Typography style={{ marginBottom: '1rem' }}>
          이 모달에서 다른 모달을 열 수 있습니다.
        </Typography>
        <FlexRow style={{ gap: '0.5rem' }}>
          <Button onClick={close}>닫기</Button>
          <Button
            onClick={() => {
              open(({ overlayRef: overlayRef2, close: close2 }) => (
                <ModalLayout
                  overlayRef={overlayRef2}
                  close={close2}
                  title='두 번째 모달'
                  subTitle='중첩된 모달입니다'
                  titleIcon={
                    <Heart size={20} style={{ marginRight: '0.5rem', color: '#ef4444' }} />
                  }
                >
                  <Typography>중첩된 모달이 열렸습니다!</Typography>
                  <Typography style={{ color: '#666', marginTop: '0.5rem' }}>
                    ESC 키나 뒤로가기로 이전 모달로 돌아갈 수 있습니다.
                  </Typography>
                  <Button onClick={close2} style={{ marginTop: '1rem' }}>
                    이 모달 닫기
                  </Button>
                </ModalLayout>
              ));
            }}
            style={{ backgroundColor: theme.colors.primaryColor, color: 'white' }}
          >
            두 번째 모달 열기
          </Button>
        </FlexRow>
      </ModalLayout>
    ));
  };

  return <Button onClick={openFirstModal}>중첩 모달 열기</Button>;
};

export const Nested: Story = {
  render: () => <NestedModalDemo />,
};

// 커스텀 스타일 모달
const CustomStyleModalDemo = () => {
  const { open } = useModal();

  const openModal = () => {
    open(({ overlayRef, close }) => (
      <ModalLayout
        overlayRef={overlayRef}
        close={close}
        title='커스텀 스타일'
        subTitle='다양한 스타일을 적용할 수 있습니다'
        containerStyle={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: '2px solid #fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        headerContainerStyle={{
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          paddingBottom: '1rem',
          marginBottom: '1rem',
        }}
        titleStyle={{
          color: 'white',
        }}
        closeIconProps={{
          style: { color: 'white' },
        }}
      >
        <Typography style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem' }}>
          CSS로 다양한 스타일을 적용할 수 있습니다.
        </Typography>
        <Button
          onClick={close}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            marginTop: '1rem',
          }}
        >
          닫기
        </Button>
      </ModalLayout>
    ));
  };

  return <Button onClick={openModal}>커스텀 스타일 모달</Button>;
};

export const CustomStyle: Story = {
  render: () => <CustomStyleModalDemo />,
};

// 인터랙티브 데모 (모든 기능 테스트)
const InteractiveDemo = () => {
  const { open } = useModal({ isPossibleOverlayClose: true });
  const [modalCount, setModalCount] = useState(0);

  return (
    <FlexColumn style={{ gap: '1rem', alignItems: 'center', padding: '2rem' }}>
      <Typography style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        Modal 인터랙티브 데모
      </Typography>

      <Typography style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        다양한 모달 기능을 테스트해보세요. 총 {modalCount}개의 모달이 열렸습니다.
      </Typography>

      <FlexRow style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            setModalCount((prev) => prev + 1);
            open(({ overlayRef, close }) => (
              <ModalLayout
                overlayRef={overlayRef}
                close={() => {
                  close();
                  setModalCount((prev) => prev - 1);
                }}
                title='접근성 테스트'
                subTitle='키보드 내비게이션을 테스트해보세요'
              >
                <FlexColumn style={{ gap: '1rem' }}>
                  <Typography>TAB 키로 포커스 이동을 테스트해보세요.</Typography>
                  <Input placeholder='첫 번째 입력 필드' />
                  <Input placeholder='두 번째 입력 필드' />
                  <FlexRow style={{ gap: '0.5rem' }}>
                    <Button tabIndex={0}>버튼 1</Button>
                    <Button tabIndex={0}>버튼 2</Button>
                    <Button
                      tabIndex={0}
                      onClick={() => {
                        close();
                        setModalCount((prev) => prev - 1);
                      }}
                    >
                      닫기
                    </Button>
                  </FlexRow>
                </FlexColumn>
              </ModalLayout>
            ));
          }}
        >
          접근성 테스트
        </Button>

        <Button
          onClick={() => {
            setModalCount((prev) => prev + 1);
            open(({ overlayRef, close }) => (
              <ModalLayout
                overlayRef={overlayRef}
                close={() => {
                  close();
                  setModalCount((prev) => prev - 1);
                }}
                title='드래그 테스트'
                subTitle='헤더를 드래그해서 이동해보세요'
              >
                <Typography>헤더를 마우스로 드래그하여 모달을 이동할 수 있습니다.</Typography>
                <Button
                  onClick={() => {
                    close();
                    setModalCount((prev) => prev - 1);
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  닫기
                </Button>
              </ModalLayout>
            ));
          }}
        >
          드래그 테스트
        </Button>

        <Button
          onClick={() => {
            setModalCount((prev) => prev + 1);
            open(({ overlayRef, close }) => (
              <ModalLayout
                overlayRef={overlayRef}
                close={() => {
                  close();
                  setModalCount((prev) => prev - 1);
                }}
                title='반응형 테스트'
                subTitle='창 크기를 조절해보세요'
                containerStyle={{
                  width: '80vw',
                  height: '60vh',
                  maxWidth: '800px',
                  maxHeight: '600px',
                  minWidth: '300px',
                  minHeight: '200px',
                }}
              >
                <Typography>
                  브라우저 창 크기를 조절해서 모달의 반응형 동작을 확인해보세요.
                </Typography>
                <Button
                  onClick={() => {
                    close();
                    setModalCount((prev) => prev - 1);
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  닫기
                </Button>
              </ModalLayout>
            ));
          }}
        >
          반응형 테스트
        </Button>
      </FlexRow>

      <Typography
        style={{ marginTop: '2rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}
      >
        💡 팁: ESC 키, 오버레이 클릭, 뒤로가기 버튼으로 모달을 닫을 수 있습니다.
      </Typography>
    </FlexColumn>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};
