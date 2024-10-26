import ItemPoster from '@/components/item-poster';
import { MovieWithImages, PersonWithImage } from '@/queries/types';
import { getUrlForItem } from '@/utils/types';
import MdiArrowLeft from '~icons/mdi/arrow-left.jsx';
import Link from 'next/link';

/**
 * A header for an item, containing the item's name and a link to the main page.
 * @param props - The component props.
 * @param props.item - The item to display the header for.
 * @returns The rendered component.
 */
export default function ItemHeader({
  item,
}: Readonly<{ item: MovieWithImages | PersonWithImage }>) {
  return (
    <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
      <div className="container flex flex-col gap-6 px-4 md:flex-row">
        <Link
          className="flex flex-col items-center gap-4 md:flex-row"
          href={getUrlForItem(item)}
        >
          <ItemPoster item={item} small />
          <div className="flex flex-col gap-2">
            <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
              {item?.name ?? item?.original_name}
            </h1>
            <div className="flex flex-row items-center gap-1 text-pink-600 dark:text-pink-300">
              <MdiArrowLeft />
              <p className="font-bold">Back to main</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
