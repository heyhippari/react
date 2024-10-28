import CardGrid from '@/components/card-grid';
import ItenCard from '@/components/item-card';
import { Badge } from '@/components/ui/badge';
import { studioService } from '@/services/studio.service';
import { redirect } from 'next/navigation';

/**
 * Generate metadata for the studio page.
 * @param properties - The properties for the studio page.
 * @param properties.params - The URL parameters for the studio page.
 * @returns The metadata for the studio page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const studio = await studioService.getStudio(Number(id));

    return {
      description: `Information about ${studio?.display_name} from Kanojo.`,
      title: studio?.display_name,
    };
  } catch {
    return {
      description: 'Information about a studio from Kanojo.',
      title: 'Studio',
    };
  }
}

/**
 * Server-side component for the studio page.
 * @param properties - The properties for the studio page.
 * @param properties.params - The URL parameters for the studio page, containing the studio ID.
 * @returns A React component for the studio page.
 */
export default async function StudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const studio = await studioService.getStudio(Number(id));
  const moviesCount = await studioService.getStudioMoviesCount(Number(id));

  return (
    <>
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {studio?.display_name}
              </h1>
              {studio?.alternative_name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                  {studio?.alternative_name}
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
        <CardGrid items={studio?.movies} />
      </div>
    </>
  );
}
