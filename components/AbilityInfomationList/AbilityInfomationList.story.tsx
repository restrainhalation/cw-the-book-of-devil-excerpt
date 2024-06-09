import type { Meta, StoryObj } from '@storybook/react';
import { AbilityInfomationList } from './AbilityInfomationList';
import { NATURES } from '@/constants';

const sampleNature = NATURES[2]

const meta: Meta<typeof AbilityInfomationList> = {
  title: 'AbilityInfomationList',
  component: AbilityInfomationList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof AbilityInfomationList>;

export const Default: Story = {
  args: {
    physical: sampleNature.physical,
    mental: sampleNature.mental,
  },
};
