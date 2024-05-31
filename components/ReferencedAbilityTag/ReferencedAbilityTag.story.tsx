import type { Meta, StoryObj } from '@storybook/react';
import { useSetAtom } from 'jotai';
import { Chip, SimpleGrid } from '@mantine/core';
import { useEffect } from 'react';
import ReferencedAbilityTag from './ReferencedAbilityTag';
import { abilityReferenceAtom } from '@/store';

const meta: Meta<typeof ReferencedAbilityTag> = {
  title: 'ReferencedAbilityTag',
  component: ReferencedAbilityTag,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof ReferencedAbilityTag>;

export const Default: Story = {
  render: () => {
    const setAbilityReference = useSetAtom(abilityReferenceAtom)
    useEffect(() => {
      setAbilityReference('dexterity')
    }, []);
    return (
      <>
        <SimpleGrid>
          <Chip className="relative">
            <ReferencedAbilityTag
              physical={{
                dexterity: 2,
                agility: 0,
                intelligence: 0,
                strength: 0,
                vitality: 0,
                mind: 0,
              }}
              mental={{
                aggressive: 0,
                cheerful: 0,
                brave: 0,
                cautious: 0,
                trickish: 0,
              }}
            />
            ポジティブ
          </Chip>
          <Chip className="relative">
            <ReferencedAbilityTag
              physical={{
                dexterity: -2,
                agility: 0,
                intelligence: 0,
                strength: 0,
                vitality: 0,
                mind: 0,
              }}
              mental={{
                aggressive: 0,
                cheerful: 0,
                brave: 0,
                cautious: 0,
                trickish: 0,
              }}
            />
            ネガティブ
          </Chip>
        </SimpleGrid>
      </>
    )
  },
};
