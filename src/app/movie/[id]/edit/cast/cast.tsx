'use client';

import { addMovieRoleAction, deleteMovieRoleAction } from '@/app/actions/movie';
import { AutoComplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

import IconTrash from '~icons/mdi/trash-can-outline.jsx';

export default function MovieCast({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: movie } = useQuery(getMovieById(supabase, id));

  const [personSearchValue, setPersonSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);

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
      await addMovieRoleAction(movie.id, data);
    }
  };

  const onDeleteSubmit = async (role_id: number) => {
    if (movie?.id) {
      try {
        setLoading(true);

        await deleteMovieRoleAction(movie.id, role_id);

        setLoading(false);
      } catch {
        setLoading(false);
      }
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <IconTrash />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete role</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this role?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="default"
                        className="bg-red-500"
                        onClick={() => onDeleteSubmit(role.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-end justify-start space-x-4"
        >
          <FormField
            control={form.control}
            name="person_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a model</FormLabel>
                <FormControl>
                  <AutoComplete
                    selectedValue={field.value?.toString() ?? ''}
                    onSelectedValueChange={(value) =>
                      form.setValue('person_id', parseInt(value, 10))
                    }
                    searchValue={personSearchValue}
                    onSearchValueChange={(value) => {
                      setPersonSearchValue(value);
                    }}
                    items={
                      persons?.map((person) => ({
                        value: person.id.toString(),
                        label: person.name ?? person.original_name,
                      })) ?? []
                    }
                    isLoading={isPersonLoading}
                    emptyMessage="No persons found."
                    placeholder="Search for a person..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
