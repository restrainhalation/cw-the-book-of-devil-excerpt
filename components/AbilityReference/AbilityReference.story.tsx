import type { Meta } from '@storybook/react';
import { AbilityReference } from './AbilityReference';

const meta: Meta<typeof AbilityReference> = {
  title: 'AbilityReference',
  component: AbilityReference,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const Default = meta;
