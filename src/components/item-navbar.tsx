'use client';
import { deleteMovieAction } from '@/app/actions/movie';
import { Item } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import { getShareTitle } from '@/utils/share';
import { isMovie, isPerson } from '@/utils/types';
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

  const itemPath = useMemo(() => {
    if (isMovie(item)) {
      return `/movie/${item?.id}`;
    } else {
      return `/person/${item?.id}`;
    }
  }, [item]);

  const imageLinks = useMemo(() => {
    if (isMovie(item)) {
      return (
        <>
          <Link
            href={itemPath}
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
          >
            Poster
            <Badge variant="outline">{frontCoverCount ?? 0}</Badge>
          </Link>

          <Link
            href={itemPath}
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
          >
            Backdrop
            <Badge variant="outline">{fullCoverCount ?? 0}</Badge>
          </Link>
        </>
      );
    } else if (isPerson(item)) {
      return (
        <>
          <Link
            href={itemPath}
            className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
          >
            Profile
            <Badge variant="outline">{profileCount ?? 0}</Badge>
          </Link>
        </>
      );
    } else {
      return null;
    }
  }, [frontCoverCount, fullCoverCount, item, itemPath]);

  const handleShare = async () => {
    if (supportsShareAPI) {
      try {
        await navigator.share({
          title: getShareTitle(item),
          text: getShareTitle(item),
          url: window.location.href,
        });
      } catch {
        toast({
          variant: 'destructive',
          description: 'An error occurred while sharing',
        });
        setSupportsShareAPI(false);
      }
    } else {
      // TODO: Implement fallback share
      toast({
        variant: 'destructive',
        description: 'Sharing is not supported on this device',
      });
    }
  };

  return (
    <nav className="start-0 top-0 z-20 w-full border-b bg-pink-300 p-2 dark:border-pink-700 dark:bg-pink-600">
      <div className="container mx-auto flex items-center justify-center gap-2 overflow-x-scroll px-4 md:overflow-auto">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Overview</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={itemPath}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Main
            </Link>
            <DropdownMenuSeparator />
            <Link
              href={itemPath}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Changes
            </Link>
            <Link
              href={itemPath}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Report
            </Link>
            <Link
              href={`${itemPath}/edit`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Edit
            </Link>
          </HoverCardContent>
        </HoverCard>

        {imageLinks ? (
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <Button variant={'ghost'}>Media</Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              {imageLinks}
            </HoverCardContent>
          </HoverCard>
        ) : null}

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Community</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={itemPath}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Discussions
              <Badge variant="outline">0</Badge>
            </Link>

            <Link
              href={itemPath}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Reviews
              <Badge variant="outline">0</Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>

        <Button variant={'ghost'} onClick={handleShare}>
          Share
        </Button>

        {['admin', 'moderator'].includes(userRole ?? '') ? (
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <Button variant={'ghost'} className="text-red-500">
                Manage
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-44 p-2">
              <button
                onClick={async () => {
                  try {
                    await deleteMovieAction(item?.id);
                  } catch (error) {
                    toast({
                      variant: 'destructive',
                      description: (error as Error).message,
                    });
                  }
                }}
                className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full text-red-500`}
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
