import type { Meta } from '@storybook/react';
import { Nature } from './Nature';

const meta: Meta<typeof Nature> = {
  title: 'Nature',
  component: Nature,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
