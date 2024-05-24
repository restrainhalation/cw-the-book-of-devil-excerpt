'use client';

import React, { FC, useState } from 'react';
import { Tooltip, SimpleGrid, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { PERIODS } from '@/constants';
import { AbilityInfomationList } from '@/components/AbilityInfomationList/AbilityInfomationList';
import classes from '@/components/Period/Period.module.css';

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
      <SimpleGrid cols={4}>
        {PERIODS.map((period) => (
          <Tooltip
            key={period.id}
            label={
              <AbilityInfomationList physical={period.physical} mental={period.mental} />
            }
            withArrow
            position="right"
            transitionProps={{ transition: 'pop' }}
          >
            <div>
              <UnstyledButton
                onClick={() => handleChangePeriod(period.id)}
                data-checked={selectedId === period.id || undefined}
                className={classes.button}
              >
                <div className={classes.body}>
                  <Text c="dimmed" size="xs" lh={1} mb={5}>
                    {period.subName}
                  </Text>
                  <Text fw={500} size="sm" lh={1}>
                    {period.name}
                  </Text>
                </div>
                {
                  selectedId === period.id
                    ? <IconCircleCheckFilled
                        style={{ width: rem(25), height: rem(25) }}
                        className="inline-block"
                        color="var(--mantine-color-blue-6)"
                      />
                    : ''
                }
              </UnstyledButton>
            </div>
          </Tooltip>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Period;
