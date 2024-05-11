'use client';

import React, { FC, useState } from 'react';
import { Group, Chip } from '@mantine/core';
import { PERIODS } from '@/constants';

/**
 * 年代コンポーネントのパラメータ
 * @typedef PeriodParams
 * @property {((periodId:number) => void) | undefined} onChange 値を変更した際に実行するメソッド
 */

/**
 * 年代コンポーネント
 * @param {PeriodParams} param0 コンポーネントのパラメータ
 * @return {React.FC<PeriodParams>} コンポーネント
 */
const Period: FC<{ onChange?: (periodId:number) => void; }> = ({ onChange }) => {
  // ON になっている年代の ID
  const [selectedId, setSelectedId] = useState<number>();

  /**
   * 当該年代の ON／OFF が変更されたときに実行する
   * 値を変更した際に実行するメソッドがあれば実行する
   * @param {number} periodId 変更があった年代の ID
   */
  const handleChangePeriod = (periodId:number) => {
    if (selectedId === periodId) {
      // ON to OFF
      // ---
      // ON になっている年代を undefined にする
      setSelectedId(undefined);
    } else {
      // ON to OFF
      // ---
      // ON になっている年代を変更があった年代の ID にする
      setSelectedId(periodId);
    }

    // 値を変更した際に実行するメソッドがあれば実行する
    if (onChange) onChange(periodId);
  };

  return (
    <>
      <Group justify="center">
        {Object.values(PERIODS).map((period) => (
            <Chip
              key={period.id}
              value={period.id}
              variant="outline"
              checked={selectedId === period.id}
              onClick={() => handleChangePeriod(period.id)}
            >
              {period.name}
            </Chip>
          ))}
      </Group>
    </>
  );
};

export default Period;
