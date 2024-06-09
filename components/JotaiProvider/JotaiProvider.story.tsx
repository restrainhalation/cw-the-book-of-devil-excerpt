import type { Meta, StoryObj } from '@storybook/react';
import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';
import { Button, List } from '@mantine/core';
import { JotaiProvider } from './JotaiProvider';
import { keyForResetAtom } from '@/store';

const meta: Meta<typeof JotaiProvider> = {
  title: 'JotaiProvider',
  component: JotaiProvider,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof JotaiProvider>;

const Counter: FC<{ name: string; }> = ({ name }) => {
  const [keyForReset, setKeyForReset] = useAtom(keyForResetAtom)
  useEffect(
    () => setKeyForReset(0),
    [setKeyForReset]
  );
  const countUp = () => {
    const count:number = Number(keyForReset)
    setKeyForReset(count + 1)
  }
  return (
    <>
      {name}: {keyForReset}
      <Button size="xs" m="xs" onClick={countUp}>Count Up</Button>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <List>
        <List.Item><Counter name="Without provider - A" /></List.Item>
        <List.Item><Counter name="Without provider - B" /></List.Item>
        <List.Item><JotaiProvider><Counter name="With provider - C" /></JotaiProvider></List.Item>
        <List.Item><JotaiProvider><Counter name="With provider - D" /></JotaiProvider></List.Item>
      </List>
    </>
  ),
};
