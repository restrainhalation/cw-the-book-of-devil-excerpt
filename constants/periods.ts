import type { Period } from '@/types';

/** 年代 */
export const PERIODS: Period[] = [
  {
    id: 1,
    name: '子供',
    subName: 'Child',
    default: false,
    level: undefined,
    spendEP: 0,
    physical: { agility: 1, dexterity: 1, intelligence: 0, mind: 0, strength: -1, vitality: -1 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: -0.5, cheerful: 0.5, trickish: 0.0 },
    coupons: [],
    flavorText: '痛みは、知っておこう。',
  },
  {
    id: 2,
    name: '若者',
    subName: 'Young',
    default: true,
    level: 1,
    spendEP: 40,
    physical: { agility: 0, dexterity: 0, intelligence: 0, mind: 0, strength: 0, vitality: 0 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.0, cheerful: 0.0, trickish: 0.0 },
    coupons: [],
    flavorText: '無茶も苦労も出来る内が華…？',
  },
  {
    id: 3,
    name: '大人',
    subName: 'Adult',
    default: false,
    level: 2,
    spendEP: 30,
    physical: { agility: 0, dexterity: 0, intelligence: 0, mind: 0, strength: 0, vitality: -1 },
    mental: { aggressive: -0.5, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.0 },
    coupons: [
      { name: '熟練', points: 2 },
    ],
    flavorText: '心を無くさないで？',
  },
  {
    id: 4,
    name: '老人',
    subName: 'Old',
    default: false,
    level: 2,
    spendEP: 20,
    physical: { agility: -1, dexterity: -1, intelligence: 1, mind: 1, strength: -1, vitality: -1 },
    mental: { aggressive: -0.5, brave: -0.5, cautious: 0.5, cheerful: 0.0, trickish: 0.5 },
    coupons: [
      { name: '老獪', points: 4 },
    ],
    flavorText: '年の功よりは亀の甲の方が…',
  },
];
