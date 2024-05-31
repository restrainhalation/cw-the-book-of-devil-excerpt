import type { Meta, StoryObj } from '@storybook/react';
import PhysicalAbilityChart from './PhysicalAbilityChart';

const meta: Meta<typeof PhysicalAbilityChart> = {
  title: 'PhysicalAbilityChart',
  component: PhysicalAbilityChart,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof PhysicalAbilityChart>;

export const Default: Story = {
  render: () => (
    <>
      <PhysicalAbilityChart
        physicalAbilities={{
          dexterity: 7,
          agility: 3,
          intelligence: 9,
          strength: 5,
          vitality: 4,
          mind: 5,
        }}
      />
    </>
  ),
};
