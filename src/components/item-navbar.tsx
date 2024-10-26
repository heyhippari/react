'use client';
import { deleteMovieAction } from '@/app/actions/movie';
import { Item } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import { getShareTitle } from '@/utils/share';
import { getUrlForItem, isMovie, isPerson } from '@/utils/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { useToast } from './ui/use-toast';

export default function ItemNavbar({ item }: Readonly<{ item: Item }>) {
  const [supportsShareAPI, setSupportsShareAPI] = useState(
    navigator?.share !== undefined,
  );
  const { toast } = useToast();
  const userRole = useUserRole();

  const frontCoverCount = useMemo(() => {
    if (isMovie(item)) {
      return item?.movie_images.filter(
        (image) => image.image?.type === 'front_cover',
      ).length;
    } else {
      return 0;
    }
  }, [item]);

  const fullCoverCount = useMemo(() => {
    if (isMovie(item)) {
      return item?.movie_images.filter(
        (image) => image.image?.type === 'full_cover',
      ).length;
    } else {
      return 0;
    }
  }, [item]);

  const profileCount = useMemo(() => {
    if (isPerson(item)) {
      return item?.person_images.filter(
        (image) => image.image?.type === 'profile',
      ).length;
    } else {
      return 0;
    }
  }, [item]);

  const imageLinks = useMemo(() => {
    if (isMovie(item)) {
      return (
        <>
          <Link
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            href={getUrlForItem(item)}
          >
            Poster
            <Badge variant="outline">{frontCoverCount ?? 0}</Badge>
          </Link>

          <Link
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            href={getUrlForItem(item)}
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
          href={getUrlForItem(item)}
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
          url: window.location.href,
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
    <nav className="start-0 top-0 z-20 w-full border-b bg-pink-300 p-2 dark:border-pink-700 dark:bg-pink-700">
      <div className="container mx-auto flex items-center gap-2 overflow-x-scroll px-4 md:justify-center md:overflow-auto">
        <HoverCard closeDelay={0} openDelay={0}>
          <HoverCardTrigger>
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
            <HoverCardTrigger>
              <Button variant={'ghost'}>Media</Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              {imageLinks}
            </HoverCardContent>
          </HoverCard>
        ) : null}

        <HoverCard closeDelay={0} openDelay={0}>
          <HoverCardTrigger>
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

        <Button onClick={handleShare} variant={'ghost'}>
          Share
        </Button>

        {['admin', 'moderator'].includes(userRole ?? '') ? (
          <HoverCard closeDelay={0} openDelay={0}>
            <HoverCardTrigger>
              <Button className="text-red-500" variant={'ghost'}>
                Manage
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              <button
                className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full text-red-500`}
                onClick={async () => {
                  try {
                    await deleteMovieAction(item?.id);
                  } catch (error) {
                    toast({
                      description: (error as Error).message,
                      variant: 'destructive',
                    });
                  }
                }}
              >
                Delete
              </button>
            </HoverCardContent>
          </HoverCard>
        ) : null}
      </div>
    </nav>
  );
}
