import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/core/utils/ui';
import { UserDto } from '@/data/user.dto';

/**
 * A component that displays the user's profile picture.
 * @param propeties - The properties of the component.
 * @param propeties.className - The CSS classes of the component.
 * @param propeties.profile - The data transfer object of the user's profile.
 * @returns The rendered component.
 */
export default function UserAvatar({
  className,
  profile,
}: {
  className?: string | undefined;
  profile: UserDto;
}) {
  return (
    <Avatar
      className={cn(
        'border-2 border-pink-400 bg-pink-300 dark:border-pink-400 dark:bg-pink-700',
        className,
      )}
    >
      <AvatarImage
        alt={profile.username ?? ''}
        src={profile.avatar_url ?? ''}
      />
      <AvatarFallback>
        {profile.username?.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
