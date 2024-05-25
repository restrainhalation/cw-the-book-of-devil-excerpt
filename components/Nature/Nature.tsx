'use client';

import React, { FC, useState } from 'react';
import {
  Badge, Text, Group, Tooltip, SimpleGrid, ThemeIcon, UnstyledButton, rem,
} from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { NATURES } from '@/constants';
import { AbilityInfomationList } from '@/components/AbilityInfomationList/AbilityInfomationList';
import classes from './Nature.module.css';
import { Nature } from '@/types';

/**
 * 素質情報タグコンポーネントのパラメータ
 * @typedef NatureDescriptionTagsParams
 * @property {Nature} nature 素質
 */

/**
 * 素質情報タグ
 * @param {NatureDescriptionTagsParams} param0 コンポーネントのパラメータ
 * @return {React.FC<NatureDescriptionTagsParams>} コンポーネント
 */
const NatureDescriptionTags: FC<{
  nature: Nature,
}> = ({ nature }) => nature.maxLevel !== 10 || nature.baseNaturesId.length
    ? (
    <>
      <Group
        align="flex-start"
        className="grow my-1"
        gap={6}
      >
        {
          nature.maxLevel !== 10
            ? <Badge size="sm" radius="xs" color="dark.1">
                LV {nature.maxLevel}
              </Badge>
            : ''
        }
        {nature.baseNaturesId.map((baseNaturesId) => {
          const _nature = NATURES.find((current) => current.id === baseNaturesId)
          return _nature
            ? <Badge key={_nature?.id} size="sm" radius="xs" color="gray.5">
                {_nature?.name}
              </Badge>
            : ''
        })}
      </Group>
    </>
  )
  : ''

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
      <SimpleGrid cols={3} spacing={12}>
        {
          NATURES.map((nature) => (
            <Tooltip
              key={nature.id}
              label={
                <AbilityInfomationList physical={nature.physical} mental={nature.mental} />
              }
              withArrow
              position="right"
              transitionProps={{ transition: 'pop' }}
            >
              <div className="flex">
                <UnstyledButton
                  className={
                    selectedId === nature.id
                      ? nature.isSpecial
                        ? `${classes.nature} ${classes.isSpecial}`
                        : classes.nature
                      : classes.nature
                  }
                  key={nature.id}
                  value={nature.id}
                  onClick={() => handleChangeNature(nature.id)}
                  data-checked={selectedId === nature.id || undefined}
                >
                  <Group wrap="nowrap" align="flex-start" className="grow" gap={12}>
                    <ThemeIcon
                      size={34}
                      variant="default"
                      radius="md"
                      className={classes.icon}
                    >
                      <nature.icon style={{ width: rem(22), height: rem(22) }} />
                    </ThemeIcon>
                    <div className="grow">
                      <div className={classes.name}>
                        <Text>
                          {nature.name}
                        </Text>
                        {
                          selectedId === nature.id
                            ? <IconCircleCheckFilled
                                style={{ width: rem(18), height: rem(18) }}
                                className={classes.icon}
                              />
                            : ''
                        }
                      </div>
                      <Text size="xs" c="dimmed">
                        {nature.description}
                      </Text>
                      <NatureDescriptionTags nature={nature} />
                    </div>
                  </Group>
                </UnstyledButton>
              </div>
            </Tooltip>
          ))
        }
      </SimpleGrid>
    </>
  );
};

export default NatureInput;
