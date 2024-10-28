import ItemCard from '@/components/item-card';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';

/**
 * A grid of cards that display items.
 * @param properties The properties for the card grid.
 * @param properties.items The items to display.
 * @returns The card grid component.
 */
export default function CardGrid({
  items,
}: Readonly<{
  items: (MovieDto | PersonDto)[] | null | undefined;
}>) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {items?.map((item) => <ItemCard item={item} key={item?.id} />)}
    </div>
  );
}
