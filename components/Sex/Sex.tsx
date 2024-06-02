'use client';

import React, { FC, useState } from 'react';
import { Text, Tooltip, UnstyledButton, SimpleGrid } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { useAtomValue } from 'jotai';
import { SEXES } from '@/constants';
import { AbilityInfomationList } from '@/components/AbilityInfomationList';
import classes from '@/components/Sex/Sex.module.css';
import { ReferencedAbilityTag } from '@/components/ReferencedAbilityTag';
import { showAbilityTooltipAtom } from '@/store';

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

  // Jotai の能力ツールチップ表示 atom
  const showAbilityTooltip = useAtomValue<boolean>(showAbilityTooltipAtom)

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

          <Tooltip
            key={sex.id}
            label={
              <AbilityInfomationList physical={sex.physical} mental={sex.mental} />
            }
            withArrow
            position="right"
            transitionProps={{ transition: 'pop' }}
            disabled={!showAbilityTooltip}
          >
            <UnstyledButton
              className={
                selectedId === sex.id
                  ? classes.selected
                  : ''
              }
              onClick={() => handleChangeSex(sex.id)}
              data-sex={sex.name.toLocaleLowerCase()}
            >
              <div className={classes.wrapper}>
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
          </Tooltip>
        ))}
      </SimpleGrid>
    </>
  );
};
