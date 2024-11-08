'use client';
import { createMovieAction } from '@/app/actions/movie';
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
  MovieCreateFormSchema,
  movieCreateFormSchema,
} from '@/core/utils/validation/movie-create';
import { labelService } from '@/services/label.service';
import { seriesService } from '@/services/series.service';
import { studioService } from '@/services/studio.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';

/**
 * Form to create a movie.
 * @returns The rendered component.
 */
export function FormMovieCreate() {
  const [studioSearchValue, setStudioSearchValue] = useState('');
  const [labelSearchValue, setLabelSearchValue] = useState('');
  const [seriesSearchValue, setSeriesSearchValue] = useState('');

  const { loading: isStudioLoading, value: studios } = useAsync(
    async () => await studioService.searchStudioByName(studioSearchValue ?? ''),
    [studioSearchValue],
  );
  const { loading: isLabelLoading, value: labels } = useAsync(
    async () => await labelService.searchLabelByName(labelSearchValue ?? ''),
    [labelSearchValue],
  );
  const { loading: isSeriesLoading, value: series } = useAsync(
    async () => await seriesService.searchSeriesByName(seriesSearchValue ?? ''),
    [seriesSearchValue],
  );

  const form = useForm<MovieCreateFormSchema>({
    defaultValues: {
      barcode: undefined,
      dvd_id: undefined,
      format: 'Unknown',
      label_id: undefined,
      length: 0,
      name: undefined,
      original_name: undefined,
      release_date: undefined,
      series_id: undefined,
      studio_id: undefined,
    },
    resolver: zodResolver(movieCreateFormSchema),
  });

  const onSubmit: SubmitHandler<MovieCreateFormSchema> = async (data) => {
    await createMovieAction(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
      >
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
                  <Input autoComplete="off" placeholder="DVD ID" {...field} />
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
                    emptyMessage="No studios found."
                    isLoading={isStudioLoading}
                    items={
                      studios?.map((studio) => ({
                        label: studio.display_name ?? '',
                        value: studio.id?.toString() ?? '',
                      })) ?? []
                    }
                    onSearchValueChange={(value) => {
                      setStudioSearchValue(value);
                    }}
                    onSelectedValueChange={(value) => {
                      if (Number.isNaN(Number.parseInt(value, 10))) {
                        form.setValue('studio_id', null);
                      } else {
                        form.setValue('studio_id', Number.parseInt(value, 10));
                      }
                    }}
                    placeholder="Search for a studio..."
                    searchValue={studioSearchValue ?? ''}
                    selectedValue={field.value?.toString() ?? ''}
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
                    emptyMessage="No labels found."
                    isLoading={isLabelLoading}
                    items={
                      labels?.map((label) => ({
                        label: label.display_name ?? '',
                        value: label.id?.toString() ?? '',
                      })) ?? []
                    }
                    onSearchValueChange={(value) => {
                      setLabelSearchValue(value);
                    }}
                    onSelectedValueChange={(value) => {
                      if (Number.isNaN(Number.parseInt(value, 10))) {
                        form.setValue('label_id', null);
                      } else {
                        form.setValue('label_id', Number.parseInt(value, 10));
                      }
                    }}
                    placeholder="Search for a label..."
                    searchValue={labelSearchValue ?? ''}
                    selectedValue={field.value?.toString() ?? ''}
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
                    emptyMessage="No series found."
                    isLoading={isSeriesLoading}
                    items={
                      series?.map((series) => ({
                        label: series.display_name ?? '',
                        value: series.id?.toString() ?? '',
                      })) ?? []
                    }
                    onSearchValueChange={(value) => setSeriesSearchValue(value)}
                    onSelectedValueChange={(value) => {
                      if (Number.isNaN(Number.parseInt(value, 10))) {
                        form.setValue('series_id', null);
                      } else {
                        form.setValue('series_id', Number.parseInt(value, 10));
                      }
                    }}
                    placeholder="Search for a series..."
                    searchValue={seriesSearchValue ?? ''}
                    selectedValue={field.value?.toString() ?? ''}
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
                  <Input
                    onChange={(event) =>
                      form.setValue('release_date', event.target.value)
                    }
                    type="date"
                    value={field.value ?? undefined}
                  />
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
                    onChange={(event) =>
                      form.setValue('length', event.target.valueAsNumber)
                    }
                    type="number"
                    value={field.value?.toString()}
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
        <Button loading={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
