'use client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import MovieNavbar from '@/components/movie-navbar';
import MoviePoster from '@/components/movie-poster';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MdiArrowLeft from '~icons/mdi/arrow-left.jsx';

const movieEditFormSchema = z.object({
  originalName: z.string(),
  name: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  dvd_id: z.string(),
  label_id: z.number(),
  series_id: z.number(),
  studio_id: z.number(),
  has_nudity: z.boolean(),
});

export default function Movie({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: movie, error } = useQuery(getMovieById(supabase, id));

  if (error) {
    return redirect('/404');
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Only for error handling
  const form = useForm<z.infer<typeof movieEditFormSchema>>({
    resolver: zodResolver(movieEditFormSchema),
    defaultValues: {
      originalName: movie?.original_name,
      name: movie?.name ?? undefined,
      release_date: movie?.release_date ?? undefined,
      runtime: movie?.length ?? undefined,
      dvd_id: movie?.dvd_id ?? undefined,
      label_id: movie?.label_id ?? undefined,
      series_id: movie?.series_id ?? undefined,
      studio_id: movie?.studio_id ?? undefined,
      has_nudity: movie?.has_nudity ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof movieEditFormSchema>) {
    console.log(values);
  }

  return (
    <>
      <MovieNavbar movie={movie} />
      <div className="w-full bg-pink-100 p-4 dark:bg-stone-700">
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
      <div className="container flex flex-row gap-4 p-4">
        <Card className="hidden flex-col overflow-hidden bg-pink-50 dark:border-pink-900 dark:bg-pink-950 lg:flex lg:w-64">
          <CardHeader className="bg-pink-200 dark:bg-pink-700">
            <CardTitle>Edit</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col p-2 pt-3">
            <Button variant="ghost" className="justify-start">
              Primary Facts
            </Button>
          </CardContent>
        </Card>
        <div className="flex-grow">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="originalName"
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
                        <Input placeholder="Studio ID" {...field} />
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
                        <Input placeholder="Label ID" {...field} />
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
                        <Input placeholder="Series ID" {...field} />
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
                  name="runtime"
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
