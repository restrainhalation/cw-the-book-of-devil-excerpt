/** 身体的特徴の名前 */
export const PHYSICAL_ABILITY_NAME: { [key: string]: string } = {
    /** 器用度 */
    dexterity: '器用度',
    /** 敏捷性 */
    agility: '敏捷性',
    /** 知力 */
    intelligence: '知力',
    /** 筋力 */
    strength: '筋力',
    /** 生命力 */
    vitality: '生命力',
    /** 精神力 */
    mind: '精神力',
};

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
