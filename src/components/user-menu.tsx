'use client';
import { logoutAction } from '@/app/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserRole } from '@/core/utils/hooks';
import { UserDto } from '@/data/user.dto';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

/**
 * A menu that displays the user's profile picture and username, as well as various links to relevant actions.
 * @param propeties - The properties of the component.
 * @param propeties.profile - The profile of the current user.
 * @returns The rendered component.
 */
export default function UserMenu({ profile }: { profile: UserDto }) {
  const userRole = useUserRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border-2 border-pink-400 bg-pink-300 dark:border-pink-400 dark:bg-pink-700">
          <AvatarImage
            alt={profile.username ?? ''}
            src={profile.avatar_url ?? ''}
          />
          <AvatarFallback>
            {profile.username?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          <div className="flex flex-row items-center">
            <p className="p-2 font-extrabold">{profile.username}</p>
            {userRole ? (
              <Badge className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500">
                {userRole}
              </Badge>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void logoutAction()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
