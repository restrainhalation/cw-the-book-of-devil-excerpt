import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridCol } from '@mantine/core';
import CharacteristicGroup from './CharacteristicGroup';
import { Characteristic } from '@/types';
import { CHARACTERISTICS } from '@/constants';

const meta: Meta<typeof CharacteristicGroup> = {
  title: 'CharacteristicGroup',
  component: CharacteristicGroup,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof CharacteristicGroup>;

// ２つ１組の特性マップ
const characteristicsGroupMap: { [key: number]: Characteristic[] } = {};
for (let i = 0; i < CHARACTERISTICS.length; i += 1) {
  const current = CHARACTERISTICS[i];
  let currentGroupCharacteristics = characteristicsGroupMap[current.group];
  if (!currentGroupCharacteristics) {
    currentGroupCharacteristics = [];
  }
  currentGroupCharacteristics.push(current);
  characteristicsGroupMap[current.group] = currentGroupCharacteristics;
}

export const Default: Story = {
  render: () => (
    <>
      <Grid>
        {Object
          .entries(characteristicsGroupMap)
          .map(([groupId, characteristics], index) =>
            <GridCol key={groupId} span={{ base: 12, xs: 6 }}>
              <CharacteristicGroup
                characteristics={characteristics}
                isLatterHalfOfQuarter={index % 4 === 1 || index % 4 === 2}
              />
            </GridCol>
          )
        }
      </Grid>
    </>
  ),
};
