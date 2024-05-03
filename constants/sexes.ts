import type { Sex } from '@/types';

/** 性別 */
export const SEXES: { [key: string]: Sex } = {
  MALE: {
    id: 1,
    name: '♂',
    canBeAFather: true,
    canBeAMother: false,
    physical: { agility: 0, dexterity: 0, intelligence: 0, mind: 0, strength: 1, vitality: 0 },
    mental: { aggressive: 0.5, brave: 0.0, cautious: 0.0, cheerful: 0.0, trickish: 0.0 },
  },
  FEMALE: {
    id: 1,
    name: '♀',
    canBeAFather: false,
    canBeAMother: true,
    physical: { agility: 0, dexterity: 1, intelligence: 0, mind: 0, strength: 0, vitality: 0 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.0 },
  },
};
