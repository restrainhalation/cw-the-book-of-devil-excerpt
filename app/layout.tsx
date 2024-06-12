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
import { addPrefix } from '@/utils';

export { METADATA as metadata } from '@/constants';

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href={addPrefix('/manifest.webmanifest')} />
        <link rel="icon" href={addPrefix('/favicon.ico')} sizes="any" />
        <link rel="icon" href={addPrefix('/icon.svg')} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={addPrefix('/apple-touch-icon.png')} />
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
