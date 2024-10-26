'use client';

import ItemCard from '@/components/item-card';
import { PaginationLinks } from '@/components/pagination-links';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getMoviePageCount,
  getPaginatedMovies,
} from '@/queries/get-movies-paginated';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * The movie index page.
 * @param props The props for the movie index page.
 * @param props.page The page number to display.
 * @returns The movie index page.
 */
export default function MovieIndex({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Handle the search form submission.
   * @param event The form submission event.
   */
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);

    if ((event.currentTarget.q as HTMLInputElement).value) {
      newSearchParams.set(
        'q',
        (event.currentTarget.q as HTMLInputElement).value,
      );
    }

    if ((event.currentTarget.order as HTMLSelectElement).value) {
      newSearchParams.set(
        'order',
        (event.currentTarget.order as HTMLSelectElement).value,
      );
    }

    if ((event.currentTarget.asc as HTMLSelectElement).value) {
      newSearchParams.set(
        'asc',
        (event.currentTarget.asc as HTMLSelectElement).value,
      );
    }

    router.push(`/movie?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }

  const supabase = useSupabaseBrowser();
  const { data: movies } = useQuery(
    getPaginatedMovies(supabase, page, 25, {
      orderBy: searchParams.get('order') ?? undefined,
      orderDirection: searchParams.get('asc') === 'true' ? 'asc' : 'desc',
      search: searchParams.get('q') ?? undefined,
    }),
  );
  const { count: moviesCount } = useQuery(
    getMoviePageCount(supabase, { search: searchParams.get('q') ?? undefined }),
  );

  const pageCount = moviesCount ? Math.floor(moviesCount / 25) - 1 : 1;

  return (
    <TwoColumnLayout
      sidebarContent={
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSearch}>
            <Input
              defaultValue={searchParams.get('q') ?? ''}
              name="q"
              placeholder="Search"
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="order">Order by</Label>
              <Select
                defaultValue={searchParams.get('order') ?? 'create_time'}
                name="order"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Order by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dvd_id">DVD ID</SelectItem>
                  <SelectItem value="release_date">Release Date</SelectItem>
                  <SelectItem value="create_time">Created At</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="asc">Direction</Label>
              <Select
                defaultValue={searchParams.get('asc') ?? 'false'}
                name="asc"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ascending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ascending</SelectItem>
                  <SelectItem value="false">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Search</Button>
          </form>
        </>
      }
      sidebarTitle="Search"
    >
      {(moviesCount ?? 0 > 0) ? (
        <>
          <PaginationLinks page={page} pageCount={pageCount} />
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {movies?.map((movie, index) => (
              <ItemCard item={movie} key={index} />
            ))}
          </div>
          <PaginationLinks page={page} pageCount={pageCount} />
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
