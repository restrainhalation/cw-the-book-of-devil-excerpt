import type { Meta, StoryObj } from '@storybook/react';
import { Chip, Group, Tooltip } from '@mantine/core';
import { AbilityInfomationList } from './AbilityInfomationList';
import { NATURES, PERIODS } from '@/constants';

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
          <Tooltip
            key={period.id}
            label={
              <AbilityInfomationList physical={period.physical} mental={period.mental} />
            }
            withArrow
            position="right"
            transitionProps={{ transition: 'pop' }}
          >
            <div>
              <Chip
                key={period.id}
                value={period.id}
                variant="outline"
              >
                {period.name}
              </Chip>
            </div>
          </Tooltip>
        ))}
      </Group>
    </>
  ),
};
