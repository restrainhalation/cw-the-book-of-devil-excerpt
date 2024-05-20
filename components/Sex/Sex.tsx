'use client';

import React, { FC, useState } from 'react';
import { Group, Chip, Tooltip } from '@mantine/core';
import { SEXES } from '@/constants';
import { AbilityInfomationList } from '@/components/AbilityInfomationList/AbilityInfomationList';

/**
 * 性別コンポーネントのパラメータ
 * @typedef SexParams
 * @property {((sexId:number) => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * 性別コンポーネント
 * @param {SexParams} param0 コンポーネントのパラメータ
 * @return {React.FC<SexParams>} コンポーネント
 */
const SexInput: FC<{ onChange?: (sexId:number) => void; }> = ({ onChange }) => {
  // ON になっている性別の ID
  const [selectedId, setSelectedId] = useState<number>();

  /**
   * 当該性別の ON／OFF が変更されたときに実行する
   * 値を変更した際に実行するメソッドがあれば実行する
   * @param {number} sexId 変更があった性別の ID
   */
  const handleChangeSex = (sexId:number) => {
    if (selectedId === sexId) {
      // ON to OFF
      // ---
      // ON になっている性別を undefined にする
      setSelectedId(undefined);
    } else {
      // ON to OFF
      // ---
      // ON になっている性別を変更があった性別の ID にする
      setSelectedId(sexId);
    }

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange(sexId);
  };

  return (
    <>
      <Group justify="center">
        {SEXES.map((sex) => (
          <Tooltip
            key={sex.id}
            label={
              <AbilityInfomationList physical={sex.physical} mental={sex.mental} />
            }
            withArrow
            position="right"
            transitionProps={{ transition: 'pop' }}
          >
            <div>
              <Chip
                key={sex.id}
                value={sex.id}
                variant="outline"
                checked={selectedId === sex.id}
                onClick={() => handleChangeSex(sex.id)}
              >
                {sex.name}
              </Chip>
            </div>
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default SexInput;
