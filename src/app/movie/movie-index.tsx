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

export default function MovieIndex({ page }: { page: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      search: searchParams.get('q') ?? undefined,
      orderBy: searchParams.get('order') ?? undefined,
      orderDirection: searchParams.get('asc') === 'true' ? 'asc' : 'desc',
    }),
  );
  const { count: moviesCount } = useQuery(
    getMoviePageCount(supabase, { search: searchParams.get('q') ?? undefined }),
  );

  const pageCount = moviesCount ? Math.floor(moviesCount / 25) - 1 : 1;

  return (
    <TwoColumnLayout
      sidebarTitle="Search"
      sidebarContent={
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSearch}>
            <Input
              name="q"
              placeholder="Search"
              defaultValue={searchParams.get('q') ?? ''}
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="order">Order by</Label>
              <Select
                name="order"
                defaultValue={searchParams.get('order') ?? 'create_time'}
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
                name="asc"
                defaultValue={searchParams.get('asc') ?? 'false'}
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
    >
      {(moviesCount ?? 0 > 0) ? (
        <>
          <PaginationLinks page={page} pageCount={pageCount} />
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {movies?.map((movie, index) => (
              <ItemCard key={index} item={movie} />
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
