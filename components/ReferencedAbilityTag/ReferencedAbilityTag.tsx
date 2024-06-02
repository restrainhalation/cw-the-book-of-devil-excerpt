import { Badge } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { Mental, Physical } from '@/types'
import { abilityReferenceAtom } from '@/store'
import classes from '@/components/ReferencedAbilityTag/ReferencedAbilityTag.module.css'

/**
 * 参照中能力タグコンポーネントのパラメータ
 * @typedef ReferencedAbilityTagParams
 * @property {Physical} physical 身体的能力
 * @property {Mental} mental 精神的能力
 */

/**
 * 参照中能力タグコンポーネント
 * @param {ReferencedAbilityTagParams} param0 コンポーネントのパラメータ
 * @return {React.FC<ReferencedAbilityTagParams>} コンポーネント
 */
export const ReferencedAbilityTag: FC<{
  physical: Physical,
  mental: Mental,
}> = ({ physical, mental }) => {
  // Jotai の能力参照 atom
  const abilityReference = useAtomValue(abilityReferenceAtom)
  // この性別・年代・素質・特性が持つ能力値のマップ
  const abilityMap = Object.assign(
    {},
    ...Object.entries(physical).map(([key, value]) => ({ [key]: value })),
    ...Object.entries(mental).map(([key, value]) => ({ [key]: value })),
  )
  // この性別・年代・素質・特性における、参照している能力の値
  const value = abilityMap[abilityReference]
  return (
    value === 0 || value === undefined
      ? ''
      : <Badge
          size="xs"
          className={classes.referencedAbility}
          data-positive-value={value > 0 || undefined}
          data-negative-value={value < 0 || undefined}
        >
          {value}
        </Badge>
  )
}
