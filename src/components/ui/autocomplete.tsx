import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/utils/ui';
import MdiCheck from '~icons/mdi/check.svg';
import { Command as CommandPrimitive } from 'cmdk';
import { useMemo, useState } from 'react';

interface Props<T extends string> {
  emptyMessage?: string;
  isLoading?: boolean;
  items: { label: string; value: T }[];
  onSearchValueChange: (value: string) => void;
  onSelectedValueChange: (value: T) => void;
  placeholder?: string;
  searchValue: string;
  selectedValue: T;
}

export function AutoComplete<T extends string>({
  emptyMessage = 'No items.',
  isLoading,
  items,
  onSearchValueChange,
  onSelectedValueChange,
  placeholder = 'Search...',
  searchValue,
  selectedValue,
}: Readonly<Props<T>>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [items],
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute('cmdk-list') &&
      labels[selectedValue] !== searchValue
    ) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? '');
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center">
      <Popover onOpenChange={setOpen} open={open}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              onBlur={onInputBlur}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => setOpen(e.key !== 'Escape')}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onValueChange={onSearchValueChange}
              value={searchValue}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            className="z-50 w-[--radix-popover-trigger-width] p-0"
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute('cmdk-input')
              ) {
                e.preventDefault();
              }
            }}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CommandList>
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                      value={option.value}
                    >
                      <MdiCheck
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedValue === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
