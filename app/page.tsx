'use client';

import {
  Title,
  Grid,
  GridCol,
  Stack,
  Skeleton,
  Container,
} from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai';
import { abilityAtom, characterAtom } from '@/store';
import { SEXES, CHARACTERISTICS } from '@/constants';
import type { Characteristic, Physical, Mental } from '@/types';
import Sex from '@/components/Sex/Sex';
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
  const [character, setCharacter] = useAtom(characterAtom);
  // Jotai の能力 atom
  const setAbility = useSetAtom(abilityAtom);

  /**
   * 性別の ON／OFF が変更されたときに実行して
   * Jotai のキャラクター atom を更新する
   * @param sexId {number} 性別 ID
   */
  const onChangeSex = (sexId:number) => {
    // ID をもとに、操作された性別を特定する
    const changedSex = Object.values(SEXES).find((current) => current.id === sexId);
    // 性別を特定できないとき、実装内の定数の整合性が取れていないため、中断する
    if (!changedSex) return;

    // Jotai を参照し、キャラクター atom が ID の示す性別になっているか
    const hasStoredSex = character.sex?.id === sexId;

    // Jotai のキャラクター atom の性別を未選択状態にする
    character.sex = undefined;

    if (!hasStoredSex) {
      // 新たな性別が選択されたとき
      // ---
      // Jotai のキャラクター atom の性別を更新する
      character.sex = changedSex;
    }

    // Jotai のキャラクター atom を更新する
    setCharacter(character);

    // 能力 atom を更新する
    onChangeCharacterAtom();
  };

  /**
   * 特性の ON／OFF が変更されたときに実行して
   * Jotai のキャラクター atom を更新する
   * @param characteristicId 特性 ID
   * @returns void
   */
  const onChangeCharacteristic = (characteristicId:number) => {
    // ID をもとに、操作された特性を特定する
    const changedCharacteristic = CHARACTERISTICS.find((current) => current.id === characteristicId);
    // 特性を特定できないとき、実装内の定数の整合性が取れていないため、中断する
    if (!changedCharacteristic) return;

    // Jotai を参照し、キャラクター atom に ID が示す特性が含まれるか
    const hasStoredCharacteristic = !!character.characteristics.find((current) => current.id === characteristicId);

    // Jotai のキャラクター atom から、操作された特性と同じグループの特性があれば取り除く
    character.characteristics = character.characteristics
      .filter((current) => current.group !== changedCharacteristic.group);

    if (!hasStoredCharacteristic) {
      // 新たな特性が付加されたとき
      // ---
      // Jotai のキャラクター atom に ID を追加する
      character.characteristics.push(changedCharacteristic);
    }

    // Jotai のキャラクター atom を更新する
    setCharacter(character);

    // 能力 atom を更新する
    onChangeCharacterAtom();
  };

  /**
   * キャラクター atom が変更されたとき、能力 atom を更新する
   */
  const onChangeCharacterAtom = () => {
    // 身体的特徴
    let physicalAbilities: Physical[] = [];
    if (character.sex?.physical) physicalAbilities.push(character.sex.physical);
    physicalAbilities = physicalAbilities.concat(character.characteristics.map((current) => current.physical));
    // 精神的特徴
    let mentalAbilities: Mental[] = [];
    if (character.sex?.mental) mentalAbilities.push(character.sex.mental);
    mentalAbilities = mentalAbilities.concat(character.characteristics.map((current) => current.mental));
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
              <Sex onChange={onChangeSex}></Sex>
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
                      onChange={onChangeCharacteristic}
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
