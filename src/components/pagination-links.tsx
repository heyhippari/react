'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Component to render pagination links.
 * @param properties The properties for the component.
 * @param properties.page The current page.
 * @param properties.pageCount The total number of pages.
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
  const searchParameters = useSearchParams();

  /**
   * Get the link for a specific page.
   * @param page The page number.
   * @returns The link for the page.
   */
  function getPaginationPageLink(page: number): string {
    const newSearchParameters = new URLSearchParams(searchParameters);

    newSearchParameters.set('page', page.toString());

    return `${pathname}?${newSearchParameters.toString()}`;
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
          Array.from(
            { length: Math.min(pageCount, 3) },
            (_, index) => index + 1,
          ).map((index) => (
            <PaginationItem key={index}>
              <PaginationLink
                aria-current={index === page}
                href={getPaginationPageLink(index)}
                isActive={index === page}
              >
                {index}
              </PaginationLink>
            </PaginationItem>
          ))
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
            (_, index) => pageCount + index,
          ).map((index) => (
            <PaginationItem key={index}>
              <PaginationLink
                aria-current={index === page}
                href={getPaginationPageLink(index)}
                isActive={index === page}
              >
                {index}
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
