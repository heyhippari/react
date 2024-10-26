'use client';
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

/**
 * Component to render pagination links.
 * @param props The props for the component.
 * @param props.page The current page.
 * @param props.pageCount The total number of pages.
 * @returns The rendered component.
 */
export function PaginationLinks({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Get the link for a specific page.
   * @param page The page number.
   * @returns The link for the page.
   */
  function getPaginationPageLink(page: number): string {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', page.toString());

    return `${pathname}?${newSearchParams.toString()}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page <= 1}
              href={getPaginationPageLink(page - 1)}
            />
          </PaginationItem>
        ) : null}
        {
          /* Always show at most the first 3 pages */
          Array.from({ length: Math.min(pageCount, 3) }, (_, i) => i + 1).map(
            (i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  aria-current={i === page}
                  href={getPaginationPageLink(i)}
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
                aria-current={true}
                href={getPaginationPageLink(page)}
                isActive={true}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                aria-current={false}
                href={getPaginationPageLink(page + 1)}
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
                aria-current={false}
                href={getPaginationPageLink(page - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                aria-current={true}
                href={getPaginationPageLink(page)}
                isActive={true}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                aria-current={false}
                href={getPaginationPageLink(page + 1)}
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
                aria-current={i === page}
                href={getPaginationPageLink(i)}
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
              aria-disabled={page >= pageCount}
              href={getPaginationPageLink(page + 1)}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
