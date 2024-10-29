import { userService } from '@/services/user.service';
import { redirect } from 'next/navigation';

/**
 * Personal profile page.
 * @returns The profile page of the current user.
 */
export default async function Me() {
  const user = await userService.getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  return <p>{JSON.stringify(user)}</p>;
}
