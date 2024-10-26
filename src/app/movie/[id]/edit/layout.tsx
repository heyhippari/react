import ItemHeader from '@/components/item-header';
import ItemNavbar from '@/components/item-navbar';
import SidebarMovieEdit from '@/components/sidebar-movie-edit';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { getMovieById } from '@/queries/get-movie-by-id';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: movie } = await getMovieById(supabase, id);

  return (
    <>
      <ItemNavbar item={movie} />
      <ItemHeader item={movie} />
      <TwoColumnLayout
        sidebarContent={<SidebarMovieEdit movie={movie} />}
        sidebarTitle="Edit"
      >
        {children}
      </TwoColumnLayout>
    </>
  );
}
