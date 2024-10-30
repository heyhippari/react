'use client';
import { deleteMovieAction } from '@/app/actions/movie';
import { deletePersonAction } from '@/app/actions/person';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { isMovie } from '@/core/types';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import { useActionState, useState } from 'react';

/**
 * Button to delete a movie.
 * @param properties - The component properties.
 * @param properties.item - The item to delete.
 * @returns The rendered component.
 */
export default function ButtonDeleteItem({
  item,
}: Readonly<{
  item: MovieDto | PersonDto;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const action = isMovie(item) ? deleteMovieAction : deletePersonAction;
  const [, deleteAction, isDeletePending] = useActionState(action, null);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <button
          className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full text-red-500`}
        >
          Delete {item?._type}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item?.display_name}?</DialogTitle>
          <DialogDescription>
            This item will be permanently removed from the database. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <form action={deleteAction}>
            <input name="item_id" type="hidden" value={item?.id} />
            <Button
              className="bg-red-500"
              loading={isDeletePending}
              type="submit"
              variant="default"
            >
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
