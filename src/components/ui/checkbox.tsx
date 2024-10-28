'use client';

import { cn } from '@/core/utils/ui';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...properties }, reference) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-pink-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-pink-900 data-[state=checked]:text-pink-50 dark:border-pink-50 dark:focus-visible:ring-stone-300 dark:data-[state=checked]:bg-pink-50 dark:data-[state=checked]:text-pink-900',
      className,
    )}
    ref={reference}
    {...properties}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <CheckIcon className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
