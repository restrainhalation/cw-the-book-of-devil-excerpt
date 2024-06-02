'use client';

import {
  Container, Group, Title, Tooltip, TooltipGroup, UnstyledButton, useComputedColorScheme, useMantineColorScheme,
} from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai';
import { IconCube, IconMessage, IconMoon, IconReload, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import {
  abilityAtom,
  abilityReferenceAtom,
  characterAtom,
  keyForResetAtom,
  keyForResetBySpecialNatureAtom,
  showAbilityTooltipAtom,
  showSpecialNatureAtom,
} from '@/store';
import { DEFAULT_ABILITY_ATOM, DEFAULT_CHARACTER_ATOM } from '@/constants';
import classes from './Header.module.css'
import { Mental, Physical } from '@/types';

export function Header() {
  // 配色設定メソッド
  const { setColorScheme } = useMantineColorScheme()
  // 配色
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  // Jotai のキャラクター atom
  const [character, setCharacter] = useAtom(characterAtom);
  // Jotai の能力 atom
  const setAbility = useSetAtom(abilityAtom);
  // Jotai の能力参照 atom
  const setAbilityReference = useSetAtom(abilityReferenceAtom)
  // Jotai のリセット用キー atom
  const setKeyForReset = useSetAtom(keyForResetAtom)
  // Jotai の能力情報表示 atom
  const [showAbilityTooltip, setShowAbilityTooltip] = useAtom<boolean>(showAbilityTooltipAtom)
  // Jotai の特殊型表示 atom
  const [showSpecialNature, setShowSpecialNature] = useAtom<boolean>(showSpecialNatureAtom)
  // Jotai の特殊型 ON／OFF によるリセット用キー atom
  const setKeyForResetBySpecialNatureAtom = useSetAtom(keyForResetBySpecialNatureAtom)

  /**
   * 入力をリセットする
   */
  const reset = () => {
    // Jotai のキャラクター atom を更新する
    setCharacter(DEFAULT_CHARACTER_ATOM)
    // 能力 atom を更新する
    setAbility(DEFAULT_ABILITY_ATOM)
    // Jotai の能力参照 atom を更新する
    setAbilityReference('');
    // Jotai のリセット用キー atom を更新する
    setKeyForReset(new Date().getTime())
  }

  /**
   * 特殊型表示の ON／OFF が変更されたときに実行して
   * Jotai の以下の項目を更新する
   * ・特殊型表示 atom
   * ・特殊型 ON／OFF によるリセット用キー atom
   */
  const onChangeShowSpecialNature = () => {
    if (showSpecialNature) {
      // ON to OFF
      // ---
      // Jotai のキャラクター atom の素質を未選択状態にする
      character.nature = undefined
      // Jotai のキャラクター atom を更新する
      setCharacter(character)
      // 能力 atom を更新する
      onChangeCharacterAtom()
      // Jotai の特殊型 ON／OFF によるリセット用キー atom を更新する
      setKeyForResetBySpecialNatureAtom(new Date().getTime())
    }

    // Jotai の特殊型表示 atom を更新する
    setShowSpecialNature(!showSpecialNature)
  }

  /**
   * キャラクター atom が変更されたとき、能力 atom を更新する
   */
  const onChangeCharacterAtom = () => {
    // 身体的特徴
    let physicalAbilities: Physical[] = [];
    if (character.sex?.physical) physicalAbilities.push(character.sex.physical);
    if (character.period?.physical) physicalAbilities.push(character.period.physical);
    if (character.nature?.physical) physicalAbilities.push(character.nature.physical);
    physicalAbilities = physicalAbilities.concat(character.characteristics.map((current) => current.physical));
    // 精神的特徴
    let mentalAbilities: Mental[] = [];
    if (character.sex?.mental) mentalAbilities.push(character.sex.mental);
    if (character.period?.mental) mentalAbilities.push(character.period.mental);
    if (character.nature?.mental) mentalAbilities.push(character.nature.mental);
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
      <Container size="lg" className="inline-flex justify-between items-center w-full">
        <Title className="inline-block">
          タイトル
        </Title>
        <TooltipGroup openDelay={600} closeDelay={100}>
          <Group justify="center" className="inline-flex" gap="xs">
            <Tooltip label="リセット">
              <UnstyledButton onClick={reset} className={cx(classes.control, classes.button)} component="button">
                <IconReload className={classes.icon} />
              </UnstyledButton>
            </Tooltip>

            <Tooltip label={`能力ツールチップ${showAbilityTooltip ? 'OFF' : 'ON'}`}>
              <UnstyledButton
                className={cx(classes.control, classes.switch)}
                data-checked={showAbilityTooltip || undefined}
                onClick={() => setShowAbilityTooltip(!showAbilityTooltip)}
              >
                <IconMessage className={classes.icon} />
              </UnstyledButton>
            </Tooltip>

            <Tooltip label={`特殊型${showSpecialNature ? 'OFF' : 'ON'}`}>
              <UnstyledButton
                className={cx(classes.control, classes.switch)}
                data-checked={showSpecialNature || undefined}
                onClick={onChangeShowSpecialNature}
              >
                <IconCube className={classes.icon} />
              </UnstyledButton>
            </Tooltip>

            <Tooltip
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              label={`${computedColorScheme === 'dark' ? 'ライト' : 'ダーク'}モード`}
            >
              <UnstyledButton className={classes.control}>
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
              </UnstyledButton>
            </Tooltip>
          </Group>
        </TooltipGroup>
      </Container>
    </>
  );
}
