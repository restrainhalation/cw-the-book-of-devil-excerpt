'use client';

import React, { FC, useState } from 'react';
import { Text, UnstyledButton, SimpleGrid } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { SEXES } from '@/constants';
import classes from '@/components/Sex/Sex.module.css';
import { ReferencedAbilityTag } from '@/components/ReferencedAbilityTag';
import { AbilityTooltip } from '@/components/AbilityTooltip';

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
export const Sex: FC<{ onChange?: (sexId:number) => void; }> = ({ onChange }) => {
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
      <SimpleGrid cols={2} spacing={14}>
        {SEXES.map((sex) => (
          <AbilityTooltip key={sex.id} physical={sex.physical} mental={sex.mental}>
            <UnstyledButton
              onClick={() => handleChangeSex(sex.id)}
              data-sex={sex.name.toLocaleLowerCase()}
            >
              <div className={classes.wrapper} data-checked={selectedId === sex.id || undefined}>
                <ReferencedAbilityTag physical={sex.physical} mental={sex.mental} />
                <div>
                  <Text className={classes.name}>
                    <sex.icon />
                  </Text>
                  <Text className={classes.overlay} role="presentation">
                    {sex.name}
                  </Text>
                </div>
                {
                  selectedId === sex.id
                    ? <IconCircleCheckFilled
                        className={classes.checked}
                      />
                    : ''
                }
              </div>
            </UnstyledButton>
          </AbilityTooltip>
        ))}
      </SimpleGrid>
    </>
  );
};
