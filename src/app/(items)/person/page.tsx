import ItemCard from '@/components/item-card';
import ItemGrid from '@/components/item-grid';
import { PaginationLinks } from '@/components/pagination-links';
import SidebarPersonSearch from '@/components/sidebar-person-search';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { personService } from '@/services/person.service';

/**
 * Server-side code for the person page.
 * @param properties The properties for the person page.
 * @param properties.searchParams The search parameters for the person page, to handle pagination and search.
 * @returns The rendered person page.
 */
export default async function PersonPage({
  searchParams,
}: {
  searchParams?: Promise<{
    direction?: 'asc' | 'desc';
    order?:
      | 'birth_date'
      | 'create_time'
      | 'name'
      | 'original_name'
      | 'popularity';
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

  const persons = await personService.getPaginatedPersons(
    Number.parseInt(page, 10),
    25,
    {
      orderBy: order,
      orderDirection: direction,
      search: q,
    },
  );
  const pageCount = await personService.getPersonPageCount(q, 25);

  return (
    <TwoColumnLayout
      sidebarContent={
        <SidebarPersonSearch direction={direction} order={order} q={q} />
      }
      sidebarTitle="Search"
    >
      {(pageCount ?? 0 > 0) ? (
        <>
          <PaginationLinks page={Number(page)} pageCount={pageCount} />
          <ItemGrid items={persons} sidebar>
            {(person, index) => (
              <ItemCard item={person} key={person.id} priority={index < 10} />
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
