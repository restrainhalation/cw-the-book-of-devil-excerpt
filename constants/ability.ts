import {
  IconTargetArrow, IconRun, IconSchool, IconBarbell, IconSeeding, IconEmpathize,
} from '@tabler/icons-react'
import { AbilityConstant } from '@/types';

/** 身体的特徴 */
export const PHYSICAL_ABILITIES: AbilityConstant[] = [
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

/** 精神的特徴の名前 */
export const MENTAL_ABILITY_NAME: { [key: string]: string[] } = {
  /** 温厚／好戦（平和性／好戦性） */
  aggressive: ['温厚（平和性）', '好戦（好戦性）'],
  /** 内気／陽気（内向性／社交性） */
  cheerful: ['内気（内向性）', '陽気（社交性）'],
  /** 臆病／勇敢（臆病性／勇猛性） */
  brave: ['臆病（臆病性）', '勇敢（勇猛性）'],
  /** 大胆／慎重（大胆性／慎重性） */
  cautious: ['大胆（大胆性）', '慎重（慎重性）'],
  /** 正直／狡猾（正直性／狡猾性） */
  trickish: ['正直（正直性）', '狡猾（狡猾性）'],
};
