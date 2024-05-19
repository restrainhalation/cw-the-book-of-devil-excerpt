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
import type { Physical } from '@/types';
import { PHYSICAL_ABILITIES } from '@/constants';

/** 身体的特徴の名前の配列 */
const PHYSICAL_ABILITY_NAMES = PHYSICAL_ABILITIES.map((physicalAbility) => physicalAbility.name);

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
      text: '身体的特徴',
    },
    tooltip: {
      callbacks: {
        title: () => '',
        label: (context : any) => `${PHYSICAL_ABILITY_NAMES[context.dataIndex]}: ${context.parsed.x}`,
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
};

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
const PhysicalAbilityChart: FC<{ physicalAbilities: Physical; }> = ({ physicalAbilities }) => {
  const data = {
    labels: PHYSICAL_ABILITY_NAMES,
    datasets: [
      {
        scaleID: 'y',
        label: '身体的特徴',
        data: Object.values(physicalAbilities),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ]
    ,
  };
  return <Bar options={options} data={data} />;
};

export default PhysicalAbilityChart;
