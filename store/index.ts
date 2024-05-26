import { atom } from 'jotai';
import { Character, Ability } from '@/types';

/** キャラクター atom */
export const characterAtom = atom<Character>({
  /** 経歴 */
  coupons: [],
  /** 特性 */
  characteristics: [],
});

/** 能力 atom */
export const abilityAtom = atom<Ability>({
  physical: {
    /** 器用度 */
    dexterity: 0,
    /** 敏捷性 */
    agility: 0,
    /** 知力 */
    intelligence: 0,
    /** 筋力 */
    strength: 0,
    /** 生命力 */
    vitality: 0,
    /** 精神力 */
    mind: 0,
  },
  mental: {
    /** 温厚／好戦（平和性／好戦性） */
    aggressive: 0,
    /** 内気／陽気（内向性／社交性） */
    cheerful: 0,
    /** 臆病／勇敢（臆病性／勇猛性） */
    brave: 0,
    /** 大胆／慎重（大胆性／慎重性） */
    cautious: 0,
    /** 正直／狡猾（正直性／狡猾性） */
    trickish: 0,
  },
});

/** 能力参照 atom */
export const abilityReferenceAtom = atom<string>('')
