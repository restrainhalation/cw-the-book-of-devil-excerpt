import type { Meta } from '@storybook/react';
import { Header } from '@/components/Header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
