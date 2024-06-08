'use client';

import { Provider } from 'jotai';

interface Props extends React.PropsWithChildren {}

/**
 * Jotai プロバイダーコンポーネント
 * @param {Props} param0 コンポーネントのパラメータ
 * @return {JSX.Element} コンポーネント
 */
export const JotaiProvider = ({ children }: Props): JSX.Element =>
  <Provider>{children}</Provider>

export type { Props as JotaiProviderProps };
