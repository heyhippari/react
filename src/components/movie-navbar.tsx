import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

export default function MovieNavbar({ movie }: { movie: any }) {
  const isServer = typeof window === 'undefined';

  const supportsShareAPI = useMemo(() => {
    if (isServer) return false;
    return navigator?.share !== undefined;
  }, [isServer]);

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
    <nav className="start-0 top-0 z-20 w-full border-b border-gray-200 bg-slate-100 p-2 dark:border-gray-600 dark:bg-gray-700">
      <div className="container mx-auto flex flex-wrap items-center justify-center px-4">
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
              <Badge variant="outline">0</Badge>
            </Link>

            <Link
              href={`/movie/${movie?.dvd_id}`}
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-between')} w-full`}
            >
              Backdrop
              <Badge variant="outline">0</Badge>
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

        <Button variant={'ghost'} onClick={handleShare}>
          Share
        </Button>
      </div>
    </nav>
  );
}
