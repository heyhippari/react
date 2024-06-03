'use client';

import useSupabaseBrowser from '@/lib/supabase/client';
import { getMovieCount, getPersonCount } from '@/queries/homepage';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

export default function HomeStats() {
  const supabase = useSupabaseBrowser();
  const { count: movieCount } = useQuery(getMovieCount(supabase));
  const { count: personCount } = useQuery(getPersonCount(supabase));

  return (
    <div className="container flex h-full flex-row items-center justify-center gap-6 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Movies</h2>
        <p>{movieCount}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Persons</h2>
        <p>{personCount}</p>
      </div>
    </div>
  );
}
