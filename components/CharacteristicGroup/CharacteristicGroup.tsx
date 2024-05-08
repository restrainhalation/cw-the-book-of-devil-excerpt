'use client';

import React, { FC } from 'react';
import { useAtom } from 'jotai';
import { Group, Chip } from '@mantine/core';
import type { Characteristic } from '@/types';
import { characterAtom } from '@/store';
import { CHARACTERISTICS } from '@/constants';

/**
 * ２つ１組の特性コンポーネントのパラメータ
 * @typedef CharacteristicGroupParams
 * @property {Characteristic[]} characteristics ２つ１組の特性の配列
 * @property {(() => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * ２つ１組の特性コンポーネント
 * @param {CharacteristicGroupParams} param0 コンポーネントのパラメータ
 * @returns {React.FC<CharacteristicGroupParams>} コンポーネント
 */
const CharacteristicGroup: FC<{
  characteristics: Characteristic[];
  onChange?: () => void;
}> = ({ characteristics, onChange }) => {
  // Jotai のキャラクター atom
  const [character, setCharacter] = useAtom(characterAtom);

  /**
   * 当該特性の ON／OFF が変更されたときに実行する
   * ・Jotai のキャラクター atom を更新する
   * ・値を変更した際に実行するメソッドがあれば実行する
   * @param characteristicId 特性 ID
   * @returns void
   */
  const handleChangeCharacteristic = (characteristicId:number) => {
    // ID をもとに、操作された特性を特定する
    const changedCharacteristic = CHARACTERISTICS.find((current) => current.id === characteristicId);
    // 特性を特定できないとき、実装内の定数の整合性が取れていないため、中断する
    if (!changedCharacteristic) return;

    // Jotai を参照し、キャラクター atom に ID が示す特性が含まれるか
    const hasStoredCharacteristic = hasStoredCharacteristicById(characteristicId);

    // Jotai のキャラクター atom から、操作された特性と同じグループの特性があれば取り除く
    character.characteristics = character.characteristics
      .filter((current) => current.group !== changedCharacteristic.group);

    if (!hasStoredCharacteristic) {
      // 新たな特性が付加されたとき
      // ---
      // Jotai のキャラクター atom に ID を追加する
      character.characteristics.push(changedCharacteristic);
    }

    // Jotai のキャラクター atom を更新する
    setCharacter(character);

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange();
  };

  /**
   * Jotai を参照し、キャラクター atom に ID が示す特性が含まれるかを返す
   * @param characteristicId 特性 ID
   * @returns TRUE: 当該特性を含む, FALSE: 当該特性を含まない
   */
  const hasStoredCharacteristicById = (characteristicId:number) =>
    !!character.characteristics.find((current) => current.id === characteristicId);

  return (
    <>
      <Group justify="center">
        {characteristics.map((characteristic) => (
          <Chip
            key={characteristic.id}
            value={characteristic.id}
            variant="outline"
            checked={hasStoredCharacteristicById(characteristic.id)}
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
