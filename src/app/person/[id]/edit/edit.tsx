'use client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { updatePersonAction } from '@/app/actions/person';
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
import { SubmitHandler, useForm } from 'react-hook-form';

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
                      form.setValue('height', event.currentTarget.valueAsNumber)
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
  );
}
