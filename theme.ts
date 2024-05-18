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
});
