import { cn } from '@/core/utils/ui';
import * as React from 'react';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    className={cn(
      'rounded-xl border-2 border-pink-300 bg-white text-pink-950 dark:border-pink-700 dark:bg-pink-950 dark:text-pink-50',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    ref={reference}
    {...properties}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...properties }, reference) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content -- Content is passed as children
  <h3
    className={cn('font-semibold leading-none tracking-tight', className)}
    ref={reference}
    {...properties}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...properties }, reference) => (
  <p
    className={cn('text-sm text-pink-500 dark:text-pink-400', className)}
    ref={reference}
    {...properties}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div className={cn('p-6 pt-0', className)} ref={reference} {...properties} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    ref={reference}
    {...properties}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
