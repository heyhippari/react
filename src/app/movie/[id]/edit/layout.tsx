import { TwoColumnLayout } from '@/components/two-column-layout';

import ItemNavbar from '@/components/item-navbar';
import ItemPoster from '@/components/item-poster';

import SidebarMovieEdit from '@/components/sidebar-movie-edit';
import { getMovieById } from '@/queries/get-movie-by-id';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import MdiArrowLeft from '~icons/mdi/arrow-left.jsx';

export default async function Layout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: movie } = await getMovieById(supabase, id);

  return (
    <>
      <ItemNavbar item={movie} />
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <Link
            href={`/movie/${movie?.id}`}
            className="flex flex-col items-center gap-4 md:flex-row"
          >
            <ItemPoster item={movie} small />
            <div className="flex flex-col gap-2">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {movie?.name ?? movie?.original_name}
              </h1>
              <div className="flex flex-row items-center gap-1 text-pink-600 dark:text-pink-300">
                <MdiArrowLeft />
                <p className="font-bold">Back to main</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <TwoColumnLayout
        sidebarTitle="Edit"
        sidebarContent={<SidebarMovieEdit movie={movie} />}
      >
        {children}
      </TwoColumnLayout>
    </>
  );
}
