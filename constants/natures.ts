import { Nature } from '@/types';

/** 素質 */
export const NATURES: Nature[] = [
  {
    id: 1,
    name: '標準型',
    geneCount: 0,
    genePattern: '1000000000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: 0, dexterity: 0, intelligence: 0, mind: 1, strength: 0, vitality: 0 },
    mental: { aggressive: -0.5, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.0 },
    description: 'バランスのよい肉体を意志力が支える',
    baseNaturesId: [],
  },
  {
    id: 2,
    name: '万能型',
    geneCount: 0,
    genePattern: '0100000000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: 1, dexterity: 1, intelligence: 0, mind: -1, strength: 0, vitality: 0 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.0, cheerful: 0.5, trickish: 0.0 },
    description: '抜け目のなさであらゆる局面に対応',
    baseNaturesId: [],
  },
  {
    id: 3,
    name: '勇将型',
    geneCount: 0,
    genePattern: '0010000000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: 0, dexterity: -1, intelligence: -1, mind: 0, strength: 2, vitality: 0 },
    mental: { aggressive: 0.0, brave: 1.0, cautious: 0.0, cheerful: 0.0, trickish: 0.0 },
    description: '力強く隙のない能力の持ち主',
    baseNaturesId: [],
  },
  {
    id: 4,
    name: '豪傑型',
    geneCount: 0,
    genePattern: '0001000000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: -1, dexterity: -2, intelligence: -2, mind: -1, strength: 3, vitality: 1 },
    mental: { aggressive: 0.5, brave: 0.5, cautious: -0.5, cheerful: 0.0, trickish: 0.0 },
    description: '全てを正面突破する戦車の如き勇者',
    baseNaturesId: [],
  },
  {
    id: 5,
    name: '知将型',
    geneCount: 0,
    genePattern: '0000100000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: 0, dexterity: 0, intelligence: 2, mind: 0, strength: -1, vitality: -1 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.0 },
    description: '理性と智力に裏打ちされた実力',
    baseNaturesId: [],
  },
  {
    id: 6,
    name: '策士型',
    geneCount: 0,
    genePattern: '0000010000',
    maxLevel: 10,
    isSpecial: false,
    physical: { agility: -1, dexterity: 0, intelligence: 3, mind: 0, strength: -2, vitality: -2 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.5 },
    description: '知性一つを武器にあらゆる存在と渡り合う',
    baseNaturesId: [],
  },
  {
    id: 7,
    name: '凡庸型',
    geneCount: 0,
    genePattern: '0000001111',
    maxLevel: 12,
    isSpecial: true,
    physical: { agility: -2, dexterity: -2, intelligence: -2, mind: -2, strength: -2, vitality: -2 },
    mental: { aggressive: 0.0, brave: -0.5, cautious: 0.5, cheerful: 0.0, trickish: 0.0 },
    baseNaturesId: [],
  },
  {
    id: 8,
    name: '英明型',
    geneCount: 6,
    genePattern: '0000000100',
    maxLevel: 10,
    isSpecial: true,
    physical: { agility: 1, dexterity: 1, intelligence: 1, mind: 1, strength: 1, vitality: 1 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.5, cheerful: 0.5, trickish: 0.0 },
    baseNaturesId: [
      1, // 標準型
      2, // 万能型
    ],
  },
  {
    id: 9,
    name: '無双型',
    geneCount: 6,
    genePattern: '0000000010',
    maxLevel: 10,
    isSpecial: true,
    physical: { agility: 1, dexterity: 0, intelligence: 0, mind: 0, strength: 3, vitality: 2 },
    mental: { aggressive: 0.5, brave: 0.5, cautious: 0.0, cheerful: 0.0, trickish: 0.0 },
    baseNaturesId: [
      3, // 勇将型
      4, // 豪傑型
    ],
  },
  {
    id: 10,
    name: '天才型',
    geneCount: 6,
    genePattern: '0000000001',
    maxLevel: 10,
    isSpecial: true,
    physical: { agility: 0, dexterity: 1, intelligence: 3, mind: 2, strength: 0, vitality: 0 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.5, cheerful: 0.0, trickish: 0.5 },
    baseNaturesId: [
      5, // 知将型
      6, // 策士型
    ],
  },
  {
    id: 11,
    name: '英雄型',
    geneCount: 8,
    genePattern: '0000000000',
    maxLevel: 12,
    isSpecial: true,
    physical: { agility: 1, dexterity: 1, intelligence: 2, mind: 2, strength: 2, vitality: 1 },
    mental: { aggressive: 0.0, brave: 0.5, cautious: 0.0, cheerful: 0.5, trickish: -0.5 },
    baseNaturesId: [],
  },
  {
    id: 12,
    name: '神仙型',
    geneCount: 10,
    genePattern: '0000000000',
    maxLevel: 15,
    isSpecial: true,
    physical: { agility: 2, dexterity: 2, intelligence: 2, mind: 2, strength: 2, vitality: 2 },
    mental: { aggressive: 0.0, brave: 0.0, cautious: 0.0, cheerful: 0.0, trickish: 0.0 },
    baseNaturesId: [],
  },
];
