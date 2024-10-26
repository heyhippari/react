import LoginButton from '@/components/login-button';
import UserMenu from '@/components/user-menu';
import { getProfileById } from '@/queries/get-profile-by-id';
import { UserProfile } from '@/queries/types';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * User menu server component.
 * @returns User menu server component.
 */
export default async function UserMenuServer() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: null | UserProfile = null;
  if (user) {
    const { data } = await getProfileById(supabase, user?.id || '');

    if (data) {
      profile = data;
    }
  }

  return user && profile ? (
    <UserMenu profile={profile} />
  ) : (
    <LoginButton provider="discord" />
  );
}
