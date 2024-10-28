import { FormPersonEdit } from '@/components/form-person-edit';
import { personService } from '@/services/person.service';
import { userService } from '@/services/user.service';
import { redirect } from 'next/navigation';

/**
 * Server-side code for the person edit page.
 * @param properties The properties for the person edit page.
 * @param properties.params The URL parameters, containing the person ID.
 * @returns The rendered component.
 */
export default async function PersonEditPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  // If we are not logged in, redirect to login
  const currentUser = await userService.refreshUser();
  if (!currentUser) {
    redirect('/login');
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const person = await personService.getPerson(Number(id));

  return <FormPersonEdit person={person} />;
}
