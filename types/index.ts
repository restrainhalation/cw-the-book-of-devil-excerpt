/** 身体的特徴 */
export type Physical = {
  /** 器用度 */
  dexterity: number;
  /** 敏捷性 */
  agility: number;
  /** 知力 */
  intelligence: number,
  /** 筋力 */
  strength: number;
  /** 生命力 */
  vitality: number;
  /** 精神力 */
  mind: number,
};

/** 精神的特徴 */
export type Mental = {
  /** 温厚／好戦（平和性／好戦性） */
  aggressive: number,
  /** 内気／陽気（内向性／社交性） */
  cheerful: number;
  /** 臆病／勇敢（臆病性／勇猛性） */
  brave: number;
  /** 大胆／慎重（大胆性／慎重性） */
  cautious: number;
  /** 正直／狡猾（正直性／狡猾性） */
  trickish: number;
};

/** 特性 */
export type Characteristic = {
  /** ID */
  id: number;
  /** 特性のグループ */
  group: number;
  /** 名前 */
  name: string;
  /** 身体的特徴 */
  physical: Physical;
  /** 精神的特徴 */
  mental: Mental;
};
