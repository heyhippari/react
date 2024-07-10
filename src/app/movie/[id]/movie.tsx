'use client';

import MovieNavbar from '@/components/movie-navbar';
import MoviePoster from '@/components/movie-poster';
import RoleCard from '@/components/role-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Movie({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: movie, error } = useQuery(getMovieById(supabase, id));

  if (error) {
    return redirect('/404');
  }

  return (
    <>
      <MovieNavbar movie={movie} />
      <div className="w-full bg-stone-100 p-4 dark:bg-stone-700">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <MoviePoster movie={movie} />
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {movie?.name ?? movie?.original_name}
              </h1>
              {movie?.name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
                  {movie?.original_name}
                </p>
              ) : null}
            </div>
            <div className="flex flex-row gap-4">
              <Badge variant="default">{movie?.dvd_id}</Badge>
              {movie?.release_date &&
              movie.release_date.includes('0001') === false ? (
                <Badge variant="default">
                  {DateTime.fromISO(movie?.release_date).toLocaleString(
                    DateTime.DATE_FULL,
                    {
                      locale: 'en-US',
                    },
                  )}
                </Badge>
              ) : (
                <Badge variant="default">Unknown Release Date</Badge>
              )}
              {movie?.length ? (
                <Badge variant="default">{movie?.length} minutes</Badge>
              ) : (
                <Badge variant="default">Unknown Duration</Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {movie?.series?.id ? (
                <div className="flex flex-col">
                  <p className="text-lg font-semibold leading-loose text-white">
                    Series
                  </p>
                  <Link
                    className="text-stone-300 hover:text-stone-50 hover:underline"
                    href={`/series/${movie?.series?.id}`}
                  >
                    {movie?.series?.name ?? movie?.series?.original_name}
                  </Link>
                </div>
              ) : null}
              {movie?.studio?.id ? (
                <div className="flex flex-col">
                  <p className="text-lg font-semibold leading-loose text-white">
                    Studio
                  </p>
                  <Link
                    className="text-stone-300 hover:text-stone-50 hover:underline"
                    href={`/studio/${movie?.studio.id}`}
                  >
                    {movie?.studio.name ?? movie?.studio.original_name}
                  </Link>
                </div>
              ) : null}
              {movie?.label?.id ? (
                <div className="flex flex-col">
                  <p className="text-lg font-semibold leading-loose text-white">
                    Label
                  </p>
                  <Link
                    className="text-stone-300 hover:text-stone-50 hover:underline"
                    href={`/label/${movie?.label.id}`}
                  >
                    {movie?.label.name ?? movie?.label.original_name}
                  </Link>
                </div>
              ) : null}
            </div>
            {/*
            <div className="flex w-full flex-col gap-2">
              <p className="text-lg font-semibold leading-loose text-white">
                Tags
              </p>
              <div className="flex flex-row items-center gap-6">
                <p className="w-24 pb-1 text-sm font-semibold text-stone-400">
                  Appearance
                </p>
                <div className="flex flex-grow flex-row flex-wrap gap-2">
                  <Badge>Brown Hair</Badge>
                  <Badge>Medium Breasts</Badge>
                  <Badge>Westerner</Badge>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6">
                <p className="w-24 pb-1 text-sm font-semibold text-stone-400">
                  Attire
                </p>
                <div className="flex flex-grow flex-row flex-wrap gap-2">
                  <Badge>Bikini</Badge>
                  <Badge>Kneesocks</Badge>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6">
                <p className="w-24 pb-1 text-sm font-semibold text-stone-400">
                  Objects
                </p>
                <div className="flex flex-grow flex-row flex-wrap gap-2">
                  <Badge>Exercise Ball</Badge>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6">
                <p className="w-24 pb-1 text-sm font-semibold text-stone-400">
                  Places
                </p>
                <div className="flex flex-grow flex-row flex-wrap gap-2">
                  <Badge>Bedroom</Badge>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6">
                <p className="w-24 pb-1 text-sm font-semibold text-stone-400">
                  Actions
                </p>
                <div className="flex flex-grow flex-row flex-wrap gap-2">
                  <Badge>Showering</Badge>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <Tabs defaultValue="cast">
          <TabsList className="mb-2 p-0">
            <TabsTrigger value="cast" asChild>
              <Button variant="ghost">
                <h2 className="text-lg font-semibold text-white">Cast</h2>
              </Button>
            </TabsTrigger>
            {/*
              <TabsTrigger value="crew" asChild>
              <Button variant="ghost">
                <h2 className="text-lg font-semibold text-white">Crew</h2>
              </Button>
            </TabsTrigger>
            */}
          </TabsList>
          <TabsContent value="cast">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {movie?.roles.map((role, index) => (
                <RoleCard key={index} role={role} />
              ))}
            </div>
          </TabsContent>
          {/*
          <TabsContent value="crew">Lorem ipsum</TabsContent>
          */}
        </Tabs>
      </div>
    </>
  );
}
