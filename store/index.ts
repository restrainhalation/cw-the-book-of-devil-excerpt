import { atom } from 'jotai';
import { Key } from 'react';
import { Character, Ability } from '@/types';
import { DEFAULT_ABILITY_ATOM, DEFAULT_CHARACTER_ATOM } from '@/constants';

/** キャラクター atom */
export const characterAtom = atom<Character>(DEFAULT_CHARACTER_ATOM);

/** 能力 atom */
export const abilityAtom = atom<Ability>(DEFAULT_ABILITY_ATOM);

/** 能力参照 atom */
export const abilityReferenceAtom = atom<string>('')

/** リセット用キー atom */
export const keyForResetAtom = atom<Key>(0)

/** 能力ツールチップ表示 atom */
export const showAbilityTooltipAtom = atom<boolean>(false)
