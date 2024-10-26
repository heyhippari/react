'use client';
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
import { Item } from '@/queries/types';
import { useActionState, useState } from 'react';

/**
 * Button to delete a movie.
 * @param props - The component props.
 * @param props.action - The action to perform when the movie is deleted.
 * @param props.item - The item to delete.
 * @returns The rendered component.
 */
export default function ButtonDeleteItem({
  action,
  item,
}: Readonly<{
  action: (
    state: null | void,
    payload: FormData,
  ) => null | Promise<null | void> | void;
  item: Item;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const [, deleteAction, isDeletePending] = useActionState(action, null);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <button
          className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full text-red-500`}
        >
          Delete
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item?.name ?? item?.original_name}?</DialogTitle>
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
            <input name="movie_id" type="hidden" value={item?.id} />
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
