import CardGrid from '@/components/card-grid';
import { Badge } from '@/components/ui/badge';
import { VisitTracker } from '@/components/visit-tracker';
import { labelService } from '@/services/label.service';
import { redirect } from 'next/navigation';

/**
 * Generate the metadata for the label page.
 * @param properties - The properties of the page.
 * @param properties.params - The ID of the label to generate metadata for.
 * @returns The metadata for the label page.
 */
export async function generateMetadata(properties: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await properties.params;

  try {
    const label = await labelService.getLabel(id);

    return {
      description: `Information about ${label?.display_name} from Kanojo.`,
      title: label?.display_name,
    };
  } catch {
    return {
      description: 'Information about a label from Kanojo.',
      title: 'Label',
    };
  }
}

/**
 * The label page component.
 * @param properties - The properties of the page component.
 * @param properties.params - The URL parameter for the label ID.
 * @returns The rendered label page.
 */
export default async function LabelPage(properties: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await properties.params;

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const label = await labelService.getLabel(Number(id));
  const moviesCount = await labelService.getLabelMoviesCount(Number(id));

  return (
    <>
      <VisitTracker differenciator="label" item={label} />
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {label?.display_name}
              </h1>
              {label?.alternative_name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                  {label?.alternative_name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">Movies</h2>
          <Badge variant="default">{moviesCount}</Badge>
        </div>
        <CardGrid items={label?.movies} />
      </div>
    </>
  );
}
