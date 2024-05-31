import type { Meta, StoryObj } from '@storybook/react';
import MentalAbilityChart from './MentalAbilityChart';

const meta: Meta<typeof MentalAbilityChart> = {
  title: 'MentalAbilityChart',
  component: MentalAbilityChart,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof MentalAbilityChart>;

export const Default: Story = {
  render: () => (
    <>
      <MentalAbilityChart
        mentalAbilities={{
          aggressive: -1,
          cheerful: 0.5,
          brave: 0,
          cautious: 1.5,
          trickish: -0.5,
        }}
      />
    </>
  ),
};
