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

/** 経歴（クーポン） */
export type Coupon = {
  /** 名前 */
  name: string,
  /** 得点 */
  points: number,
};

/** 性別 */
export type Sex = {
  /** ID */
  id: number;
  /** 名前 */
  name: string;
  /** 父親になれるか */
  canBeAFather: boolean,
  /** 母親になれるか */
  canBeAMother: boolean,
  /** 身体的特徴 */
  physical: Physical;
  /** 精神的特徴 */
  mental: Mental;
};

/** 年代 */
export type Period = {
  /** ID */
  id: number;
  /** 名前 */
  name: string;
  /** 選択肢表示時に最初から選択されているか */
  default: boolean;
  /** 登録時のレベル */
  level: number | undefined;
  /** 子供を作る時の消費EP(0で子供を作れない) */
  spendEP: number;
  /** 身体的特徴 */
  physical: Physical;
  /** 精神的特徴 */
  mental: Mental;
  /** 経歴（クーポン） */
  coupons: Coupon[];
};

/** 素質 */
export type Nature = {
  /** ID */
  id: number;
  /** 名前 */
  name: string;
  /** 特殊型発生に必要となる遺伝子1数 */
  geneCount: number,
  /** 初期遺伝子 */
  genePattern: string,
  /** 最大レベル */
  maxLevel: number,
  /** 特殊型か */
  isSpecial: boolean,
  /** 身体的特徴 */
  physical: Physical;
  /** 精神的特徴 */
  mental: Mental;
  /** 説明 */
  description?: string,
  /** 派生元の素質の ID */
  baseNaturesId: number[],
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
