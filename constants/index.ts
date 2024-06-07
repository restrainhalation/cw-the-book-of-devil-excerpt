import { Ability, Character } from '@/types';

export * from '@/constants/sexes';
export * from '@/constants/periods';
export * from '@/constants/natures';
export * from '@/constants/characteristics';
export * from '@/constants/ability';

/** メタデータ */
export const METADATA = {
  /** タイトル */
  title: '悪魔の書（抄）',
  /** 要約 */
  description: 'CardWirth では徹底的に隠蔽されるのが基本である『数字に関する事』のユーティリティーです。',
};

/** キャラクター atom の初期値 */
export const DEFAULT_CHARACTER_ATOM: Character = {
  /** 経歴 */
  coupons: [],
  /** 特性 */
  characteristics: [],
}

/** 能力の初期値 */
export const DEFAULT_ABILITY: Ability = {
  physical: {
    /** 器用度 */
    dexterity: 6,
    /** 敏捷性 */
    agility: 6,
    /** 知力 */
    intelligence: 6,
    /** 筋力 */
    strength: 6,
    /** 生命力 */
    vitality: 6,
    /** 精神力 */
    mind: 6,
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
}
