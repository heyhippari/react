import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarPersonEdit from '@/components/sidebar-person-edit';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { personService } from '@/services/person.service';

/**
 * The layout for the person edit page.
 * @param properties The properties for the person edit page.
 * @param properties.children The children of the person edit page.
 * @param properties.params The URL parameters, containing the person ID.
 * @returns The person edit page layout.
 */
export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const person = await personService.getPerson(Number(id));

  return (
    <>
      <ItemNavbar item={person} />
      <ItemHeader item={person} />
      <TwoColumnLayout
        sidebarContent={<SidebarPersonEdit person={person} />}
        sidebarTitle="Edit"
      >
        {children}
      </TwoColumnLayout>
    </>
  );
}
