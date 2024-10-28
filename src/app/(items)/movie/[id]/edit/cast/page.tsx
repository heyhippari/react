import ButtonDeleteRole from '@/components/button-delete-role';
import { FormCastEdit } from '@/components/form-cast-edit';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { movieService } from '@/services/movie.service';
import { userService } from '@/services/user.service';
import { redirect } from 'next/navigation';

/**
 * Server-side rendered page to edit the cast of a movie.
 * @param properties - The component properties.
 * @param properties.params - The URL parameters.
 * @returns The rendered component.
 */
export default async function MovieCastEditPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  // If we are not logged in, redirect to login
  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    return redirect('/login');
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const movie = await movieService.getMovie(Number(id));

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
          {movie?.roles?.map((role) => (
            <TableRow key={role?.id}>
              <TableCell>{role?.person?.display_name}</TableCell>
              <TableCell className="space-x-2">
                <ButtonDeleteRole movie={movie} role={role} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FormCastEdit movie={movie} />
    </div>
  );
}
