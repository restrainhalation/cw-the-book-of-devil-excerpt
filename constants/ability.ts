import {
  IconTargetArrow, IconRun, IconSchool, IconBarbell, IconSeeding, IconEmpathize,
  IconSwords, IconConfetti, IconChessKnight, IconPuzzle, IconSpy,
} from '@tabler/icons-react'
import { PhysicalAbilityConstant, MentalAbilityConstant } from '@/types';

/** 身体的特徴 */
export const PHYSICAL_ABILITIES: PhysicalAbilityConstant[] = [
  /** 器用度 */
  {
    id: 'dexterity',
    name: '器用度',
    order: 1,
    icon: IconTargetArrow,
  },
  /** 敏捷性 */
  {
    id: 'agility',
    name: '敏捷性',
    order: 2,
    icon: IconRun,
  },
  /** 知力 */
  {
    id: 'intelligence',
    name: '知力',
    order: 3,
    icon: IconSchool,
  },
  /** 筋力 */
  {
    id: 'strength',
    name: '筋力',
    order: 4,
    icon: IconBarbell,
  },
  /** 生命力 */
  {
    id: 'vitality',
    name: '生命力',
    order: 5,
    icon: IconSeeding,
  },
  /** 精神力 */
  {
    id: 'mind',
    name: '精神力',
    order: 6,
    icon: IconEmpathize,
  },
];

/** 精神的特徴 */
export const MENTAL_ABILITIES: MentalAbilityConstant[] = [
  /** 温厚／好戦（平和性／好戦性） */
  {
    id: 'aggressive',
    names1: ['温厚', '好戦'],
    names2: ['平和性', '好戦性'],
    names3: ['温厚（平和性）', '好戦（好戦性）'],
    nameOfBoth1: '温厚／好戦',
    nameOfBoth2: '平和性／好戦性',
    order: 1,
    icon: IconSwords,
  },
  /** 内気／陽気（内向性／社交性） */
  {
    id: 'cheerful',
    names1: ['内気', '陽気'],
    names2: ['内向性', '社交性'],
    names3: ['内気（内向性）', '陽気（社交性）'],
    nameOfBoth1: '内気／陽気',
    nameOfBoth2: '内向性／社交性',
    order: 2,
    icon: IconConfetti,
  },
  /** 臆病／勇敢（臆病性／勇猛性） */
  {
    id: 'brave',
    names1: ['臆病', '勇敢'],
    names2: ['臆病性', '勇猛性'],
    names3: ['臆病（臆病性）', '勇敢（勇猛性）'],
    nameOfBoth1: '臆病／勇敢',
    nameOfBoth2: '臆病性／勇猛性',
    order: 3,
    icon: IconChessKnight,
  },
  /** 大胆／慎重（大胆性／慎重性） */
  {
    id: 'cautious',
    names1: ['大胆', '慎重'],
    names2: ['大胆性', '慎重性'],
    names3: ['大胆（大胆性）', '慎重（慎重性）'],
    nameOfBoth1: '大胆／慎重',
    nameOfBoth2: '大胆性／慎重性',
    order: 4,
    icon: IconPuzzle,
  },
  /** 正直／狡猾（正直性／狡猾性） */
  {
    id: 'trickish',
    names1: ['正直', '狡猾'],
    names2: ['正直性', '狡猾性'],
    names3: ['正直（正直性）', '狡猾（狡猾性）'],
    nameOfBoth1: '正直／狡猾',
    nameOfBoth2: '正直性／狡猾性',
    order: 5,
    icon: IconSpy,
  },
];
