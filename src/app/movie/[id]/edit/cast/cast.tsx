'use client';

import { addMovieRoleAction } from '@/app/actions/movie';
import ButtonDeleteRole from '@/components/button-delete-role';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { searchPersonByName } from '@/queries/autocomplete';
import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { MovieRoleAddFormSchema } from '@/utils/validation/movie-update';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

/**
 * Form to edit the cast of a movie.
 * @param props - The component props.
 * @param props.id - The movie id.
 * @returns The rendered component.
 */
export default function MovieCast({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: movie } = useQuery(getMovieById(supabase, id));

  const [personSearchValue, setPersonSearchValue] = useState('');

  const { data: persons, isLoading: isPersonLoading } = useQuery(
    searchPersonByName(supabase, personSearchValue),
  );

  const form = useForm<MovieRoleAddFormSchema>({
    defaultValues: {
      person_id: undefined,
    },
  });

  const onSubmit: SubmitHandler<MovieRoleAddFormSchema> = async (data) => {
    if (movie?.id) {
      const person = persons?.find((person) => person.id === data.person_id);

      if (person) {
        // We have the person, so we can add the role to the movie eagerly for a better UX.
        movie.roles.push({
          age: null,
          id: Infinity, // We use Infinity to indicate that this is a temporary role.
          person,
        });
      }

      await addMovieRoleAction(movie.id, data);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movie?.roles.map((role) => (
            <TableRow key={role?.id}>
              <TableCell>
                {role?.person?.name ?? role?.person?.original_name}
              </TableCell>
              <TableCell className="space-x-2">
                <ButtonDeleteRole movie_id={id} role={role} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Form {...form}>
        <form
          className="flex flex-row items-end justify-start space-x-4"
          onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        >
          <FormField
            control={form.control}
            name="person_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a model</FormLabel>
                <FormControl>
                  <AutoComplete
                    emptyMessage="No persons found."
                    isLoading={isPersonLoading}
                    items={
                      persons?.map((person) => ({
                        label: person.name ?? person.original_name,
                        value: person.id.toString(),
                      })) ?? []
                    }
                    onSearchValueChange={(value) => {
                      setPersonSearchValue(value);
                    }}
                    onSelectedValueChange={(value) =>
                      form.setValue('person_id', parseInt(value, 10))
                    }
                    placeholder="Search for a person..."
                    searchValue={personSearchValue}
                    selectedValue={field.value?.toString() ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button loading={form.formState.isSubmitting} type="submit">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
