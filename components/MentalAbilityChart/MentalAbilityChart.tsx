import React, { FC, useState } from 'react';
import { Plugin } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Skeleton, useMantineTheme } from '@mantine/core';
import type { Mental } from '@/types';
import { MENTAL_ABILITIES } from '@/constants';

/** マイナス値の精神的特徴の名前の配列 */
const NEGATIVE_MENTAL_ABILITY_NAME = MENTAL_ABILITIES.map((mentalAbility) => mentalAbility.names1[0]);
/** プラス値の精神的特徴の名前の配列 */
const POSITIVE_MENTAL_ABILITY_NAME = MENTAL_ABILITIES.map((mentalAbility) => mentalAbility.names1[1]);
/** Chart.js の datasets[n].data 向けに使う配列のテンプレート */
const DATA_TEMPLATE = [null, null, null, null, null];

/** Chart.js の設定 */
export const options = {
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
        label: (context : any) =>
          `${context.dataset.label}: ${context.parsed.x < 0 ? context.parsed.x * -1 : context.parsed.x}`,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      suggestedMin: -4,
      suggestedMax: 4,
    },
    y: {
      position: 'left' as const,
      stacked: true,
      ticks: {
        callback: (value: any, index: number) => NEGATIVE_MENTAL_ABILITY_NAME[index],
      },
    },
    y2: {
      position: 'right' as const,
      stacked: true,
      ticks: {
        callback: (value: any, index: number) => POSITIVE_MENTAL_ABILITY_NAME[index],
      },
    },
  },
  maintainAspectRatio: false,
};

/**
 * 精神的特徴グラフのコンポーネントのパラメータ
 * @typedef MentalAbilityChartParams
 * @property {Mental} mentalAbilities 精神的特徴
 */

/**
 * 精神的特徴グラフのコンポーネント
 * @param {MentalAbilityChartParams} param0 コンポーネントのパラメータ
 * @return {React.FC<MentalAbilityChartParams>} コンポーネント
 */
export const MentalAbilityChart: FC<{ mentalAbilities: Mental; }> = ({ mentalAbilities }) => {
  const { colors } = useMantineTheme();
  const [loading, setLoading] = useState(true);
  const [plugins] = useState<Plugin<'bar'>>({
    id: 'handleEvent',
    afterInit: () => {
      setLoading(false)
    },
  });
  const data = {
    labels: ['', '', '', '', ''],
    datasets: Object.entries(mentalAbilities).map(([key, value], index) => {
      const isPositive = value > 0;
      const tempData = JSON.parse(JSON.stringify(DATA_TEMPLATE));
      tempData[index] = value;
      return {
        scaleID: isPositive ? 'y2' : 'y',
        label: MENTAL_ABILITIES.find((mentalAbility) => mentalAbility.id === key)?.names1[isPositive ? 1 : 0] || '',
        data: tempData,
        backgroundColor: isPositive ? colors.blue[6] : colors.pink[4],
      };
    }),
  };
  return (
    <Skeleton visible={loading} className="h-72">
      <Bar
        options={options}
        data={data}
        plugins={[plugins]}
        height={288}
      />
    </Skeleton>
  )
};
