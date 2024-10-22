'use client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { updateMovieAction } from '@/app/actions/movie';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function MovieEdit({ id }: Readonly<{ id: string }>) {
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
      release_date: movie?.release_date?.split('T')[0] ?? undefined,
      length: movie?.length ?? 0,
      dvd_id: movie?.dvd_id ?? undefined,
      label_id: movie?.label_id ?? undefined,
      series_id: movie?.series_id ?? undefined,
      studio_id: movie?.studio_id ?? undefined,
      barcode: (movie?.barcode as string) ?? undefined,
      format: movie?.format ?? 'Unknown',
    },
  });

  const onSubmit: SubmitHandler<MovieEditFormSchema> = async (data) => {
    if (movie?.id) {
      await updateMovieAction(movie?.id, data);
    }
  };

  return (
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
                  <Input placeholder="DVD ID" disabled readOnly {...field} />
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
                    onSearchValueChange={(value) => setSeriesSearchValue(value)}
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
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                      form.setValue('length', e.target.valueAsNumber)
                    }
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
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input placeholder="Barcode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                      <SelectItem value="DVD">DVD</SelectItem>
                      <SelectItem value="Blu-ray">Blu-ray</SelectItem>
                      <SelectItem value="Blu-ray 4K">Blu-ray 4K</SelectItem>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="VHS">VHS</SelectItem>
                      <SelectItem value="LaserDisc">LaserDisc</SelectItem>
                      <SelectItem value="UMD Video">UMD Video</SelectItem>
                      <SelectItem value="Video CD">Video CD</SelectItem>
                    </SelectContent>
                  </Select>
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
  );
}
