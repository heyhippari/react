import { cn } from '@/utils/ui';
import { Slot } from '@radix-ui/react-slot';
import LucideLoader2 from '~icons/lucide/loader-2.jsx';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-pink-300',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        icon: 'size-9',
        lg: 'h-10 rounded-md px-8',
        sm: 'h-8 rounded-md px-3 text-xs',
      },
      variant: {
        default:
          'bg-pink-900 text-pink-50 shadow hover:bg-pink-900/90 dark:bg-pink-50 dark:text-pink-900 dark:hover:bg-pink-50/90',
        destructive:
          'bg-red-500 text-pink-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-pink-50 dark:hover:bg-red-900/90',
        ghost:
          'hover:bg-pink-100 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-50',
        link: 'text-pink-900 underline-offset-4 hover:underline dark:text-pink-50',
        outline:
          'border border-pink-200 bg-white shadow-sm hover:bg-pink-100 hover:text-pink-900 dark:border-pink-800 dark:bg-pink-950 dark:hover:bg-pink-800 dark:hover:text-pink-50',
        secondary:
          'bg-pink-100 text-pink-900 shadow-sm hover:bg-pink-100/80 dark:bg-pink-800 dark:text-pink-50 dark:hover:bg-pink-800/80',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      disabled,
      loading = false,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          <LucideLoader2 className="text-muted size-5 animate-spin" />
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
