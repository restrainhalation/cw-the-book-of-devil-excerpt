'use client';

import { Container, Group, Title, Tooltip, TooltipGroup, UnstyledButton } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { IconReload } from '@tabler/icons-react';
import cx from 'clsx';
import { abilityAtom, abilityReferenceAtom, characterAtom, keyForResetAtom } from '@/store';
import { DEFAULT_ABILITY_ATOM, DEFAULT_CHARACTER_ATOM } from '@/constants';
import classes from './Header.module.css'

export function Header() {
  // Jotai のキャラクター atom
  const setCharacter = useSetAtom(characterAtom);
  // Jotai の能力 atom
  const setAbility = useSetAtom(abilityAtom);
  // Jotai の能力参照 atom
  const setAbilityReference = useSetAtom(abilityReferenceAtom)
  // Jotai のリセット用キー atom
  const setKeyForReset = useSetAtom(keyForResetAtom)

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
          </Group>
        </TooltipGroup>
      </Container>
    </>
  );
}
