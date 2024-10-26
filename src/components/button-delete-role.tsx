'use client';
import { deleteMovieRoleAction } from '@/app/actions/movie';
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
import { RoleWithPerson } from '@/queries/types';
import IconTrash from '~icons/mdi/trash-can-outline.jsx';
import { useActionState, useState } from 'react';

import { Button } from './ui/button';

/**
 * Button to delete a role.
 * @param props - The component props.
 * @param props.movie_id - The ID of the movie.
 * @param props.role - The role to delete.
 * @returns The rendered component.
 */
export default function DeleteRoleButton({
  movie_id,
  role,
}: Readonly<{ movie_id: string; role: RoleWithPerson }>) {
  const [isOpen, setIsOpen] = useState(false);

  const [, deleteAction, isDeletePending] = useActionState(
    deleteMovieRoleAction,
    null,
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <IconTrash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {role?.person?.name ?? role?.person?.original_name}'s role?
          </DialogTitle>
          <DialogDescription>
            You won't be able to recover this role after deletion. The actor and
            their performance details will be removed from the movie's cast
            list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <form action={deleteAction}>
            <input name="movie_id" type="hidden" value={movie_id} />
            <input name="role_id" type="hidden" value={role?.id} />
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
