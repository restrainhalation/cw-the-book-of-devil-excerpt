import type { Meta } from '@storybook/react';
import { ApplicationWrapper } from './ApplicationWrapper';

const meta: Meta<typeof ApplicationWrapper> = {
  title: 'ApplicationWrapper',
  component: ApplicationWrapper,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    children: {
      options: ['Span'],
      mapping: {
        Span: <span>Span</span>,
      },
    },
  },
};

export default meta;

export const Default = meta
