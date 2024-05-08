'use client';

import React, { FC, useState } from 'react';
import { Group, Chip } from '@mantine/core';
import type { Characteristic } from '@/types';

/**
 * ２つ１組の特性コンポーネントのパラメータ
 * @typedef CharacteristicGroupParams
 * @property {Characteristic[]} characteristics ２つ１組の特性の配列
 * @property {((characteristicId:number) => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * ２つ１組の特性コンポーネント
 * @param {CharacteristicGroupParams} param0 コンポーネントのパラメータ
 * @return {React.FC<CharacteristicGroupParams>} コンポーネント
 */
const CharacteristicGroup: FC<{
  characteristics: Characteristic[];
  onChange?: (characteristicId:number) => void;
}> = ({ characteristics, onChange }) => {
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
      <Group justify="center">
        {characteristics.map((characteristic) => (
          <Chip
            key={characteristic.id}
            value={characteristic.id}
            variant="outline"
            checked={selectedId === characteristic.id}
            onClick={() => handleChangeCharacteristic(characteristic.id)}
          >
            {characteristic.name}
          </Chip>
        ))}
      </Group>
    </>
  );
};

export default CharacteristicGroup;
