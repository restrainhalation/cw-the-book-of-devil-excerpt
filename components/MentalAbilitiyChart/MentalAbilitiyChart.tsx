import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { Mental } from '@/types';
import { MENTAL_ABILITY_NAME } from '@/constants';

/** マイナス値の精神的特徴の名前の配列 */
const NEGATIVE_MENTAL_ABILITY_NAME = Object.values(MENTAL_ABILITY_NAME).map(([negative]) => negative);
/** プラス値の精神的特徴の名前の配列 */
const POSITIVE_MENTAL_ABILITY_NAME = Object.values(MENTAL_ABILITY_NAME).map(([, positive]) => positive);
/** Chart.js の datasets[n].data 向けに使う配列のテンプレート */
const DATA_TEMPLATE = [null, null, null, null, null];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      display: true,
      text: '精神的特徴',
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
};

/**
 * 精神的特徴グラフのコンポーネントのパラメータ
 * @typedef MentalAbilitiyChartParams
 * @property {Mental} mentalAbilities 精神的特徴
 */

/**
 * 精神的特徴グラフのコンポーネント
 * @param {MentalAbilitiyChartParams} param0 コンポーネントのパラメータ
 * @return {React.FC<MentalAbilitiyChartParams>} コンポーネント
 */
const MentalAbilitiyChart: FC<{ mentalAbilities: Mental; }> = ({ mentalAbilities }) => {
  const data = {
    labels: ['', '', '', '', ''],
    datasets: Object.entries(mentalAbilities).map(([key, value], index) => {
      const isPositive = value > 0;
      const tempData = JSON.parse(JSON.stringify(DATA_TEMPLATE));
      tempData[index] = value;
      return {
        scaleID: isPositive ? 'y2' : 'y',
        label: MENTAL_ABILITY_NAME[key][isPositive ? 1 : 0],
        data: tempData,
        backgroundColor: isPositive ? 'rgb(53, 162, 235)' : 'rgb(255, 99, 132)',
      };
    }),
  };
  return <Bar options={options} data={data} />;
};

export default MentalAbilitiyChart;
