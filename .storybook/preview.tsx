import '@/styles/globals.css';
import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import { theme } from '../theme';
import { useSetAtom } from 'jotai';
import { abilityReferenceAtom, showAbilityTooltipAtom, showIntroductionAtom, showSpecialNatureAtom } from '../store';
import { registPluginOfChart } from '../lib';

// Chart.js へプラグインを登録する
registPluginOfChart()

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');
  const setAbilityReference = useSetAtom(abilityReferenceAtom)
  const setShowAbilityTooltip = useSetAtom(showAbilityTooltipAtom)
  const setShowSpecialNature = useSetAtom(showSpecialNatureAtom)
  const setShowIntroduction = useSetAtom(showIntroductionAtom)

  useEffect(() => {
    setAbilityReference('')
    setShowAbilityTooltip(false)
    setShowSpecialNature(false)
    setShowIntroduction(false)
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
];
