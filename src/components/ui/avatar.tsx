'use client';

import { cn } from '@/core/utils/ui';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...properties }, reference) => (
  <AvatarPrimitive.Root
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...properties }, reference) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square h-full w-full', className)}
    ref={reference}
    {...properties}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...properties }, reference) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-pink-100 dark:bg-pink-800',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
