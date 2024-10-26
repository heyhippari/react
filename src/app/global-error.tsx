'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

/**
 * A component that is rendered when an unexpected error occurs.
 * @param error The error that occurred.
 * @param error.error The error that occurred.
 * @returns The component to render.dc
 */
export default function GlobalError({
  error,
}: {
  error: { digest?: string } & Error;
}) {
  useEffect(() => {
    // If we are in development mode, don't send the error to Sentry.
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Error statusCode={500} title="An unexpected error has occurred" />
      </body>
    </html>
  );
}
