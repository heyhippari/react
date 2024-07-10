'use client';
import { deleteMovieAction } from '@/app/actions/movie';
import { MovieWithAll } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { useToast } from './ui/use-toast';

export default function MovieNavbar({ movie }: { movie: MovieWithAll }) {
  const supportsShareAPI = navigator?.share !== undefined;
  const { toast } = useToast();
  const userRole = useUserRole();

  const frontCoverCount = useMemo(
    () =>
      movie?.movie_images.filter((image) => image.image?.type === 'front_cover')
        .length,
    [movie],
  );

  const fullCoverCount = useMemo(
    () =>
      movie?.movie_images.filter((image) => image.image?.type === 'full_cover')
        .length,
    [movie],
  );

  const handleShare = async () => {
    if (supportsShareAPI) {
      try {
        await navigator.share({
          title: `${movie?.dvd_id} (${movie?.name ?? movie?.original_name})`,
          text: `Find out more about ${movie?.dvd_id} on Kanojo`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-stone-200 bg-stone-100 p-2 dark:border-stone-700 dark:bg-stone-600">
      <div className="container mx-auto flex items-center justify-center gap-2 overflow-x-scroll px-4 md:overflow-auto">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Overview</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Main
            </Link>
            <DropdownMenuSeparator />
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Changes
            </Link>
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Report
            </Link>
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Edit
            </Link>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Media</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Poster
              <Badge variant="outline">{frontCoverCount ?? 0}</Badge>
            </Link>

            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Backdrop
              <Badge variant="outline">{fullCoverCount ?? 0}</Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Community</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Discussions
              <Badge variant="outline">0</Badge>
            </Link>

            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Reviews
              <Badge variant="outline">0</Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>

        <Button variant={'ghost'} onClick={void handleShare}>
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
                    await deleteMovieAction(movie?.id);
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
