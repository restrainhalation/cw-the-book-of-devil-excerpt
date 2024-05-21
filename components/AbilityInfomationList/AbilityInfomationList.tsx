import React, { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Badge, Text, Group, rem } from '@mantine/core';
import {
  Icon, IconProps,
  IconArrowUpRight, IconArrowDownRight, IconArrowRight,
  IconCircleDashed,
} from '@tabler/icons-react';
import type { Physical, Mental } from '@/types';
import { PHYSICAL_ABILITIES, MENTAL_ABILITIES } from '@/constants';

/** 能力の上下がない場合の便宜上の ID */
const UNAFFECTED_ID = 'unaffected'

/** 能力の上下がない場合の便宜上の名前 */
const UNAFFECTED_NAME = 'なし'

/** 能力の ID と出力順のマップ */
const ABILITY_ORDER_MAP: { [id: string]: number } = Object.assign(
  {},
  ...PHYSICAL_ABILITIES.map((physicalAbility) => ({ [physicalAbility.id]: physicalAbility.order })),
  ...MENTAL_ABILITIES.map((mentalAbility) => ({ [mentalAbility.id]: mentalAbility.order }))
);

/** 能力の ID とアイコンコンポーネントのマップ */
const ABILITY_ICON_MAP: {
  [id: string]: ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>
} = Object.assign(
  { [UNAFFECTED_ID]: IconCircleDashed },
  ...PHYSICAL_ABILITIES.map((physicalAbility) => ({ [physicalAbility.id]: physicalAbility.icon })),
  ...MENTAL_ABILITIES.map((mentalAbility) => ({ [mentalAbility.id]: mentalAbility.icon }))
);

/**
 * 能力名タグコンポーネントのパラメータ
 * @typedef AbilityNameTagParams
 * @property {string} id 能力 ID
 * @property {boolean} isPhysical 身体的特徴であるか
 */

/**
 * 能力名タグコンポーネント
 * @param {AbilityNameTagParams} param0 コンポーネントのパラメータ
 * @return {React.FC<AbilityNameTagParams>} コンポーネント
 */
const AbilityNameTag: FC<{
  id: string,
  isPhysical: boolean,
}> = ({ id, isPhysical }) => {
  const AbilityNameTagIcon = ABILITY_ICON_MAP[id];
  return (
    <Badge
      size="sm"
      color={
        id === UNAFFECTED_ID
          ? 'gray.6'
          : isPhysical
            ? 'violet.5'
            : 'violet.9'
      }
      leftSection={
        <AbilityNameTagIcon style={{ width: rem(12), height: rem(12) }} />
      }
    >
      {
        id === UNAFFECTED_ID
          ? UNAFFECTED_NAME
          : isPhysical
            ? (PHYSICAL_ABILITIES.find((physicalAbility) => physicalAbility.id === id)?.name || '')
            : (MENTAL_ABILITIES.find((mentalAbility) => mentalAbility.id === id)?.nameOfBoth1 || '')
      }
    </Badge>
  );
};

/**
 * 能力情報コンポーネントのパラメータ
 * @typedef AbilityInfomationParams
 * @property {string} id 能力 ID
 * @property {number} value 能力の値
 * @property {boolean | undefined} isPhysical 身体的特徴であるか
 * @property {boolean | undefined} isPositive 精神的特徴におけるポジティブ値であるか
 */

/**
 * 能力情報コンポーネント
 * @param {AbilityInfomationParams} param0 コンポーネントのパラメータ
 * @return {React.FC<AbilityInfomationParams>} コンポーネント
 */
const AbilityInfomation: FC<{
  id: string,
  value: number,
  isPhysical?: boolean,
  isPositive?: boolean,
}> = ({ id, value, isPhysical, isPositive }) => {
  const DiffIcon = value === 0
    ? IconArrowRight
    : isPositive
      ? IconArrowUpRight
      : IconArrowDownRight;
  const valueTextColorClass = value === 0
    ? 'text-gray-500'
    : isPositive
      ? 'text-teal-700'
      : 'text-red-800';
  const valueClasses = `${valueTextColorClass} leading-none flex items-center`;
  return (
    <Group justify="space-between" m="2" className="w-40">
      <AbilityNameTag id={id} isPhysical={!!isPhysical} />
      <Text className={valueClasses}>
        <span>{value}</span>
        <DiffIcon size="1rem" stroke={1.5} className="flex" />
      </Text>
    </Group>
  );
};

/**
 * 能力情報一覧コンポーネントのパラメータ
 * @typedef AbilityInfomationListParams
 * @property {Physical} physical 身体的特徴
 * @property {Mental} mental 精神的特徴
 */

/**
 * 能力情報一覧コンポーネント
 * @param {AbilityInfomationListParams} param0 コンポーネントのパラメータ
 * @return {React.FC<AbilityInfomationListParams>} コンポーネント
 */
export const AbilityInfomationList: FC<{
  physical: Physical,
  mental: Mental
}> = ({ physical, mental }) => {
  const physicalValues = Object.entries(physical)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => ({
      id: key,
      value,
      isPhysical: true,
      isPositive: value > 0,
    }));
  const mentalValues = Object.entries(mental)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => ({
      id: key,
      value,
      isPhysical: false,
      isPositive: value > 0,
    }));
  const abilities = physicalValues
    .concat(mentalValues)
    .sort((a, b) =>
      a.isPhysical !== b.isPhysical
        ? (
            a.isPhysical
              ? -1
              : 1
          )
        : a.isPhysical === b.isPhysical &&
            (ABILITY_ORDER_MAP[a.id] || 0) < (ABILITY_ORDER_MAP[b.id] || 0)
          ? -1
          : 1
  )
  return (
    <>
      {abilities.length > 0
        ? abilities
          .map((ability) =>
            <AbilityInfomation
              key={ability.id}
              id={ability.id}
              value={ability.value}
              isPhysical={ability.isPhysical}
              isPositive={ability.isPositive}
            />
          )
        : <AbilityInfomation
            id={UNAFFECTED_ID}
            value={0}
          />
      }
    </>
  );
};
