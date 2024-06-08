'use client';

import {
  Container, Group, Title, Tooltip, TooltipGroup, UnstyledButton, useComputedColorScheme, useMantineColorScheme,
} from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai';
import { IconCube, IconInfoSmall, IconMessage, IconMoon, IconReload, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import {
  abilityAtom,
  abilityReferenceAtom,
  characterAtom,
  keyForResetAtom,
  keyForResetBySpecialNatureAtom,
  showAbilityTooltipAtom,
  showIntroductionAtom,
  showSpecialNatureAtom,
} from '@/store';
import { DEFAULT_ABILITY, DEFAULT_CHARACTER_ATOM, METADATA } from '@/constants';
import classes from './Header.module.css'
import { calculateAbility } from '@/utils';

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
  // Jotai のはじめにモーダル表示 atom
  const setShowIntroduction = useSetAtom(showIntroductionAtom)

  /**
   * 入力をリセットする
   */
  const reset = () => {
    // Jotai のキャラクター atom を更新する
    setCharacter(DEFAULT_CHARACTER_ATOM)
    // 能力 atom を更新する
    setAbility(DEFAULT_ABILITY)
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
    setAbility(calculateAbility(character));
  };

  return (
    <>
      <Container size="lg" className="inline-flex justify-between items-center w-full">
        <div className={cx('flex', 'items-center')}>
          <Title className="inline-block">
            {METADATA.title}
          </Title>
          <Tooltip label="はじめに" openDelay={600} closeDelay={100}>
            <UnstyledButton
              onClick={() => setShowIntroduction(true)}
              className={cx(classes.control, classes.button, classes.info)}
              component="button"
            >
              <IconInfoSmall className={classes.icon} />
            </UnstyledButton>
          </Tooltip>
        </div>
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
