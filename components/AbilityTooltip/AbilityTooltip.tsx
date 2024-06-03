'use client'

import React, { FC } from 'react'
import { Tooltip } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { AbilityInfomationList } from '@/components/AbilityInfomationList'
import { showAbilityTooltipAtom } from '@/store'
import { Mental, Physical } from '@/types'

/**
 * 能力ツールチップコンポーネントのパラメータ
 * @typedef AbilityTooltipParams
 * @property {React.ReactNode} children 小要素
 * @property {Physical} physical 身体的特徴
 * @property {Mental} mental 精神的特徴
 */

/**
 * 能力ツールチップコンポーネント
 * @param {AbilityTooltipParams} param0 コンポーネントのパラメータ
 * @return {React.FC<AbilityTooltipParams>} コンポーネント
 */
export const AbilityTooltip: FC<{
  children: React.ReactNode;
  physical: Physical;
  mental: Mental;
}> = ({ children, physical, mental }) => {
  // Jotai の能力ツールチップ表示 atom
  const showAbilityTooltip = useAtomValue<boolean>(showAbilityTooltipAtom)
  return (
    <>
      <Tooltip
        label={
          <AbilityInfomationList physical={physical} mental={mental} />
        }
        withArrow
        position="right"
        transitionProps={{ transition: 'pop' }}
        disabled={!showAbilityTooltip}
      >
        {children}
      </Tooltip>
    </>
  )
}
