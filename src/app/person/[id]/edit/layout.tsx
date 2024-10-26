import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarPersonEdit from '@/components/sidebar-person-edit';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { getPersonById } from '@/queries/get-person-by-id';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * The layout for the person edit page.
 * @param props The props for the person edit page.
 * @param props.children The children of the person edit page.
 * @param props.params The URL parameters, containing the person ID.
 * @returns The person edit page layout.
 */
export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: person } = await getPersonById(supabase, id);

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
