import HomeStats from '@/components/home-stats';
import { getCurrentCounts } from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import HomeSliders from '@/components/home-sliders';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data: currentCounts } = await getCurrentCounts(supabase);

  return (
    <>
      <div className="flex h-fit w-full flex-col items-center justify-center bg-pink-100 py-4 dark:bg-pink-800 md:h-80 md:py-0 lg:h-72">
        <HomeStats counts={currentCounts} />
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <HomeSliders />
      </div>
    </>
  );
}
