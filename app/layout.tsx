import '@/styles/globals.css';
import React from 'react';
import {
  MantineProvider, ColorSchemeScript, AppShell, AppShellHeader,
  AppShellMain,
} from '@mantine/core';
import { theme } from '../theme';
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JotaiProvider } from '@/components/JotaiProvider';
import nextConfig from '../next.config.mjs'

export { METADATA as metadata } from '@/constants';

const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : ''

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href={`${BASE_PATH}/manifest.webmanifest`} />
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${BASE_PATH}/icon.svg`} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-touch-icon.png`} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <JotaiProvider>
          <MantineProvider theme={theme}>
            <AppShell
              header={{ height: 60 }}
            >
              <AppShellHeader className="flex items-center">
                <Header />
              </AppShellHeader>

              <AppShellMain>
                {children}
                <Footer />
              </AppShellMain>
            </AppShell>
          </MantineProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
