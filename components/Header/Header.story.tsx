import type { Meta, StoryObj } from '@storybook/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { IntroductionModal } from '../IntroductionModal';
import { showIntroductionAtom } from '@/store';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;

type Story = StoryObj<typeof Header>;

export const WithIntroductionModal: Story = {
  render: () => {
    const [showIntroduction, setShowIntroduction] = useAtom<boolean>(showIntroductionAtom)
    useEffect(
      () => setShowIntroduction(true),
      [setShowIntroduction]
    );
    return (
      <>
        <Header />
        <IntroductionModal opened={showIntroduction} onClose={() => setShowIntroduction(false)} />
      </>
    )
  },
};
