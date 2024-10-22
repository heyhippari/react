import {
  getInformationNeeded,
  getMostPopularPersons,
  getMostRecentMovies,
  getReleasedOnThisDay,
} from '@/queries/homepage';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import MovieSlider from './movie-slider';

export default async function HomeSliders() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: recentMovies } = await getMostRecentMovies(supabase);
  const { data: informationNeeded } = await getInformationNeeded(supabase);
  const { data: releasedOnThisDay } = await getReleasedOnThisDay(supabase);
  const { data: popularPersons } = await getMostPopularPersons(supabase);

  return (
    <>
      <h2 className="text-2xl font-semibold">Recently Released</h2>
      <MovieSlider items={recentMovies ?? []} />
      <h2 className="text-2xl font-semibold">Trending People</h2>
      <MovieSlider items={popularPersons ?? []} />
      <h2 className="text-2xl font-semibold">On This Day</h2>
      <MovieSlider items={releasedOnThisDay ?? []} />
      <h2 className="text-2xl font-semibold">Information Needed</h2>
      <MovieSlider items={informationNeeded ?? []} />
    </>
  );
}
