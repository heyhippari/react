import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";
import Icons from "unplugin-icons/webpack";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    loader: "custom",
    loaderFile: "./src/core/utils/image-loader.ts",
  },
  reactStrictMode: true,
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- There seems to be a bug in the types
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- There seems to be a bug in the types
    return config;
  },
};

export default nextConfig;

withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  org: "kanojo",

  project: "frontend",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
