import bundleAnalyzer from '@next/bundle-analyzer';

// 環境差を埋めるためのパスのプレフィックス
const prefix = process.env.NODE_ENV === 'production' ? '/training-github-workflow' : ''

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  images: { unoptimized: true },
  assetPrefix: prefix,
  basePath: prefix,
  output: 'export',

  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
});
