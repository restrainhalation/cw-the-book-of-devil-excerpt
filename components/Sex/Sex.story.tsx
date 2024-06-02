import type { Meta } from '@storybook/react';
import { Sex } from './Sex';

const meta: Meta<typeof Sex> = {
  title: 'Sex',
  component: Sex,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
