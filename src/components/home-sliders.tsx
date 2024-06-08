import { getInformationNeeded, getMostRecentMovies } from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import MovieSlider from './movie-slider';

export default async function HomeSliders() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const { data: recentMovies } = await getMostRecentMovies(supabase);
  const { data: informationNeeded } = await getInformationNeeded(supabase);

  return (
    <>
      <h2 className="text-2xl font-semibold">Recently Released</h2>
      <MovieSlider movies={recentMovies ?? []} />
      <h2 className="text-2xl font-semibold">Information Needed</h2>
      <MovieSlider movies={informationNeeded ?? []} />
    </>
  );
}
