import ItemCard from '@/components/item-card';
import { cn } from '@/core/utils/ui';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';

/**
 * A grid of cards that display items.
 * @param properties The properties for the card grid.
 * @param properties.items The items to display.
 * @param properties.sidebar Adjust the grid for a sidebar.
 * @returns The card grid component.
 */
export default function CardGrid({
  items,
  sidebar = false,
}: Readonly<{
  items: (MovieDto | PersonDto)[] | null | undefined;
  sidebar?: boolean;
}>) {
  return (
    <div
      className={cn(
        'grid gap-4 md:grid-cols-4 lg:grid-cols-5',
        sidebar
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      )}
    >
      {items?.map((item) => <ItemCard item={item} key={item?.id} />)}
    </div>
  );
}
