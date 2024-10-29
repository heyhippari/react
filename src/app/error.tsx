'use client';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

/**
 * Error component.
 * @param error The error that caused the error page to be rendered.
 * @param error.error The error that caused the error page to be rendered.
 * @param error.reset The function to call to attempt to recover from the error.
 * @returns The error page component.
 */
export default function Error({
  error,
  reset,
}: {
  error: { digest?: string } & Error;
  reset: () => void;
}) {
  useEffect(() => {
    // If we're in development, log the error to the console
    if (process.env.NODE_ENV === 'development') {
      console.error(error);

      return;
    }

    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
