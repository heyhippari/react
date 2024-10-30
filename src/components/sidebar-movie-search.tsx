'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  movieSearchFormSchema,
  MovieSearchFormSchema,
} from '@/core/utils/validation/movie-search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

/**
 * Sidebar for searching a movie.
 * @param properties The properties for the component.
 * @param properties.direction The direction to order the movies by.
 * @param properties.order The column to order the movies by.
 * @param properties.q The search query to use.
 * @returns The rendered component.
 */
export default function SidebarMovieSearch({
  direction = 'desc',
  order = 'create_time',
  q,
}: Readonly<{
  direction?: 'asc' | 'desc';
  order?: 'create_time' | 'dvd_id' | 'popularity' | 'release_date';
  q?: string;
}>) {
  const router = useRouter();

  const form = useForm<MovieSearchFormSchema>({
    defaultValues: {
      direction,
      order,
      page: 1,
      q,
    },
    resolver: zodResolver(movieSearchFormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/require-await -- We need to use async here.
  const onSubmit: SubmitHandler<MovieSearchFormSchema> = async (data) => {
    const searchParameters = new URLSearchParams({
      direction: data.direction,
      order: data.order,
      page: data.page.toString(),
      q: data.q,
    });

    return router.push(`/movie?${searchParameters.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
      >
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order by</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(
                      value:
                        | 'create_time'
                        | 'dvd_id'
                        | 'popularity'
                        | 'release_date',
                    ) => form.setValue('order', value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Order by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="release_date">Release Date</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="dvd_id">DVD ID</SelectItem>
                      <SelectItem value="create_time">Date Added</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direction</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value: 'asc' | 'desc') =>
                      form.setValue('direction', value)
                    }
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ascending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button loading={form.formState.isSubmitting} type="submit">
          Search
        </Button>
      </form>
    </Form>
  );
}
