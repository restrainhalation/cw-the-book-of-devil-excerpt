'use client'

import React, { FC } from 'react'
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

/**
 * アプリケーションラッパーコンポーネントのパラメータ
 * @typedef ApplicationWrapperParams
 * @property {React.ReactNode} children 小要素
 */

/**
 * アプリケーションラッパーコンポーネント
 * @param {ApplicationWrapperParams} param0 コンポーネントのパラメータ
 * @return {React.FC<ApplicationWrapperParams>} コンポーネント
 */
export const ApplicationWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => (
    <>
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
    </>
  )
