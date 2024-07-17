'use client';

import MovieCard from '@/components/movie-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  getMoviePageCount,
  getPaginatedMovies,
} from '@/queries/get-movies-paginated';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { usePathname } from 'next/navigation';

export default function MovieIndex({ page }: { page: number }) {
  const supabase = useSupabaseBrowser();
  const { data: movies } = useQuery(getPaginatedMovies(supabase, page));
  const { count: moviesCount } = useQuery(getMoviePageCount(supabase));
  const pathname = usePathname();

  const pageCount = moviesCount ? Math.floor(moviesCount / 25) - 1 : 1;

  return (
    <>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">
            Movies {moviesCount} page {page}
          </h2>
        </div>
        <Pagination>
          <PaginationContent>
            {page > 1 ? (
              <PaginationItem>
                <PaginationPrevious
                  href={`${pathname}?page=${page - 1}`}
                  aria-disabled={page <= 1}
                />
              </PaginationItem>
            ) : null}
            {
              /* Always show at most the first 3 pages */
              Array.from(
                { length: Math.min(pageCount, 3) },
                (_, i) => i + 1,
              ).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`${pathname}?page=${i}`}
                    aria-current={i === page}
                    isActive={i === page}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {pageCount > 6 && page > 3 && page < 5 ? (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page}`}
                    aria-current={true}
                    isActive={true}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page + 1}`}
                    aria-current={false}
                    isActive={false}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : null}
            {pageCount > 6 && page > 5 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
            {pageCount > 6 && page >= 5 && page < pageCount - 3 ? (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page - 1}`}
                    aria-current={false}
                  >
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page}`}
                    aria-current={true}
                    isActive={true}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page + 1}`}
                    aria-current={false}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : null}
            {pageCount > 6 && page < pageCount - 3 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
            {
              /* Always show at most the last 3 pages */
              Array.from(
                { length: Math.min(pageCount, 3) },
                (_, i) => pageCount + i,
              ).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`${pathname}?page=${i}`}
                    aria-current={i === page}
                    isActive={i === page}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {page < pageCount ? (
              <PaginationItem>
                <PaginationNext
                  href={`${pathname}?page=${page + 1}`}
                  aria-disabled={page >= pageCount}
                />
              </PaginationItem>
            ) : null}
          </PaginationContent>
        </Pagination>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
