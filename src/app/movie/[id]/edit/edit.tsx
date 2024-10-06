'use client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { updateMovieAction } from '@/app/actions/movie';
import MovieNavbar from '@/components/movie-navbar';
import MoviePoster from '@/components/movie-poster';
import { TwoColumnLayout } from '@/components/two-column-layout';
import { AutoComplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  searchLabelByName,
  searchSeriesByName,
  searchStudioByName,
} from '@/queries/autocomplete';
import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import {
  MovieEditFormSchema,
  movieEditFormSchema,
} from '@/utils/validation/movie-update';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MdiArrowLeft from '~icons/mdi/arrow-left.jsx';

export default function Movie({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: movie } = useQuery(getMovieById(supabase, id));

  const [studioSearchValue, setStudioSearchValue] = useState(
    movie?.studio?.name ?? movie?.studio?.original_name ?? '',
  );
  const [labelSearchValue, setLabelSearchValue] = useState(
    movie?.label?.name ?? movie?.label?.original_name ?? '',
  );
  const [seriesSearchValue, setSeriesSearchValue] = useState(
    movie?.series?.name ?? movie?.series?.original_name ?? '',
  );

  const { data: studios, isLoading: isStudioLoading } = useQuery(
    searchStudioByName(supabase, studioSearchValue),
  );
  const { data: labels, isLoading: isLabelLoading } = useQuery(
    searchLabelByName(supabase, labelSearchValue),
  );
  const { data: series, isLoading: isSeriesLoading } = useQuery(
    searchSeriesByName(supabase, seriesSearchValue),
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Only for error handling
  const form = useForm<MovieEditFormSchema>({
    resolver: zodResolver(movieEditFormSchema),
    defaultValues: {
      original_name: movie?.original_name ?? undefined,
      name: movie?.name ?? undefined,
      release_date: movie?.release_date ?? undefined,
      length: movie?.length ?? 0,
      dvd_id: movie?.dvd_id ?? undefined,
      label_id: movie?.label_id ?? undefined,
      series_id: movie?.series_id ?? undefined,
      studio_id: movie?.studio_id ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<MovieEditFormSchema> = async (data) => {
    if (movie?.id) {
      await updateMovieAction(movie?.id, data);
    }
  };

  return (
    <>
      <MovieNavbar movie={movie} />
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-700">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <Link
            href={`/movie/${movie?.id}`}
            className="flex flex-col items-center gap-4 md:flex-row"
          >
            <MoviePoster movie={movie} small />
            <div className="flex flex-col gap-2">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {movie?.name ?? movie?.original_name}
              </h1>
              <div className="flex flex-row items-center gap-1 text-pink-800">
                <MdiArrowLeft />
                <p className="font-bold">Back to main</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <TwoColumnLayout
        sidebarTitle="Edit"
        sidebarContent={
          <>
            <Button variant="ghost" className="justify-start">
              Primary Facts
            </Button>
          </>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="original_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Original Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Translated Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Translated Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="dvd_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DVD ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DVD ID"
                        disabled
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studio_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Studio</FormLabel>
                    <FormControl>
                      <AutoComplete
                        selectedValue={field.value?.toString() ?? ''}
                        onSelectedValueChange={(value) =>
                          form.setValue('studio_id', parseInt(value, 10))
                        }
                        searchValue={studioSearchValue}
                        onSearchValueChange={(value) => {
                          setStudioSearchValue(value);
                        }}
                        items={
                          studios?.map((studio) => ({
                            value: studio.id.toString(),
                            label: studio.name ?? studio.original_name,
                          })) ?? []
                        }
                        isLoading={isStudioLoading}
                        emptyMessage="No studios found."
                        placeholder="Search for a studio..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="label_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <AutoComplete
                        selectedValue={field.value?.toString() ?? ''}
                        onSelectedValueChange={(value) =>
                          form.setValue('label_id', parseInt(value, 10))
                        }
                        searchValue={labelSearchValue}
                        onSearchValueChange={(value) => {
                          setLabelSearchValue(value);
                        }}
                        items={
                          labels?.map((label) => ({
                            value: label.id.toString(),
                            label: label.name ?? label.original_name,
                          })) ?? []
                        }
                        isLoading={isLabelLoading}
                        emptyMessage="No labels found."
                        placeholder="Search for a label..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="series_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series</FormLabel>
                    <FormControl>
                      <AutoComplete
                        selectedValue={field.value?.toString() ?? ''}
                        onSelectedValueChange={(value) =>
                          form.setValue('series_id', parseInt(value, 10))
                        }
                        searchValue={seriesSearchValue}
                        onSearchValueChange={(value) =>
                          setSeriesSearchValue(value)
                        }
                        items={
                          series?.map((series) => ({
                            value: series.id.toString(),
                            label: series.name ?? series.original_name,
                          })) ?? []
                        }
                        isLoading={isSeriesLoading}
                        emptyMessage="No series found."
                        placeholder="Search for a series..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="release_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Runtime</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </TwoColumnLayout>
    </>
  );
}
