'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/core/utils/ui';
import { type DialogProps } from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...properties }, reference) => (
  <CommandPrimitive
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-pink-900 dark:bg-pink-950 dark:text-pink-50',
      className,
    )}
    ref={reference}
    {...properties}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProperties = DialogProps;

const CommandDialog = ({
  children,
  ...properties
}: CommandDialogProperties) => {
  return (
    <Dialog {...properties}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-pink-500 dark:[&_[cmdk-group-heading]]:text-pink-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...properties }, reference) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <MagnifyingGlassIcon className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-pink-400',
        className,
      )}
      ref={reference}
      {...properties}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...properties }, reference) => (
  <CommandPrimitive.List
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    ref={reference}
    {...properties}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((properties, reference) => (
  <CommandPrimitive.Empty
    className="py-6 text-center text-sm"
    ref={reference}
    {...properties}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...properties }, reference) => (
  <CommandPrimitive.Group
    className={cn(
      'overflow-hidden p-1 text-pink-900 dark:text-pink-50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-pink-500 dark:[&_[cmdk-group-heading]]:text-pink-400',
      className,
    )}
    ref={reference}
    {...properties}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...properties }, reference) => (
  <CommandPrimitive.Separator
    className={cn('-mx-1 h-px bg-pink-200 dark:bg-pink-800', className)}
    ref={reference}
    {...properties}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...properties }, reference) => (
  <CommandPrimitive.Item
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-pink-100 data-[selected=true]:text-pink-900 data-[disabled=true]:opacity-50 dark:data-[selected=true]:bg-pink-800 dark:data-[selected=true]:text-pink-50',
      className,
    )}
    ref={reference}
    {...properties}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-pink-500 dark:text-pink-400',
        className,
      )}
      {...properties}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
