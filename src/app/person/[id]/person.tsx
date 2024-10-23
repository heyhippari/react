'use client';

import { registerViewAction } from '@/app/actions/view';
import ItemCard from '@/components/item-card';
import ItemNavbar from '@/components/item-navbar';
import ItemPoster from '@/components/item-poster';
import { Badge } from '@/components/ui/badge';
import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { DateTime } from 'luxon';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Person({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: person } = useQuery(getPersonById(supabase, id));
  const { count: roleCount } = useQuery(getPersonRolesCount(supabase, id));

  // On initial load, register the visit
  useEffect(() => {
    const registerView = async () => {
      if (person) {
        try {
          await registerViewAction(person.id, 'person');
        } catch {
          // Just ignore the error, we don't want to block the page load
        }
      }
    };

    void registerView();
  }, [person]);

  if (!person) {
    return redirect('/404');
  }

  return (
    <>
      <ItemNavbar item={person} />
      <div className="container flex flex-grow flex-col gap-2 px-4 lg:flex-row">
        <div className="flex-grow bg-pink-100 p-4 dark:bg-pink-950">
          <div className="container flex flex-col gap-6 px-4">
            <ItemPoster item={person} />
            <div className="flex w-full flex-col justify-start gap-4 align-top">
              <div className="flex flex-col gap-0">
                <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                  {person?.name ?? person?.original_name}
                </h1>
                {person?.name ? (
                  <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                    {person?.original_name}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-row">
                <Badge
                  variant="default"
                  className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
                >
                  {person?.birth_date
                    ? DateTime.fromISO(person?.birth_date).toLocaleString(
                        DateTime.DATE_FULL,
                        {
                          locale: 'en-US',
                        },
                      )
                    : null}
                </Badge>
              </div>
              {person?.aliases.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">Aliases</h2>
                  {person?.aliases.map((alias) => (
                    <p key={alias.original_name}>
                      {alias.name
                        ? `${alias.name} (${alias.original_name})`
                        : alias.original_name}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-2">
            <h2 className="text-lg font-semibold">Movies</h2>
            <Badge
              variant="default"
              className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
            >
              {roleCount}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {person?.roles.map((role) => (
              <ItemCard key={role.id} item={role?.movies} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
