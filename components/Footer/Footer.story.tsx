import type { Meta } from '@storybook/react';
import { Footer } from '@/components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
