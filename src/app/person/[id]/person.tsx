'use client';

import MovieCard from '@/components/movie-card';
import { Badge } from '@/components/ui/badge';
import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default function Person({ id }: { id: number }) {
  const supabase = useSupabaseBrowser();
  const { data: person } = useQuery(getPersonById(supabase, id));
  const { count: roleCount } = useQuery(getPersonRolesCount(supabase, id));

  return (
    <>
      <div className="w-full p-4">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {person?.name}
              </h1>
              <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
                {person?.original_name}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              {person?.birth_date ? (
                <Badge variant="default">
                  {DateTime.fromISO(person?.birth_date).toLocaleString(
                    DateTime.DATE_FULL,
                  )}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 px-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold text-white">Roles</h2>
          <Badge variant="default">{roleCount}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {person?.roles.map((role, index) => (
            <Link key={index} href={`/movie/${role.movies?.id}`}>
              <MovieCard movie={role.movies} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
