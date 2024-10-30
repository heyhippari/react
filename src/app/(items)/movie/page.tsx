import ItemCard from '@/components/item-card';
import ItemGrid from '@/components/item-grid';
import { PaginationLinks } from '@/components/pagination-links';
import SidebarMovieSearch from '@/components/sidebar-movie-search';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { movieService } from '@/services/movie.service';

/**
 * Server-side code for the movie page.
 * @param properties The properties for the movie page.
 * @param properties.searchParams The search parameters for the movie page, to handle pagination and search.
 * @returns The rendered movie page.
 */
export default async function MoviePage({
  searchParams,
}: {
  searchParams?: Promise<{
    direction?: 'asc' | 'desc';
    order?: 'create_time' | 'dvd_id' | 'popularity' | 'release_date';
    page?: string;
    q?: string;
  }>;
}) {
  const {
    direction = 'desc',
    order = 'create_time',
    page = '1',
    q,
  } = (await searchParams) ?? {};

  const movies = await movieService.getPaginatedMovies(
    Number.parseInt(page, 10),
    25,
    {
      orderBy: order,
      orderDirection: direction,
      search: q,
    },
  );
  const pageCount = await movieService.getMoviePageCount(q, 25);

  return (
    <TwoColumnLayout
      sidebarContent={
        <SidebarMovieSearch direction={direction} order={order} q={q} />
      }
      sidebarTitle="Search"
    >
      {(pageCount ?? 0 > 0) ? (
        <>
          <PaginationLinks page={Number(page)} pageCount={pageCount} />
          <ItemGrid items={movies} sidebar>
            {(movie, index) => (
              <ItemCard item={movie} key={movie.id} priority={index < 10} />
            )}
          </ItemGrid>
          <PaginationLinks page={Number(page)} pageCount={pageCount} />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">No movies found</h1>
          <p>Try changing your search query or adjusting the filters.</p>
        </>
      )}
    </TwoColumnLayout>
  );
}
