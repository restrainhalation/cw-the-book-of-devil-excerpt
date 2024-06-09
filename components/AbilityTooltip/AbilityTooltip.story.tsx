import type { Meta, StoryObj } from '@storybook/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { AbilityTooltip } from './AbilityTooltip';
import { NATURES } from '@/constants';
import { showAbilityTooltipAtom } from '@/store';

const sampleNature = NATURES[0]

const meta: Meta<typeof AbilityTooltip> = {
  title: 'AbilityTooltip',
  component: AbilityTooltip,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    children: {
      options: ['Span'],
      mapping: {
        Span: <span>Span</span>,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AbilityTooltip>;

export const Default: Story = {
  args: {
    children: 'Span',
    physical: sampleNature.physical,
    mental: sampleNature.mental,
  },

  render: (args) => {
    const [, setShowAbilityTooltip] = useAtom<boolean>(showAbilityTooltipAtom)
    useEffect(
      () => setShowAbilityTooltip(true),
      [setShowAbilityTooltip]
    );
    return (
      <AbilityTooltip physical={args.physical} mental={args.mental}>
        {args.children}
      </AbilityTooltip>
    )
  },
};
