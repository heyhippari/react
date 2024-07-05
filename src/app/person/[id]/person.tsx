'use client';

import MovieCard from '@/components/movie-card';
import PersonPoster from '@/components/person-poster';
import { Badge } from '@/components/ui/badge';
import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { DateTime } from 'luxon';

export default function Person({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: person } = useQuery(getPersonById(supabase, id));
  const { count: roleCount } = useQuery(getPersonRolesCount(supabase, id));

  if (!person) {
    return null;
  }

  return (
    <div className="container flex flex-col justify-stretch gap-2 px-4 lg:flex-row">
      <div className="flex-grow bg-slate-100 p-4 dark:bg-slate-700">
        <div className="container flex flex-col gap-6 px-4">
          <PersonPoster person={person} />
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {person?.name ?? person?.original_name}
              </h1>
              {person?.name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
                  {person?.original_name}
                </p>
              ) : null}
            </div>
            <div className="flex flex-row gap-4">
              {person?.birth_date ? (
                <Badge variant="default">
                  {DateTime.fromISO(person?.birth_date).toLocaleString(
                    DateTime.DATE_FULL,
                    {
                      locale: 'en-US',
                    },
                  )}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold text-white">Movies</h2>
          <Badge variant="default">{roleCount}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {person?.roles.map((role, index) => (
            <MovieCard key={index} movie={role?.movies} />
          ))}
        </div>
      </div>
    </div>
  );
}
