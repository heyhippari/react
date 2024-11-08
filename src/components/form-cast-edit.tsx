'use client';
import { addMovieRoleAction } from '@/app/actions/movie';
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
import { MovieRoleAddFormSchema } from '@/core/utils/validation/movie-update';
import { MovieDto } from '@/data/movie.dto';
import { personService } from '@/services/person.service';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';

/**
 * Form to edit the cast of a movie.
 * @param properties - The properties to render the form.
 * @param properties.movie - The DTO of the movie to edit.
 * @returns The rendered component.
 */
export function FormCastEdit({
  movie,
}: Readonly<{
  movie: MovieDto;
}>) {
  const [personSearchValue, setPersonSearchValue] = useState('');

  const { loading: isPersonLoading, value: persons } = useAsync(
    async () => await personService.searchPersonByName(personSearchValue ?? ''),
    [personSearchValue],
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
        movie.roles?.push({
          age: null,
          id: Infinity, // We use Infinity to indicate that this is a temporary role.
          person,
        });
      }

      await addMovieRoleAction(movie.id, data);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-row items-end justify-start space-x-4"
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
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
                      label: person.display_name,
                      value: person.id?.toString() ?? '',
                    })) ?? []
                  }
                  onSearchValueChange={(value) => {
                    console.log(value);
                    setPersonSearchValue(value);
                  }}
                  onSelectedValueChange={(value) =>
                    form.setValue('person_id', Number.parseInt(value, 10))
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
  );
}
