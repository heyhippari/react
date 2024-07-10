import HomeStats from '@/components/home-stats';
import { getMovieCount, getPersonCount } from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import HomeSliders from '@/components/home-sliders';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { count: movieCount } = await getMovieCount(supabase);
  const { count: personCount } = await getPersonCount(supabase);

  return (
    <>
      <div className="h-48 w-full bg-pink-100 dark:bg-pink-950">
        <HomeStats
          movieCount={movieCount ?? 0}
          personCount={personCount ?? 0}
        />
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <HomeSliders />
      </div>
    </>
  );
}
