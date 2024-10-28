import LoginButton from '@/components/login-button';
import UserMenu from '@/components/user-menu';
import { userService } from '@/services/user.service';

/**
 * User menu server component.
 * @returns User menu server component.
 */
export default async function UserMenuServer() {
  const profile = await userService.getCurrentUser();

  return profile ? (
    <UserMenu profile={profile} />
  ) : (
    <LoginButton provider="discord" />
  );
}
