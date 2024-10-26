import ItemCard from '@/components/item-card';
import { MovieWithImages, PersonWithImage } from '@/queries/types';

/**
 * A grid of cards that display items.
 * @param props The props for the card grid.
 * @param props.items The items to display.
 * @returns The card grid component.
 */
export default function CardGrid({
  items,
}: Readonly<{
  items: (MovieWithImages | PersonWithImage)[] | null | undefined;
}>) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {items?.map((item) => <ItemCard item={item} key={item?.id} />)}
    </div>
  );
}
