import '@/styles/globals.css';
import React from 'react';
import {
  MantineProvider, ColorSchemeScript, AppShell, AppShellHeader,
  AppShellMain,
} from '@mantine/core';
import { theme } from '../theme';
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
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
      </body>
    </html>
  );
}
