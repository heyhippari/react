import ItemPoster from '@/components/item-poster';
import { getUrlForItem } from '@/core/types';
import { LabelDto } from '@/data/label.dto';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import { SeriesDto } from '@/data/series.dto';
import { StudioDto } from '@/data/studio.dto';
import Link from 'next/link';

/**
 * A header for an item, containing the item's name and a link to the main page.
 * @param properties - The component properties.
 * @param properties.item - The item to display the header for.
 * @returns The rendered component.
 */
export default function ItemHeader({
  item,
}: Readonly<{
  item: LabelDto | MovieDto | PersonDto | SeriesDto | StudioDto;
}>) {
  return (
    <div className="flex w-full flex-col gap-4 border-b-2 border-pink-300 bg-pink-100 pt-4 dark:border-pink-700 dark:bg-pink-800">
      <div className="container flex flex-col gap-6 px-4 md:flex-row">
        <Link
          className="flex flex-col items-center gap-4 md:flex-row"
          href={getUrlForItem(item)}
        >
          <ItemPoster item={item} small />
          <div className="flex flex-col gap-2">
            <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
              {item?.display_name}
            </h1>
            <div className="flex flex-row items-center gap-1 text-pink-600 dark:text-pink-300">
              <span className="iconify mdi--arrow-left" />
              <p className="font-bold">Back to main</p>
            </div>
          </div>
        </Link>
      </div>
      {item._type === 'studio' && item?.homepage && (
        <div className="border-t-2 border-pink-300 bg-pink-200 dark:border-pink-700 dark:bg-pink-900">
          <div className="container flex flex-row items-center px-3 py-2">
            <Link
              className="flex flex-row items-center justify-center gap-2 hover:underline"
              href={item.homepage}
            >
              <span className="iconify mt-0.5 size-5 mdi--link" /> Visit
              homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
