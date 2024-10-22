'use client';
import ItemNavbar from '@/components/item-navbar';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { updatePersonAction } from '@/app/actions/person';
import PersonPoster from '@/components/person-poster';
import { TwoColumnLayout } from '@/components/two-column-layout';
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
import { getPersonById } from '@/queries/get-person-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import {
  PersonEditFormSchema,
  personEditFormSchema,
} from '@/utils/validation/person-update';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import MdiArrowLeft from '~icons/mdi/arrow-left.jsx';

export default function Movie({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: person } = useQuery(getPersonById(supabase, id));

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Only for error handling
  const form = useForm<PersonEditFormSchema>({
    resolver: zodResolver(personEditFormSchema),
    defaultValues: {
      original_name: person?.original_name ?? undefined,
      name: person?.name ?? undefined,
      birth_date: person?.birth_date ?? undefined,
      height: person?.height ?? undefined,
      bust_size: person?.bust_size ?? undefined,
      waist_size: person?.waist_size ?? undefined,
      hips_size: person?.hips_size ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<PersonEditFormSchema> = async (data) => {
    if (person?.id) {
      await updatePersonAction(person?.id, data);
    }
  };

  return (
    <>
      <ItemNavbar item={person} />
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <Link
            href={`/person/${person?.id}`}
            className="flex flex-col items-center gap-4 md:flex-row"
          >
            <PersonPoster person={person} small />
            <div className="flex flex-col gap-2">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {person?.name ?? person?.original_name}
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
                  <FormLabel>Original Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Original Name" {...field} />
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
                  <FormLabel>Translated Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Translated Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(event) =>
                          form.setValue(
                            'height',
                            event.currentTarget.valueAsNumber,
                          )
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
                name="bust_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bust Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(event) =>
                          form.setValue(
                            'bust_size',
                            event.currentTarget.valueAsNumber,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waist_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waist Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(event) =>
                          form.setValue(
                            'waist_size',
                            event.currentTarget.valueAsNumber,
                          )
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
                name="hips_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hips Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(event) =>
                          form.setValue(
                            'hips_size',
                            event.currentTarget.valueAsNumber,
                          )
                        }
                      />
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
