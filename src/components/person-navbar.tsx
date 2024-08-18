'use client';
import { deleteMovieAction } from '@/app/actions/movie';
import { PersonWithImage } from '@/queries/types';
import { useUserRole } from '@/utils/hooks';
import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { useToast } from './ui/use-toast';

export default function PersonNavbar({ person }: { person: PersonWithImage }) {
  const supportsShareAPI = navigator?.share !== undefined;
  const { toast } = useToast();
  const userRole = useUserRole();

  const profileCount = useMemo(
    () =>
      person?.person_images.filter(
        (image) => image.image?.type === 'front_cover',
      ).length,
    [person],
  );

  const handleShare = async () => {
    if (supportsShareAPI) {
      try {
        await navigator.share({
          title: `${person?.name ?? person?.original_name}`,
          text: `Find out more about ${person?.name ?? person?.original_name} on Kanojo`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <nav className="start-0 top-0 z-20 w-full border-b bg-pink-300 p-2 dark:border-stone-700 dark:bg-stone-600">
      <div className="container mx-auto flex items-center justify-center gap-2 overflow-x-scroll px-4 md:overflow-auto">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Overview</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={`/movie/${person?.id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Main
            </Link>
            <DropdownMenuSeparator />
            <Link
              href={`/movie/${person?.id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Changes
            </Link>
            <Link
              href={`/movie/${person?.id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
            >
              Report
            </Link>
            <Link
              href={`/movie/${person?.id}`}
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
              href={`/movie/${person?.id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Profiles
              <Badge variant="outline">{profileCount ?? 0}</Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button variant={'ghost'}>Community</Button>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="w-44 p-2">
            <Link
              href={`/movie/${person?.id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Discussions
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
                    await deleteMovieAction(person?.id);
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
