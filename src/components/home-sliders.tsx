'use client';

import {
  getMostRecentMovies,
  getRecentlyAddedMovies,
  getRecentlyUpdatedMovies,
} from '@/queries/homepage';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import MovieSlider from './movie-slider';

export default function HomeSliders() {
  const supabase = useSupabaseBrowser();
  const { data: recentMovies } = useQuery(getMostRecentMovies(supabase));
  const { data: addedMovies } = useQuery(getRecentlyAddedMovies(supabase));
  const { data: updatedMovies } = useQuery(getRecentlyUpdatedMovies(supabase));

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
