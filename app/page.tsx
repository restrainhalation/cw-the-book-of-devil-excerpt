'use client';

import {
  Title,
  Grid,
  GridCol,
  Stack,
  Skeleton,
  Container,
} from '@mantine/core';
import { useAtomValue, useSetAtom } from 'jotai';
import { abilityAtom, characterAtom } from '@/store';
import { CHARACTERISTICS } from '@/constants';
import type { Characteristic, Physical, Mental } from '@/types';
import CharacteristicGroup from '@/components/CharacteristicGroup/CharacteristicGroup';

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

export default function Index() {
  // Jotai のキャラクター atom
  const character = useAtomValue(characterAtom);
  // Jotai の能力 atom
  const setAbility = useSetAtom(abilityAtom);

  /**
   * キャラクター atom が変更されたとき、能力 atom を更新する
   */
  const onChange = () => {
    // 身体的特徴
    const physicalAbilities: Physical[] = character.characteristics.map((current) => current.physical);
    // 精神的特徴
    const mentalAbilities: Mental[] = character.characteristics.map((current) => current.mental);
    setAbility({
      physical: {
        dexterity: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.dexterity, 0),
        agility: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.agility, 0),
        intelligence: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.intelligence, 0),
        strength: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.strength, 0),
        vitality: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.vitality, 0),
        mind: 6 + physicalAbilities.reduce((sum, physical) => sum + physical.mind, 0),
      },
      mental: {
        aggressive: mentalAbilities.reduce((sum, mental) => sum + mental.aggressive, 0),
        cheerful: mentalAbilities.reduce((sum, mental) => sum + mental.cheerful, 0),
        brave: mentalAbilities.reduce((sum, mental) => sum + mental.brave, 0),
        cautious: mentalAbilities.reduce((sum, mental) => sum + mental.cautious, 0),
        trickish: mentalAbilities.reduce((sum, mental) => sum + mental.trickish, 0),
      },
    });
  };

  return (
    <>
      <Title ta="center" mt={50}>
        タイトル
      </Title>
      <Container my="md">
        <Grid>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Stack justify="center">
              <Skeleton height={70} radius="md" animate={false} />
              <Skeleton height={90} radius="md" animate={false} />
              <Skeleton height={140} radius="md" animate={false} />
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Grid>
              {Object
                .entries(characteristicsGroupMap)
                .map(([groupId, characteristics]) =>
                  <GridCol key={groupId} span={{ base: 12, xs: 6 }}>
                    <CharacteristicGroup
                      characteristics={characteristics}
                      onChange={onChange}
                    />
                  </GridCol>
                )
              }
            </Grid>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
