import { cn } from '@/core/utils/ui';
import * as React from 'react';

export type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProperties>(
  ({ className, type, ...properties }, reference) => {
    return (
      <input
        className={cn(
          'flex h-9 w-full rounded-md border border-pink-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:mt-0.5 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-pink-900 placeholder:text-pink-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-pink-800 dark:file:text-pink-100 dark:placeholder:text-pink-400 dark:focus-visible:ring-pink-300',
          className,
        )}
        ref={reference}
        type={type}
        {...properties}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
