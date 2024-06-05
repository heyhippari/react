import {
  getMostRecentMovies,
  getRecentlyAddedMovies,
  getRecentlyUpdatedMovies,
} from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import MovieSlider from './movie-slider';

export default async function HomeSliders() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const { data: recentMovies } = await getMostRecentMovies(supabase);
  const { data: addedMovies } = await getRecentlyAddedMovies(supabase);
  const { data: updatedMovies } = await getRecentlyUpdatedMovies(supabase);

  return (
    <>
      <h2 className="text-2xl font-semibold">Recently Released</h2>
      <MovieSlider movies={recentMovies ?? []} />
      <h2 className="text-2xl font-semibold">Recently Added</h2>
      <MovieSlider movies={addedMovies ?? []} />
      <h2 className="text-2xl font-semibold">Recently Updated</h2>
      <MovieSlider movies={updatedMovies ?? []} />
    </>
  );
}
