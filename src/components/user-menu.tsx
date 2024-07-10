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
import { UserProfile } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

export default function UserMenu({ profile }: { profile: UserProfile }) {
  const userRole = useUserRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={profile.avatar_url ?? ''}
            alt={profile.username ?? ''}
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
