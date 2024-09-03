'use client';

import MovieCard from '@/components/movie-card';
import { PaginationLinks } from '@/components/pagination-links';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getMoviePageCount,
  getPaginatedMovies,
} from '@/queries/get-movies-paginated';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useSearchParams } from 'next/navigation';

export default function MovieIndex({ page }: { page: number }) {
  const searchParams = useSearchParams();

  const supabase = useSupabaseBrowser();
  const { data: movies } = useQuery(
    getPaginatedMovies(supabase, page, 25, {
      search: searchParams.get('q') ?? undefined,
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
          <Input
            placeholder="Search"
            defaultValue={searchParams.get('q') ?? ''}
          />
          <Button>Search</Button>
        </>
      }
    >
      <PaginationLinks page={page} pageCount={pageCount} />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies?.map((movie, index) => <MovieCard key={index} movie={movie} />)}
      </div>
      <PaginationLinks page={page} pageCount={pageCount} />
    </TwoColumnLayout>
  );
}
