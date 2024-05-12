'use client';

import React, { FC, useState } from 'react';
import { Group, Chip } from '@mantine/core';
import { NATURES } from '@/constants';

/**
 * 素質コンポーネントのパラメータ
 * @typedef NatureParams
 * @property {((natureId:number) => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * 素質コンポーネント
 * @param {NatureParams} param0 コンポーネントのパラメータ
 * @return {React.FC<NatureParams>} コンポーネント
 */
const NatureInput: FC<{ onChange?: (natureId:number) => void; }> = ({ onChange }) => {
  // ON になっている素質の ID
  const [selectedId, setSelectedId] = useState<number>();

  /**
   * 当該素質の ON／OFF が変更されたときに実行する
   * 値を変更した際に実行するメソッドがあれば実行する
   * @param {number} natureId 変更があった素質の ID
   */
  const handleChangeNature = (natureId:number) => {
    if (selectedId === natureId) {
      // ON to OFF
      // ---
      // ON になっている素質を undefined にする
      setSelectedId(undefined);
    } else {
      // ON to OFF
      // ---
      // ON になっている素質を変更があった素質の ID にする
      setSelectedId(natureId);
    }

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange(natureId);
  };

  return (
    <>
      <Group justify="center">
        {Object.values(NATURES).map((nature) => (
            <Chip
              key={nature.id}
              value={nature.id}
              variant="outline"
              checked={selectedId === nature.id}
              onClick={() => handleChangeNature(nature.id)}
            >
              {nature.name}
            </Chip>
          ))}
      </Group>
    </>
  );
};

export default NatureInput;
