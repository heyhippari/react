'use client';
import { logoutAction } from '@/app/actions/auth';
import LoginButton from '@/components/login-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProfileById } from '@/queries/get-profile-by-id';
import { UserProfile } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import useSupabaseBrowser from '@/utils/supabase/client';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';

export default function UserMenu() {
  const supabase = useSupabaseBrowser();

  const userRole = useUserRole();

  const [user, setUser] = useState<null | User>(null);
  const [profile, setProfile] = useState<null | UserProfile>(null);

  supabase.auth
    .getUser()
    .then((user) => {
      setUser(user.data.user);

      return user;
    })
    .catch((error) => {
      console.error('Error getting user', error);
    });

  if (user) {
    void getProfileById(supabase, user?.id || '').then(
      ({ data: profile, error }) => {
        if (error) {
          return;
        }

        setProfile(profile);

        return profile;
      },
    );
  }

  return (
    <>
      {user && profile ? (
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
                {userRole ? <Badge>{userRole}</Badge> : null}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => void logoutAction()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginButton provider="discord" />
      )}
    </>
  );
}
