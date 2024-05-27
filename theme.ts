'use client';

import { createTheme, MantineBreakpointsValues } from '@mantine/core';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

// Mantine のブレイクポイントを Tailwind のブレイクポイントで上書きする
const tailwindScreens = resolveConfig(tailwindConfig)?.theme?.screens
const breakpoints: Partial<MantineBreakpointsValues> = tailwindScreens
  ? Object.assign(
      {},
      ...Object.entries(tailwindScreens as Record<string, string>)
        .map(([key, value]) => ({ [key]: value.replace(/(\D+)$/, '') }))
    )
  : {}

export const theme = createTheme({
  breakpoints,
  colors: {
    // Mantine colors generator を使い、原作の色 #000096 から作り出したタプル
    gulafu: [
      '#ebebff',
      '#d1d0fa',
      '#9e9df8',
      '#6865f7',
      '#3f39f6',
      '#291df7',
      '#2011f8',
      '#1707dd',
      '#0f04c5',
      '#0000ad',
    ],
  },
});
