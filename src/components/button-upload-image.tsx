'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { PersonAddImageFormSchema } from '@/core/utils/validation/person-add-image';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import { personService } from '@/services/person.service';
import { zodResolver } from '@hookform/resolvers/zod';
import MdiPlus from '~icons/mdi/plus.svg';
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

type Item = MovieDto | PersonDto;

type ValidImageType<T extends Item> = T['_type'] extends 'movie'
  ? 'front_cover' | 'full_cover'
  : T['_type'] extends 'person'
    ? 'profile'
    : never;

/**
 * A button to upload an image for a movie or person.
 * @param parameters The parameters of the component.
 * @param parameters.imageType The type of the image to upload.
 * @param parameters.item The item to upload the image for.
 * @returns The rendered component.
 */
export function ButtonUploadImage<T extends Item>({
  imageType,
  item,
}: {
  imageType: ValidImageType<T>;
  item: T;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const typeDisplayName = useMemo(() => {
    switch (imageType) {
      case 'front_cover': {
        return 'Upload a Poster';
      }
      case 'full_cover': {
        return 'Upload a Backdrop';
      }
      case 'profile': {
        return 'Upload Profile';
      }
    }
  }, [imageType]);

  const uploadRequirements = useMemo(() => {
    switch (imageType) {
      case 'profile': {
        return [
          'No logo or watermark',
          'Avoid nudity or explicit content if possible',
          'A maximum resolution of 2000x3000',
          'A minimum resolution of 300x450',
          'Aspect ratio of 1:1.5 (2:3)',
        ];
      }
      default: {
        return ['Requirements not specified.'];
      }
    }
  }, [imageType]);

  const form = useForm<PersonAddImageFormSchema>({
    defaultValues: {
      image: undefined,
      person_id: item.id,
      // @ts-expect-error -- The type of the item should be good.
      type: imageType,
    },
    resolver: zodResolver(PersonAddImageFormSchema),
  });

  const onSubmit: SubmitHandler<PersonAddImageFormSchema> = async (data) => {
    await personService.addPersonImage(data.image, data.person_id, data.type);

    setIsOpen(false);

    // We need to refresh the page to show the new image.
    location.reload();
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
              <p>Profile images must meet the following criteria:</p>
              <ul className="list-inside list-disc">
                {uploadRequirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
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
