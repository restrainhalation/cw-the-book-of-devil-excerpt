import type { Meta, StoryObj } from '@storybook/react';
import { Chip, Group } from '@mantine/core';
import { AbilityInfomationList } from './AbilityInfomationList';
import { NATURES, PERIODS } from '@/constants';
import { AbilityTooltip } from '@/components/AbilityTooltip';

const meta: Meta<typeof AbilityInfomationList> = {
  title: 'AbilityInfomationList',
  component: AbilityInfomationList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof AbilityInfomationList>;

export const Default: Story = {
  render: () => (
    <AbilityInfomationList
      physical={NATURES[2].physical}
      mental={NATURES[2].mental}
    />
  ),
};

export const UseOnTooltip: Story = {
  render: () => (
    <>
      <Group justify="center">
        {PERIODS.map((period) => (
          <AbilityTooltip physical={period.physical} mental={period.mental}>
            <div>
              <Chip
                key={period.id}
                value={period.id}
                variant="outline"
              >
                {period.name}
              </Chip>
            </div>
          </AbilityTooltip>
        ))}
      </Group>
    </>
  ),
};
