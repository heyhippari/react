import ItemCard from '@/components/item-card';
import ItemGrid from '@/components/item-grid';
import { Badge } from '@/components/ui/badge';
import { VisitTracker } from '@/components/visit-tracker';
import { seriesService } from '@/services/series.service';
import { redirect } from 'next/navigation';

/**
 * Metadata generation for the series page.
 * @param params The URL parameters, containing the series ID.
 * @param params.params The URL parameters, containing the series ID.
 * @returns The metadata for the series page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const series = await seriesService.getSeries(Number(id));

    return {
      description: `Information about ${series?.display_name} from Kanojo.`,
      title: series?.display_name,
    };
  } catch {
    return {
      description: 'Information about a series from Kanojo.',
      title: 'Series',
    };
  }
}

/**
 * Server-side code for the series page.
 * @param properties The properties for the series page.
 * @param properties.params The URL parameters, containing the series ID.
 * @returns The rendered series page.
 */
export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const series = await seriesService.getSeries(Number(id));
  const moviesCount = await seriesService.getSeriesMoviesCount(Number(id));

  return (
    <>
      <VisitTracker differenciator="series" item={series} />
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {series?.display_name}
              </h1>
              {series?.alternative_name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                  {series?.alternative_name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">Movies</h2>
          <Badge
            className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
            variant="default"
          >
            {moviesCount}
          </Badge>
        </div>
        <ItemGrid items={series?.movies}>
          {(movie, index) => (
            <ItemCard item={movie} key={movie.id} priority={index < 12} />
          )}
        </ItemGrid>
      </div>
    </>
  );
}
