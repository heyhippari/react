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
import { cn } from '@/core/utils/ui';
import { Command as CommandPrimitive } from 'cmdk';
import { useMemo, useState } from 'react';

interface Properties<T extends string> {
  emptyMessage?: string;
  isLoading?: boolean;
  items: { label: string; value: T }[];
  onSearchValueChange: (value: string) => void;
  onSelectedValueChange: (value: T) => void;
  placeholder?: string;
  searchValue: string;
  selectedValue: T;
}

/**
 * A searchable dropdown list with autocomplete functionality.
 * @param properties The component properties.
 * @param properties.emptyMessage The message to display when there are no items.
 * @param properties.isLoading Whether the items are loading.
 * @param properties.items The items to display.
 * @param properties.onSearchValueChange The callback to call when the search value changes.
 * @param properties.onSelectedValueChange The callback to call when the selected value changes.
 * @param properties.placeholder The input placeholder.
 * @param properties.searchValue The value to search for.
 * @param properties.selectedValue The value that is selected.
 * @returns The component.
 */
export function AutoComplete<T extends string>({
  emptyMessage = 'No items.',
  isLoading,
  items,
  onSearchValueChange,
  onSelectedValueChange,
  placeholder = 'Search...',
  searchValue,
  selectedValue,
}: Readonly<Properties<T>>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () => Object.fromEntries(items.map((item) => [item.value, item.label])),
    [items],
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      !event.relatedTarget?.hasAttribute('cmdk-list') &&
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
              onKeyDown={(event) => setOpen(event.key !== 'Escape')}
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
            onInteractOutside={(event) => {
              if (
                event.target instanceof Element &&
                event.target.hasAttribute('cmdk-input')
              ) {
                event.preventDefault();
              }
            }}
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <CommandList>
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(event) => event.preventDefault()}
                      onSelect={onSelectItem}
                      value={option.value}
                    >
                      <span
                        className={cn(
                          'iconify mr-2 h-4 w-4 mdi--check',
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
              {isLoading ? null : (
                <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
              )}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
