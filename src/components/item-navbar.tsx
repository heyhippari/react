'use client';
import ButtonDeleteItem from '@/components/button-delete-item';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useToast } from '@/components/ui/use-toast';
import { getUrlForItem, isMovie, isPerson } from '@/core/types';
import { useUserRole } from '@/core/utils/hooks';
import { getShareTitle } from '@/core/utils/share';
import { MovieDto } from '@/data/movie.dto';
import Link from 'next/link';
import { useMemo, useState } from 'react';

/**
 * A navigation bar for an item, containing links to various item-related pages and actions.
 * @param properties - The component properties.
 * @param properties.item - The item to display the navigation bar for.
 * @returns The rendered component.
 */
export default function ItemNavbar({ item }: Readonly<{ item: MovieDto }>) {
  const [supportsShareAPI, setSupportsShareAPI] = useState(
    navigator?.share !== undefined,
  );
  const { toast } = useToast();
  const userRole = useUserRole();

  const frontCoverCount = useMemo(() => {
    return isMovie(item)
      ? item?.movie_images?.filter(
          (image) => image.image?.type === 'front_cover',
        ).length
      : 0;
  }, [item]);

  const fullCoverCount = useMemo(() => {
    return isMovie(item)
      ? item?.movie_images?.filter(
          (image) => image.image?.type === 'full_cover',
        ).length
      : 0;
  }, [item]);

  const profileCount = useMemo(() => {
    return isPerson(item)
      ? item?.person_images?.filter((image) => image.image?.type === 'profile')
          .length
      : 0;
  }, [item]);

  const imageLinks = useMemo(() => {
    if (isMovie(item)) {
      return (
        <>
          <Link
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            href={getUrlForItem(item, '/images/posters')}
          >
            Poster
            <Badge variant="outline">{frontCoverCount ?? 0}</Badge>
          </Link>

          <Link
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            href={getUrlForItem(item, '/images/backdrops')}
          >
            Backdrop
            <Badge variant="outline">{fullCoverCount ?? 0}</Badge>
          </Link>
        </>
      );
    } else if (isPerson(item)) {
      return (
        <Link
          className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
          href={getUrlForItem(item, '/images/profiles')}
        >
          Profile
          <Badge variant="outline">{profileCount ?? 0}</Badge>
        </Link>
      );
    } else {
      return null;
    }
  }, [frontCoverCount, fullCoverCount, item, profileCount]);

  const handleShare = async () => {
    if (supportsShareAPI) {
      try {
        await navigator.share({
          text: getShareTitle(item),
          title: getShareTitle(item),
          url: globalThis.location.href,
        });
      } catch {
        toast({
          description: 'An error occurred while sharing',
          variant: 'destructive',
        });
        setSupportsShareAPI(false);
      }
    } else {
      // TODO: Implement fallback share
      toast({
        description: 'Sharing is not supported on this device',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="start-0 top-0 z-10 w-full border-b bg-pink-300 p-2 dark:border-pink-700 dark:bg-pink-700">
      <div className="container mx-auto flex items-center gap-2 overflow-x-scroll px-4 md:justify-center md:overflow-auto">
        <HoverCard closeDelay={0} openDelay={0}>
          <HoverCardTrigger asChild>
            <Button variant={'ghost'}>Overview</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href={getUrlForItem(item)}
            >
              Main
            </Link>
            <DropdownMenuSeparator />
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href={getUrlForItem(item)}
            >
              Changes
            </Link>
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href={getUrlForItem(item)}
            >
              Report
            </Link>
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href={`${getUrlForItem(item)}/edit`}
            >
              Edit
            </Link>
          </HoverCardContent>
        </HoverCard>

        {imageLinks ? (
          <HoverCard closeDelay={0} openDelay={0}>
            <HoverCardTrigger asChild>
              <Button variant={'ghost'}>Media</Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              {imageLinks}
            </HoverCardContent>
          </HoverCard>
        ) : null}

        <HoverCard closeDelay={0} openDelay={0}>
          <HoverCardTrigger asChild>
            <Button variant={'ghost'}>Community</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
              href={getUrlForItem(item)}
            >
              Discussions
              <Badge variant="outline">0</Badge>
            </Link>

            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
              href={getUrlForItem(item)}
            >
              Reviews
              <Badge variant="outline">0</Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>

        <Button onClick={() => void handleShare()} variant={'ghost'}>
          Share
        </Button>

        {['admin', 'moderator'].includes(userRole ?? '') ? (
          <HoverCard closeDelay={0} openDelay={0}>
            <HoverCardTrigger asChild>
              <Button className="text-red-500" variant={'ghost'}>
                Manage
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              <ButtonDeleteItem item={item} />
            </HoverCardContent>
          </HoverCard>
        ) : null}
      </div>
    </nav>
  );
}
