import HomeStats from '@/components/home-stats';
import { getMovieCount, getPersonCount } from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import HomeSliders from '@/components/home-sliders';

// We want to force static generation for this page.
export const dynamic = 'force-static';
// Revalidate the homepage every four hours.
// Four hours is chosen to strike a balance between cache freshness and
// performance.
export const revalidate = 60 * 60 * 4;

export default async function Home() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { count: movieCount } = await getMovieCount(supabase);
  const { count: personCount } = await getPersonCount(supabase);

  return (
    <>
      <div className="h-48 w-full bg-slate-700">
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
