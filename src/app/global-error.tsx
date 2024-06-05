'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // If we are in development mode, don't send the error to Sentry.
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={500} title="An unexpected error has occurred" />
      </body>
    </html>
  );
}
