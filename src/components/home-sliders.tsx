import {
  getInformationNeeded,
  getMostPopularPersons,
  getMostRecentMovies,
  getReleasedOnThisDay,
} from '@/queries/homepage';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import ItemSlider from './movie-slider';

/**
 * Sliders for the home page.
 * @returns The home sliders component.
 */
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
      <ItemSlider items={recentMovies ?? []} />
      <h2 className="text-2xl font-semibold">Trending People</h2>
      <ItemSlider items={popularPersons ?? []} />
      <h2 className="text-2xl font-semibold">On This Day</h2>
      <ItemSlider items={releasedOnThisDay ?? []} />
      <h2 className="text-2xl font-semibold">Information Needed</h2>
      <ItemSlider items={informationNeeded ?? []} />
    </>
  );
}
