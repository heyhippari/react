'use client';

import { cn } from '@/core/utils/ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Viewport
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-pink-200 p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full dark:border-pink-800 data-[state=open]:sm:slide-in-from-bottom-full',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default:
          'border bg-white text-pink-950 dark:bg-pink-950 dark:text-pink-50',
        destructive:
          'destructive group border-red-500 bg-red-500 text-pink-50 dark:border-red-900 dark:bg-red-900 dark:text-pink-50',
        success:
          'success group border-green-500 bg-green-500 text-pink-50 dark:border-green-900 dark:bg-green-900 dark:text-pink-50',
      },
    },
  },
);

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...properties }, reference) => {
  return (
    <ToastPrimitives.Root
      className={cn(toastVariants({ variant }), className)}
      ref={reference}
      {...properties}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Action
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-pink-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-pink-100 focus:outline-none focus:ring-1 focus:ring-pink-950 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-pink-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-pink-50 group-[.destructive]:focus:ring-red-500 dark:border-pink-800 dark:hover:bg-pink-800 dark:focus:ring-pink-300 dark:group-[.destructive]:border-pink-800/40 dark:group-[.destructive]:hover:border-red-900/30 dark:group-[.destructive]:hover:bg-red-900 dark:group-[.destructive]:hover:text-pink-50 dark:group-[.destructive]:focus:ring-red-900',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Close
    className={cn(
      'absolute right-1 top-1 rounded-md p-1 text-pink-950/50 opacity-0 transition-opacity hover:text-pink-950 focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-pink-50/50 dark:hover:text-pink-50',
      className,
    )}
    ref={reference}
    toast-close=""
    {...properties}
  >
    <Cross2Icon className="size-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Title
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    ref={reference}
    {...properties}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Description
    className={cn('text-sm opacity-90', className)}
    ref={reference}
    {...properties}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProperties = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProperties,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
