'use client';
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
import {
  PersonEditFormSchema,
  personEditFormSchema,
} from '@/core/utils/validation/person-update';
import { PersonDto } from '@/data/person.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTime } from 'luxon';
import { SubmitHandler, useForm } from 'react-hook-form';

/**
 * Form to edit a person.
 * @param properties - The properties to render the form.
 * @param properties.person - The DTO of the person to edit.
 * @returns The rendered component.
 */
export function FormPersonEdit({
  person,
}: Readonly<{
  person: PersonDto;
}>) {
  const form = useForm<PersonEditFormSchema>({
    defaultValues: {
      birth_date: person?.birth_date
        ? (DateTime.fromISO(person?.birth_date).toISODate() ?? undefined)
        : undefined,
      bust_size: person?.bust_size ?? undefined,
      height: person?.height ?? undefined,
      hips_size: person?.hips_size ?? undefined,
      id: person?.id,
      name: person?.alternative_name ? person?.display_name : undefined,
      original_name: person?.alternative_name ?? person?.display_name,
      waist_size: person?.waist_size ?? undefined,
    },
    resolver: zodResolver(personEditFormSchema),
  });

  const onSubmit: SubmitHandler<PersonEditFormSchema> = async (data) => {
    await updatePersonAction(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
      >
        <FormField
          control={form.control}
          name="id"
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
                    onChange={(event) =>
                      form.setValue('height', event.currentTarget.valueAsNumber)
                    }
                    type="number"
                    value={field.value}
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
                    onChange={(event) =>
                      form.setValue(
                        'bust_size',
                        event.currentTarget.valueAsNumber,
                      )
                    }
                    type="number"
                    value={field.value}
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
                    onChange={(event) =>
                      form.setValue(
                        'waist_size',
                        event.currentTarget.valueAsNumber,
                      )
                    }
                    type="number"
                    value={field.value}
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
                    onChange={(event) =>
                      form.setValue(
                        'hips_size',
                        event.currentTarget.valueAsNumber,
                      )
                    }
                    type="number"
                    value={field.value}
                  />
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
