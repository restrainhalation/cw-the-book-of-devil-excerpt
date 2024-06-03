import type { Meta } from '@storybook/react';
import { Period } from './Period';

const meta: Meta<typeof Period> = {
  title: 'Period',
  component: Period,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
