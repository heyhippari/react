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
import { cn } from '@/core/utils/ui';
import { UserDto } from '@/data/user.dto';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

import { buttonVariants } from './ui/button';

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
        <Avatar className="border-2 border-pink-300 bg-pink-100 dark:border-pink-700 dark:bg-pink-900">
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
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex h-20 w-full flex-col items-start gap-1',
            )}
            href={'/me'}
          >
            <div className="items-center-2 flex flex-row gap-2">
              <p className="text-base font-extrabold">{profile.username}</p>
              {userRole ? (
                <Badge className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500">
                  {userRole}
                </Badge>
              ) : null}
            </div>
            <p className="text-sm text-pink-500">View profile</p>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-start',
          )}
          onClick={() => void logoutAction()}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
