import ItemCard from '@/components/item-card';
import { movieService } from '@/services/movie.service';

/**
 * Server-side code for the prefix page.
 * @param properties The properties for the prefix page.
 * @param properties.params The URL parameters, containing the prefix.
 * @returns A React component for the prefix page.
 */
export default async function PrefixPage(properties: {
  params: Promise<{ prefix: string }>;
}) {
  const { prefix } = await properties.params;

  const movies = await movieService.getMoviesByPrefix(prefix);

  return (
    <>
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {prefix}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">Movies</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie) => <ItemCard item={movie} key={movie.id} />)}
        </div>
      </div>
    </>
  );
}
