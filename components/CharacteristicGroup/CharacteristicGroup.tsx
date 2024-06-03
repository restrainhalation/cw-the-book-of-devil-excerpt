'use client';

import React, { FC, useState } from 'react';
import { Text, rem, Paper, SimpleGrid } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import type { Characteristic } from '@/types';
import classes from '@/components/CharacteristicGroup/CharacteristicGroup.module.css'
import { ReferencedAbilityTag } from '@/components/ReferencedAbilityTag';
import { AbilityTooltip } from '@/components/AbilityTooltip';

/**
 * ２つ１組の特性コンポーネントのパラメータ
 * @typedef CharacteristicGroupParams
 * @property {Characteristic[]} characteristics ２つ１組の特性の配列
 * @property {((characteristicId:number) => void) | undefined} onChange 値を変更した際に実行するメソッド
 * @property {boolean} isLatterHalfOfQuarter 特性４組ごとの後半２組に当たるか
 */

/**
 * ２つ１組の特性コンポーネント
 * @param {CharacteristicGroupParams} param0 コンポーネントのパラメータ
 * @return {React.FC<CharacteristicGroupParams>} コンポーネント
 */
export const CharacteristicGroup: FC<{
  characteristics: Characteristic[];
  onChange?: (characteristicId:number) => void;
  isLatterHalfOfQuarter: boolean;
}> = ({ characteristics, onChange, isLatterHalfOfQuarter }) => {
  // ON になっている特性の ID
  const [selectedId, setSelectedId] = useState<number>();

  /**
   * 当該特性の ON／OFF が変更されたときに実行する
   * 値を変更した際に実行するメソッドがあれば実行する
   * @param {number} characteristicId 変更があった特性の ID
   */
  const handleChangeCharacteristic = (characteristicId:number) => {
    if (selectedId === characteristicId) {
      // ON to OFF
      // ---
      // ON になっている特性を undefined にする
      setSelectedId(undefined);
    } else {
      // OFF to ON
      // ---
      // ON になっている特性を変更があった特性の ID にする
      setSelectedId(characteristicId);
    }

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange(characteristicId);
  };

  return (
    <>
      <SimpleGrid cols={2} className={isLatterHalfOfQuarter ? classes.latterHalfOfQuarter : ''}>
        {characteristics.map((characteristic) => (
          <AbilityTooltip key={characteristic.id} physical={characteristic.physical} mental={characteristic.mental}>
            <Paper
              key={characteristic.id}
              component="button"
              onClick={() => handleChangeCharacteristic(characteristic.id)}
              className={classes.button}
              data-checked={selectedId === characteristic.id || undefined}
            >
              <ReferencedAbilityTag physical={characteristic.physical} mental={characteristic.mental} />
              <Text fw={500} size="sm" lh={1}>
                {characteristic.name}
              </Text>
              {
                selectedId === characteristic.id
                  ? <IconCircleCheckFilled
                      style={{ width: rem(20), height: rem(20) }}
                      className="inline-block"
                      color="var(--mantine-color-blue-6)"
                    />
                  : ''
              }
            </Paper>
          </AbilityTooltip>
        ))}
      </SimpleGrid>
    </>
  );
};
