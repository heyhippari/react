'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  PersonAddImageForm,
  personAddImageFormSchema,
} from '@/core/utils/validation/person-add-image';
import { PersonDto } from '@/data/person.dto';
import { personService } from '@/services/person.service';
import { zodResolver } from '@hookform/resolvers/zod';
import MdiPlus from '~icons/mdi/plus.svg';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

/**
 * A button to upload an image for a person.
 * @param parameters The parameters of the component.
 * @param parameters.imageType The type of the image to upload.
 * @param parameters.item The item to upload the image for.
 * @returns The rendered component.
 */
export function ButtonUploadPersonImage({
  imageType,
  item,
}: Readonly<{
  imageType: 'profile';
  item: PersonDto;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const typeDisplayName = useMemo(() => {
    if (imageType === 'profile') {
      return 'Upload Profile';
    }
  }, [imageType]);

  const uploadRequirements = useMemo(() => {
    return imageType === 'profile'
      ? [
          'No logo or watermark',
          'Avoid nudity or explicit content if possible',
          'Prefer a portrait (head and shoulders) if possible',
          'A maximum resolution of 2000x3000',
          'A minimum resolution of 300x450',
          'Aspect ratio of 1:1.5 (2:3)',
        ]
      : ['Requirements not specified.'];
  }, [imageType]);

  const form = useForm<PersonAddImageForm>({
    defaultValues: {
      image: undefined,
      person_id: item.id,
      type: imageType,
    },
    resolver: zodResolver(personAddImageFormSchema),
  });

  const onSubmit: SubmitHandler<PersonAddImageForm> = async (data) => {
    await personService.addPersonImage(data.image, data.person_id, data.type);

    setIsOpen(false);

    // We need to refresh the page to show the new image.
    router.refresh();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-6 rounded-full"
                onClick={() => setIsOpen(true)}
                size={'icon'}
                variant={'default'}
              >
                <MdiPlus className={'size-5'} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{typeDisplayName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{typeDisplayName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          >
            <p>Drag and drop an image or click to select a file.</p>
            <div className="flex flex-col gap-1">
              <p>Images must meet the following criteria:</p>
              <ul className="list-inside list-disc">
                {uploadRequirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </div>
            <FormField
              control={form.control}
              name="person_id"
              render={({ field }) => (
                <input
                  name={field.name}
                  ref={field.ref}
                  type="hidden"
                  value={field.value}
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <input
                  name={field.name}
                  ref={field.ref}
                  type="hidden"
                  value={field.value}
                />
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      accept="image/jpeg,image/png,image/webp"
                      className="mt-1"
                      disabled={form.formState.isSubmitting}
                      id="image"
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        field.onChange(event.target.files?.[0]);

                        void form.handleSubmit(onSubmit)(event);
                      }}
                      ref={field.ref}
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
