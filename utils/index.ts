import { DEFAULT_ABILITY } from '@/constants';
import { Ability, Character, Mental, Physical } from '@/types';

/**
 * 指定されたパスの先頭に環境差を埋めるためのパスのプレフィックスを追加した文字列を返却する
 * @param {string} path パス
 * @return {string} プレフィックスを追加したパス
 */
export const addPrefix = (path: string) =>
  `${process.env.NODE_ENV === 'production' ? '/cw-the-book-of-devil-excerpt' : ''}${path}`

/**
 * 指定したキャラクターの情報から能力を計算する
 * @param {Character} character キャラクター
 * @return {Ability} 能力
 */
export const calculateAbility = (character:Character):Ability => {
  // 身体的特徴
  let physicalAbilities: Physical[] = [];
  if (character.sex?.physical) physicalAbilities.push(character.sex.physical);
  if (character.period?.physical) physicalAbilities.push(character.period.physical);
  if (character.nature?.physical) physicalAbilities.push(character.nature.physical);
  physicalAbilities = physicalAbilities.concat(character.characteristics.map((current) => current.physical));
  // 精神的特徴
  let mentalAbilities: Mental[] = [];
  if (character.sex?.mental) mentalAbilities.push(character.sex.mental);
  if (character.period?.mental) mentalAbilities.push(character.period.mental);
  if (character.nature?.mental) mentalAbilities.push(character.nature.mental);
  mentalAbilities = mentalAbilities.concat(character.characteristics.map((current) => current.mental));
  return {
    physical: {
      dexterity: DEFAULT_ABILITY.physical.dexterity +
        physicalAbilities.reduce((sum, physical) => sum + physical.dexterity, 0),
      agility: DEFAULT_ABILITY.physical.agility +
        physicalAbilities.reduce((sum, physical) => sum + physical.agility, 0),
      intelligence: DEFAULT_ABILITY.physical.intelligence +
        physicalAbilities.reduce((sum, physical) => sum + physical.intelligence, 0),
      strength: DEFAULT_ABILITY.physical.strength +
        physicalAbilities.reduce((sum, physical) => sum + physical.strength, 0),
      vitality: DEFAULT_ABILITY.physical.vitality +
        physicalAbilities.reduce((sum, physical) => sum + physical.vitality, 0),
      mind: DEFAULT_ABILITY.physical.mind +
        physicalAbilities.reduce((sum, physical) => sum + physical.mind, 0),
    },
    mental: {
      aggressive: DEFAULT_ABILITY.mental.aggressive +
        mentalAbilities.reduce((sum, mental) => sum + mental.aggressive, 0),
      cheerful: DEFAULT_ABILITY.mental.cheerful +
        mentalAbilities.reduce((sum, mental) => sum + mental.cheerful, 0),
      brave: DEFAULT_ABILITY.mental.brave +
        mentalAbilities.reduce((sum, mental) => sum + mental.brave, 0),
      cautious: DEFAULT_ABILITY.mental.cautious +
        mentalAbilities.reduce((sum, mental) => sum + mental.cautious, 0),
      trickish: DEFAULT_ABILITY.mental.trickish +
        mentalAbilities.reduce((sum, mental) => sum + mental.trickish, 0),
    },
  };
}
