import ItemCard from '@/components/item-card';
import ItemGrid from '@/components/item-grid';
import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
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
export default async function LabelPage(
  properties: Readonly<{
    params: Promise<{ id: string }>;
  }>,
) {
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
      <ItemNavbar item={label} />
      <ItemHeader item={label} />
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">Movies</h2>
          <Badge variant="default">{moviesCount}</Badge>
        </div>
        <ItemGrid items={label?.movies ?? []}>
          {(movie, index) => (
            <ItemCard item={movie} key={movie.id} priority={index < 10} />
          )}
        </ItemGrid>
      </div>
    </>
  );
}
