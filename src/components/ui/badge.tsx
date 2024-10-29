import { cn } from '@/core/utils/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-pink-400 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-pink-950 focus:ring-offset-2 dark:border-pink-400 dark:focus:ring-pink-300',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default:
          'border-transparent bg-pink-900 text-pink-50 shadow hover:bg-pink-900/80 dark:bg-pink-50 dark:text-pink-900 dark:hover:bg-pink-50/80',
        destructive:
          'border-transparent bg-red-500 text-pink-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-pink-50 dark:hover:bg-red-900/80',
        outline: 'text-pink-950 dark:text-pink-50',
        secondary:
          'border-transparent bg-pink-100 text-pink-900 hover:bg-pink-100/80 dark:bg-pink-800 dark:text-pink-50 dark:hover:bg-pink-800/80',
      },
    },
  },
);

export interface BadgeProperties
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component.
 * @param properties - The properties for the badge component.
 * @param properties.className - The class name for the badge.
 * @param properties.variant - The variant for the badge.
 * @returns React component.
 */
function Badge({ className, variant, ...properties }: BadgeProperties) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...properties}
    />
  );
}

export { Badge, badgeVariants };
