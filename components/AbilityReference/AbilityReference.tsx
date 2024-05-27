import React, { FC, useState, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Text, rem, Paper, ThemeIcon, SimpleGrid } from '@mantine/core';
import { Icon, IconEye, IconProps } from '@tabler/icons-react';
import { MENTAL_ABILITIES, PHYSICAL_ABILITIES } from '@/constants';
import classes from '@/components/AbilityReference/AbilityReference.module.css'

/**
 * 能力参照コンポーネントのパラメータ
 * @typedef AbilityReferenceParams
 * @property {((abilityId:string) => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * 能力参照コンポーネント
 * @param {AbilityReferenceParams} param0 コンポーネントのパラメータ
 * @return {React.FC<AbilityReferenceParams>} コンポーネント
 */
export const AbilityReference: FC<{
  onChange?: (abilityId:string) => void;
}> = ({ onChange }) => {
  // ON になっている能力の ID
  const [selectedId, setSelectedId] = useState<string>();

  /**
   * 当該能力の ON／OFF が変更されたときに実行する
   * 値を変更した際に実行するメソッドがあれば実行する
   * @param {string} abilityId 変更があった能力の ID
   */
  const handleChangeReference = (abilityId:string) => {
    if (selectedId === abilityId) {
      // ON to OFF
      // ---
      // ON になっている能力を undefined にする
      setSelectedId(undefined);
    } else {
      // ON to OFF
      // ---
      // ON になっている能力を変更があった能力の ID にする
      setSelectedId(abilityId);
    }

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange(abilityId);
  };

  /**
   * 能力ボタンコンポーネントのパラメータ
   * @typedef AbilityButtonParams
   * @property {string} id 能力 ID
   * @property {string} name 能力の名前
   * @property {ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>} icon 能力のアイコン
   * @property {boolean | undefined} isPhysical 身体的特徴であるか
   */

  /**
   * 能力ボタンコンポーネント
   * @param {AbilityButtonParams} param0 コンポーネントのパラメータ
   * @return {React.FC<AbilityButtonParams>} コンポーネント
   */
  const AbilityButton: FC<{
    id: string,
    name: string,
    icon: ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>,
    isPhysical?: boolean,
  }> = ({ id, name, icon, isPhysical }) => {
    const AbilityIcon = icon
    return (
      <Paper
        key={id}
        component="button"
        radius="md"
        withBorder
        className={classes.card}
        onClick={() => handleChangeReference(id)}
        data-checked={selectedId === id || undefined}
        data-is-physical={isPhysical === true || undefined}
      >
        <div className={classes.iconWrapper}>
          <ThemeIcon className={classes.icon} size={30} radius={30}>
            <AbilityIcon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
          </ThemeIcon>
        </div>

        <div className="flex items-center justify-between">
          <Text fw={500} className={classes.title}>
            {name}
          </Text>
          {
            selectedId === id
              ? <IconEye className={classes.checked} />
              : ''
          }
        </div>
      </Paper>
    )
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <div>
          {
            PHYSICAL_ABILITIES.map((physicalAbility) => (
              <AbilityButton
                key={physicalAbility.id}
                id={physicalAbility.id}
                name={physicalAbility.name}
                icon={physicalAbility.icon}
                isPhysical
              />
            ))
          }
        </div>
        <div>
          {
            MENTAL_ABILITIES.map((mentalAbility) => (
              <AbilityButton
                key={mentalAbility.id}
                id={mentalAbility.id}
                name={mentalAbility.nameOfBoth1}
                icon={mentalAbility.icon}
              />
            ))
          }
        </div>
      </SimpleGrid>
    </>
  );
};
