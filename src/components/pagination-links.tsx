import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export function PaginationLinks({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getPaginationPageLink(page: number): string {
    // Should take existing searchParams into account when generating the link
    const search = searchParams.get('q');
    const searchParam = search ? `&q=${search}` : '';
    return `${pathname}?page=${page}${searchParam}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={getPaginationPageLink(page - 1)}
              aria-disabled={page <= 1}
            />
          </PaginationItem>
        ) : null}
        {
          /* Always show at most the first 3 pages */
          Array.from({ length: Math.min(pageCount, 3) }, (_, i) => i + 1).map(
            (i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={getPaginationPageLink(i)}
                  aria-current={i === page}
                  isActive={i === page}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ),
          )
        }
        {pageCount > 6 && page > 3 && page < 5 ? (
          <>
            <PaginationItem>
              <PaginationLink
                href={getPaginationPageLink(page)}
                aria-current={true}
                isActive={true}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getPaginationPageLink(page + 1)}
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
                href={getPaginationPageLink(page - 1)}
                aria-current={false}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getPaginationPageLink(page)}
                aria-current={true}
                isActive={true}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getPaginationPageLink(page + 1)}
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
                href={getPaginationPageLink(i)}
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
              href={getPaginationPageLink(page + 1)}
              aria-disabled={page >= pageCount}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
