'use client';

import { Button, Container, Group, Title } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { abilityAtom, abilityReferenceAtom, characterAtom, keyForResetAtom } from '@/store';
import { DEFAULT_ABILITY_ATOM, DEFAULT_CHARACTER_ATOM } from '@/constants';

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
        <Group justify="center" className="inline-flex">
          <Button onClick={reset}>RESET</Button>
        </Group>
      </Container>
    </>
  );
}
