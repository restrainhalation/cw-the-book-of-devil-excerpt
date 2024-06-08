'use client';

import { useEffect } from 'react';
import {
  Grid,
  GridCol,
  Stack,
  Container,
  TooltipGroup,
} from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai';
import {
  abilityAtom, characterAtom, abilityReferenceAtom, keyForResetAtom, keyForResetBySpecialNatureAtom,
  showIntroductionAtom,
} from '@/store';
import { SEXES, PERIODS, NATURES, CHARACTERISTICS } from '@/constants';
import type { Characteristic } from '@/types';
import { Sex } from '@/components/Sex';
import { Period } from '@/components/Period';
import { Nature } from '@/components/Nature';
import { CharacteristicGroup } from '@/components/CharacteristicGroup';
import { PhysicalAbilityChart } from '@/components/PhysicalAbilityChart';
import { MentalAbilityChart } from '@/components/MentalAbilityChart';
import { AbilityReference } from '@/components/AbilityReference';
import { registPluginOfChart } from '@/lib';
import { calculateAbility } from '@/utils';
import { IntroductionModal } from '@/components/IntroductionModal';

// Chart.js へプラグインを登録する
registPluginOfChart()

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
  const [ability, setAbility] = useAtom(abilityAtom);
  // Jotai の能力参照 atom
  const [abilityReference, setAbilityReference] = useAtom(abilityReferenceAtom)
  // Jotai のリセット用キー atom
  const keyForReset = useAtomValue(keyForResetAtom)
  // Jotai の特殊型 ON／OFF によるリセット用キー atom
  const keyForResetBySpecialNature = useAtomValue(keyForResetBySpecialNatureAtom)
  // Jotai のはじめにモーダル表示 atom
  const [showIntroduction, setShowIntroduction] = useAtom<boolean>(showIntroductionAtom)

  useEffect(() => {
    // 能力 atom を更新する
    onChangeCharacterAtom();
  }, []);

  /**
   * 性別の ON／OFF が変更されたときに実行して
   * Jotai のキャラクター atom を更新する
   * @param sexId {number} 性別 ID
   */
  const onChangeSex = (sexId:number) => {
    // ID をもとに、操作された性別を特定する
    const changedSex = SEXES.find((current) => current.id === sexId);
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
   * 年代の ON／OFF が変更されたときに実行して
   * Jotai のキャラクター atom を更新する
   * @param periodId {number} 年代 ID
   */
  const onChangePeriod = (periodId:number) => {
    // ID をもとに、操作された年代を特定する
    const changedPeriod = PERIODS.find((current) => current.id === periodId);
    // 年代を特定できないとき、実装内の定数の整合性が取れていないため、中断する
    if (!changedPeriod) return;

    // Jotai を参照し、キャラクター atom が ID の示す年代になっているか
    const hasStoredPeriod = character.period?.id === periodId;

    // Jotai のキャラクター atom の年代を未選択状態にする
    character.period = undefined;

    if (!hasStoredPeriod) {
      // 新たな年代が選択されたとき
      // ---
      // Jotai のキャラクター atom の年代を更新する
      character.period = changedPeriod;
    }

    // Jotai のキャラクター atom を更新する
    setCharacter(character);

    // 能力 atom を更新する
    onChangeCharacterAtom();
  };

  /**
   * 素質の ON／OFF が変更されたときに実行して
   * Jotai のキャラクター atom を更新する
   * @param periodId {number} 素質 ID
   */
  const onChangeNature = (natureId:number) => {
    // ID をもとに、操作された素質を特定する
    const changedNature = Object.values(NATURES).find((current) => current.id === natureId);
    // 素質を特定できないとき、実装内の定数の整合性が取れていないため、中断する
    if (!changedNature) return;

    // Jotai を参照し、キャラクター atom が ID の示す素質になっているか
    const hasStoredNature = character.nature?.id === natureId;

    // Jotai のキャラクター atom の素質を未選択状態にする
    character.nature = undefined;

    if (!hasStoredNature) {
      // 新たな素質が選択されたとき
      // ---
      // Jotai のキャラクター atom の素質を更新する
      character.nature = changedNature;
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
   * 能力参照の ON／OFF が変更されたときに実行して
   * Jotai の能力参照 atom を更新する
   * @param abilityId 能力 ID
   */
  const onChangeAbilityReference = (abilityId:string) => {
    // Jotai の能力参照 atom を更新する
    if (abilityReference === abilityId) {
      setAbilityReference('');
    } else {
      setAbilityReference(abilityId);
    }
  };

  /**
   * キャラクター atom が変更されたとき、能力 atom を更新する
   */
  const onChangeCharacterAtom = () => {
    setAbility(calculateAbility(character));
  };

  return (
    <>
      <IntroductionModal opened={showIntroduction} onClose={() => setShowIntroduction(false)} />

      <Container my="md" size="lg">
        <TooltipGroup openDelay={600} closeDelay={100}>
          <Grid>
            <GridCol span={{ base: 12, xs: 6 }}>
              <Stack justify="center">
                <Sex key={`${keyForReset}-sex`} onChange={onChangeSex}></Sex>
                <Period key={`${keyForReset}-period`} onChange={onChangePeriod}></Period>
                <Nature key={`${keyForReset}-${keyForResetBySpecialNature}-nature`} onChange={onChangeNature}></Nature>
                <Grid>
                  {Object
                    .entries(characteristicsGroupMap)
                    .map(([groupId, characteristics], index) =>
                      <GridCol key={groupId} span={{ base: 12, xs: 6 }}>
                        <CharacteristicGroup
                          key={`${keyForReset}-${index}-characteristic`}
                          characteristics={characteristics}
                          onChange={onChangeCharacteristic}
                          isLatterHalfOfQuarter={index % 4 === 1 || index % 4 === 2}
                        />
                      </GridCol>
                    )
                  }
                </Grid>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, xs: 6 }}>
              <Stack>
                <PhysicalAbilityChart physicalAbilities={ability.physical} />
                <MentalAbilityChart mentalAbilities={ability.mental} />
                <AbilityReference key={`${keyForReset}-abilityReference`} onChange={onChangeAbilityReference} />
              </Stack>
            </GridCol>
          </Grid>
        </TooltipGroup>
      </Container>
    </>
  );
}
