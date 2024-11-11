import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/user-avatar';
import { userService } from '@/services/user.service';
import { DateTime } from 'luxon';
import { redirect } from 'next/navigation';

/**
 * Personal profile page.
 * @param properties The properties of the page.
 * @param properties.params The URL parameters of the page.
 * @returns The profile page of the current user.
 */
export default async function UserProfile({
  params,
}: Readonly<{
  params: Promise<{ username: string }>;
}>) {
  const { username } = await params;

  const user = await userService.getUserByUsername(username);

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex w-full flex-col items-center border-b-2 border-pink-300 bg-pink-200 p-4 dark:border-pink-700 dark:bg-pink-800">
      <div className="container mx-auto flex flex-row gap-4">
        <UserAvatar className="size-32" profile={user} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="text-3xl font-extrabold">{user.username}</p>
            {user.roles
              ?.filter((role) =>
                ['admin', 'banned', 'moderator'].includes(role.role),
              )
              .map((role) => (
                <Badge
                  className="mt-2 bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
                  key={role.role}
                >
                  {role.role}
                </Badge>
              ))}
          </div>
          {user.create_time && (
            <p className="text-lg">
              Member since{' '}
              {DateTime.fromISO(user.create_time).toLocaleString(
                DateTime.DATE_FULL,
                { locale: 'en-US' },
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
