import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import { useMantineTheme } from '@mantine/core';
import type { Physical } from '@/types';
import { PHYSICAL_ABILITIES } from '@/constants';

/** 身体的特徴の名前の配列 */
const PHYSICAL_ABILITY_NAMES = PHYSICAL_ABILITIES.map((physicalAbility) => physicalAbility.name);

/** アノテーションのデフォルトの設定値 */
const DEFAULT_ANNOTATION_OPTIONS = {
  type: 'line' as const,
  borderWidth: 1.5,
  borderDash: [2, 2],
  scaleID: 'x',
}

/**
 * アノテーションの設定を取得する
 * パラメータに追加の設定値を指定すると、デフォルトの設定にその値を追加・上書きした値になる
 * @param {Object | undefined} annotationSettings 追加の設定値
 * @return {Object} アノテーションの設定
 */
const getAnnotation = (annotationSettings?: Object) => (
  {
    ...DEFAULT_ANNOTATION_OPTIONS,
    ...annotationSettings,
  }
)

/**
 * 身体的特徴のグラフに適用する設定の値を取得する
 * @param {string} annotationBorderColor アノテーションの線の色
 * @return {Object} 身体的特徴のグラフに適用する設定
 */
const getOptions = (annotationBorderColor: string) => ({
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: () => '',
        label: (context : any) => `${PHYSICAL_ABILITY_NAMES[context.dataIndex]}: ${context.parsed.x}`,
      },
    },
    annotation: {
      annotations: {
        lowerLimit: getAnnotation({
          borderColor: annotationBorderColor,
          value: 1,
        }),
        upperLimit: getAnnotation({
          borderColor: annotationBorderColor,
          value: 12,
        }),
      },
    },
  },
  scales: {
    x: {
      suggestedMax: 15,
    },
    y: {
      position: 'left' as const,
      ticks: {
        callback: (value: any, index: number) => PHYSICAL_ABILITY_NAMES[index],
      },
    },
  },
})

/**
 * 身体的特徴グラフのコンポーネントのパラメータ
 * @typedef PhysicalAbilityChartParams
 * @property {Physical} physicalAbilities 身体的特徴
 */

/**
 * 身体的特徴グラフのコンポーネント
 * @param {PhysicalAbilityChartParams} param0 コンポーネントのパラメータ
 * @return {React.FC<PhysicalAbilityChartParams>} コンポーネント
 */
export const PhysicalAbilityChart: FC<{ physicalAbilities: Physical; }> = ({ physicalAbilities }) => {
  const { colors } = useMantineTheme();
  const data = {
    labels: PHYSICAL_ABILITY_NAMES,
    datasets: [
      {
        scaleID: 'y',
        label: '身体的特徴',
        data: Object.values(physicalAbilities),
        backgroundColor: colors.blue[6],
      },
    ]
    ,
  };

  return (
    <Bar
      options={getOptions(colors.pink[4])}
      data={data}
    />
  );
};
