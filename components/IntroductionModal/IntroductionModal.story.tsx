import type { Meta } from '@storybook/react';
import { IntroductionModal } from './IntroductionModal';

const meta: Meta<typeof IntroductionModal> = {
  title: 'IntroductionModal',
  component: IntroductionModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  args: {
    opened: true,
    onClose: () => {},
  },
};

export default meta;

export const Default = meta;
