import { cn } from '@/core/utils/ui';

/**
 * A grid of cards that display items.
 * @param properties The properties for the card grid.
 * @param properties.children The children function to render the items.
 * @param properties.items The items to display.
 * @param properties.sidebar Adjust the grid for a sidebar.
 * @param properties.large Adjust the grid for large items.
 * @param properties.wide Adjust the grid for wide items.
 * @returns The card grid component.
 */
export default function ItemGrid<T>({
  children,
  items,
  large = false,
  sidebar = false,
  wide = false,
}: Readonly<{
  children: (item: T, index: number) => React.ReactNode;
  items: T[];
  large?: boolean;
  sidebar?: boolean;
  wide?: boolean;
}>) {
  return (
    <div
      className={cn(
        'grid gap-4',
        !sidebar &&
          !large &&
          !wide &&
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        sidebar &&
          !large &&
          !wide &&
          'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        sidebar &&
          large &&
          !wide &&
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        sidebar && large && wide && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {items?.map((item, index) => children(item, index))}
    </div>
  );
}
